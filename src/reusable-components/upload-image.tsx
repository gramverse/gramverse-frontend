import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { blobToDataUrl } from "../common/blob-to-data-url.ts";
import clsx from "clsx";
import Error from "../assets/svg/error.svg";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  size?: string;
  defaultValue?: string;
  placeholderImage?: string;
  setSelectedPhotos?: (input: Array<string>) => void;
};

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  function UploadImage(
    {
      onChange,
      name,
      placeholderImage,
      className,
      style,
      multiple = false,
      setSelectedPhotos = () => {},
      ...attrs
    },
    ref
  ) {
    const [imagePreview, setImagePreview] = useState(placeholderImage);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      async (event) => {
        event.stopPropagation();
        onChange?.(event);
        if (!multiple) {
          const file = event.currentTarget.files?.[0];
          if (!file) {
            return;
          }
          console.log(file.size, file.name);
          blobToDataUrl(file).then(setImagePreview);
        } else {
          if (event.target.files) {
            const fileReaderPromises = Array.from(event.target.files).map(
              blobToDataUrl
            );
            try {
              const urlResults = await Promise.all(fileReaderPromises);
              setSelectedPhotos(urlResults);
            } catch (error) {
              console.log(error);
            }
          }
        }
      },
      [multiple, onChange, setSelectedPhotos]
    );
    return (
      <>
      <label className={clsx("overflow-hidden", className)} style={style}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          ref={ref}
          onChange={handleFileChange}
          name={name}
          {...attrs}
        />
        <img className="w-fit h-fit" src={imagePreview} />
      </label>
       {!!error && (
          <div className="w-80 m-1 ps-2 text-center">
            <img src={Error} className=" m-2 h-full" alt="" />
            <span className="text-red-600 text-xs">{error}</span>
          </div>
        )}
        </>
    );
  }
);

