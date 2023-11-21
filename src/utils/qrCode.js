export const handleDownloadQr = (qrCodeRef) => {
  // Access the QR code SVG element using the ref
  const svgElement = qrCodeRef.current.firstChild;
  // Create a data URI from the SVG content
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const dataUri = `data:image/svg+xml;base64,${btoa(svgData)}`;

  // Create an image element to convert SVG to PNG
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "QRCode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  image.src = dataUri;
};
