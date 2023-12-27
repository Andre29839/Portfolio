export function handleDownloadCV() {
  const downloadLink = document.createElement("a");
  downloadLink.href = "/Front-End_Andrii_Nepomniashchyi.pdf";
  downloadLink.download = "Front-End_Andrii_Nepomniashchyi.pdf";
  downloadLink.click();
}
