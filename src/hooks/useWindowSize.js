import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";

export function useWindowSize() {
  const dimensions = useRef(() => ({ w: 1280, h: 800 }));

  const createRuler = useCallback(() => {
    let ruler = document.createElement("div");

    ruler.style.position = "fixed";
    ruler.style.height = "100vh";
    ruler.style.width = 0;
    ruler.style.top = 0;

    document.documentElement.appendChild(ruler);

    dimensions.current.w = window.innerWidth;
    dimensions.current.h = ruler.offsetHeight;

    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);

  const getHeight = useCallback(() => {
    const isIOS = navigator?.userAgent.match(/ophone|ipod|ipad/i);

    if (isIOS) {
      createRuler();
      return dimensions.current.h;
    }

    return window.innerHeight;
  }, [createRuler]);

  const getSize = useCallback(() => {
    return {
      width: window.innerWidth,
      height: getHeight(),
    };
  }, [getHeight]);

  const [windowSize, setWindowSize] = useState(dimensions.current);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getSize]);

  return windowSize;
}
