import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from "react";
import clsx from "clsx";
import Upload from "../../assets/svg/upload-photo.svg";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  setSelectedPhoto: (arg: File) => void;
};

export const UploadPhoto = forwardRef<HTMLInputElement, UploadImageProps>(
  function UploadImage(
    { name, className, style, setSelectedPhoto = () => {}, ...attrs },
    ref,
  ) {
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      async (event) => {
        event.stopPropagation();
        const file = event.currentTarget.files?.[0];
        if (file) {
          setSelectedPhoto(file);
        } else {
          return;
        }
      },
      [setSelectedPhoto],
    );
    return (
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
        <img className="h-full w-full object-cover" src={Upload} />
      </label>
    );
  },
);
