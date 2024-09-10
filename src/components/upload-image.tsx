import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { blobToDataUrl } from "../common/utilities/blob-to-data-url.ts";
import clsx from "clsx";
import Error from "../assets/svg/error.svg";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  size?: string;
  error?: string;
  defaultValue?: string;
  placeholderImage?: string;
  setSelectedPhotos?: React.Dispatch<React.SetStateAction<File[]>>;
};

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  function UploadImage(
    {
      onChange,
      name,
      placeholderImage,
      className,
      style,
      error,
      multiple = false,
      setSelectedPhotos = () => {},
      ...attrs
    },
    ref,
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
          blobToDataUrl(file).then(setImagePreview);
        } else {
          if (event.target.files) {
            setSelectedPhotos(Array.from(event.target.files));
          }
        }
      },
      [multiple, onChange, setSelectedPhotos],
    );
    return (
      <>
        <label
          className={clsx("cursor-pointer overflow-hidden", className)}
          style={style}
        >
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
          <img className="h-full w-full object-cover" src={imagePreview} />
        </label>
        {!!error && (
          <div className="m-1 w-80 ps-2 text-center">
            <img src={Error} className="m-2 h-full" alt="" />
            <span className="text-xs text-red-600">{error}</span>
          </div>
        )}
      </>
    );
  },
);
