import { useEffect, useRef, useState } from "react";
import { blobToDataUrl } from "../../common/utilities/blob-to-data-url";

type EditPhoto = {
  photo: File;
};
export const EditPhoto = (props: EditPhoto) => {
  const { photo } = props;
  const [dimensions, setDimentions] = useState([0, 0]);
  const [image, setImage] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const [rect, setRect] = useState<DOMRect>();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [canvasRect, setCanvasRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  useEffect(() => {
    blobToDataUrl(photo).then((data) => {
      setImage(data);
      const img = new Image();
      img.src = data;
      const scale = Math.max(img.width, img.height) / 400;
      setDimentions([
        Math.floor(img.width / scale),
        Math.floor(img.height / scale),
      ]);
    });
    setRect(document.querySelector("#mask")?.getBoundingClientRect());
  }, []);

  useEffect(() => {
    setCanvasRect({
      x: 0,
      y: 0,
      width: Math.min(...dimensions),
      height: Math.min(...dimensions),
    });
    console.log(rect);
  }, [dimensions, rect]);
  useEffect(() => {
    canvas.current
      ?.getContext("2d")
      ?.fillRect(
        canvasRect.x,
        canvasRect.y,
        canvasRect.width,
        canvasRect.height,
      );
  }, [canvasRect]);
  return (
    <div className="relative bg-gray-400" onMouseUp={() => setIsMoving(false)}>
      <canvas
        ref={canvas}
        className="opacity-4 5 absolute z-30 bg-red-300"
        width={dimensions[0]}
        height={dimensions[1]}
        onMouseMove={(e) => {
          e.stopPropagation();
          if (isMoving) {
            console.log(canvasRect);
            console.log(...dimensions);
            setCanvasRect((canvasRect) => ({
              ...canvasRect,
              x: Math.min(
                Math.max(canvasRect.x + e.movementX, 0),
                dimensions[0] - canvasRect.width,
              ),
              y: Math.min(
                Math.max(canvasRect.y + e.movementY, 0),
                dimensions[1] - canvasRect.height,
              ),
            }));
          }
        }}
        onMouseDown={() => setIsMoving(true)}
        onMouseUp={() => setIsMoving(false)}
      />
      {/* <img
        id={"mask"}
        // src={image}
        className={clsx(
          "absolute z-10 bg-white object-cover object-right opacity-30",
        )}
        width={Math.min(...dimensions)}
        height={Math.min(...dimensions)}
        // onTouchMove={(e) => {
        //   console.log(e.touches.item(0).clientX);
        //   console.log(e.touches.item(0).clientY);
        // }}
        onMouseMove={(e) => {
          e.stopPropagation();
          if (isMoving) {
            setSelectionRect((selectionRect) => ({
              ...selectionRect,
              x: Math.min(e.clientX, selectionRect.x ?? e.clientX),
            }));
            // console.log(e.clientX, rect?.x);
            console.log(selectionRect);
            // console.log(e.movementY);
          }
        }}
        onMouseDown={() => setIsMoving(true)}
        onMouseUp={() => setIsMoving(false)}
      /> */}
      <img src={image} width={dimensions[0]} height={dimensions[1]}></img>
    </div>
  );
};
