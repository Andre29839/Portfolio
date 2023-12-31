export async function loadImageFormSrcSet({ src, srcSet, sizes }) {
  return new Promise((resolve, reject) => {
    const srcSetString = srcSetToString(srcSet);

    try {
      if (!src && !srcSet) {
        throw new Error("No image src or srcSet provided");
      }

      let tempImage = new Image();

      if (src) {
        tempImage.src = src;
      }

      if (srcSetString) {
        tempImage.srcset = srcSetString;
      }

      if (sizes) {
        tempImage.sizes = sizes;
      }

      const onLoad = () => {
        tempImage.removeEventListener("load", onLoad);
        const source = tempImage.currentSrc;
        tempImage = null;
        resolve(source);
      };

      tempImage.addEventListener("load", onLoad);
    } catch (error) {
      reject(`Error loading ${srcSetString}: ${error}`);
    }
  });
}

export function srcSetToString(srcSet = []) {
  if (typeof srcSet === "string") {
    return srcSet;
  }

  if (!Array.isArray(srcSet)) {
    return "";
  }

  return srcSet.map(item => `${item.src} ${item.width}w`).join(", ");
}

export async function generateImage(width = 1, height = 1) {
  return new Promise(resolve => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, width, height);

    canvas.toBlob(async blob => {
      if (!blob) throw new Error("Video thumbnail failed to load");
      const image = URL.createObjectURL(blob);
      canvas.remove();
      resolve(image);
    });
  });
}

export async function resolveSrcFromSrcSet({ srcSet, sizes }) {
  const stringSrcSet = srcSetToString(srcSet);

  const source = await Promise.all(
    stringSrcSet.split(", ").map(async srcString => {
      const [src, width] = srcString.split(" ");
      const size = Number(width.replace("w", ""));
      const image = await generateImage(size);
      return { src, image, width };
    })
  );

  const fakeSrcSet = source
    .map(({ image, width }) => `${image} ${width}`)
    .join(", ");

  const fakeSrc = await loadImageFormSrcSet({ srcSet: fakeSrcSet, sizes });

  const output = source.find(src => src.image === fakeSrc);
  return output.src;
}
