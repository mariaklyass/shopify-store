import React, { useRef, useEffect } from "react";

const ImageCanvas = ({ images }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    images.forEach((imageNode, _index) => {
      const image = new Image();
      image.src = imageNode.src;

      image.onload = () => {
        const wrh = image.width / image.height;
        let newWidth = canvas.width;
        let newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = newHeight * wrh;
        }
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
      };
    });
  }, [images]);

  return <canvas ref={canvasRef} width={200} height={200} />;
};

export default ImageCanvas;
