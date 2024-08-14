import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { blobToDataUrl } from "../common/blob-to-data-url";
import clsx from "clsx";
import Error from "../assets/svg/error.svg";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  size?: string;
  defaultValue?: string;
  placeholderImage?: string;
  error?: string;
};

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  function UploadImage(
    { onChange, placeholderImage, error = "", className, style, ...attrs },
    ref
  ) {
    const [imagePreview, setImagePreview] = useState(placeholderImage);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        event.stopPropagation();
        onChange?.(event);
        const file = event.currentTarget.files?.[0];

        if (!file) {
          return;
        }

        blobToDataUrl(file).then(setImagePreview);
      },
      [onChange]
    );

    return (
      <>
        <label className={clsx("overflow-hidden", className)} style={style}>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            {...attrs}
          />
          <img className="w-full h-full" src={imagePreview} />
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
