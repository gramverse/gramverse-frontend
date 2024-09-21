import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import Upload from "@asset/svg/upload-photo.svg";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  setSelectedPhoto: (arg: File) => void;
};

export const UploadPhoto = (props: UploadImageProps) => {
  const { className, style, setSelectedPhoto, ...attrs } = props;
  return (
    <label
      className={clsx("cursor-pointer overflow-hidden", className)}
      style={style}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (file) setSelectedPhoto(file);
          event.target.value = "";
        }}
        {...attrs}
      />
      <img className="h-full w-full object-cover" src={Upload} />
    </label>
  );
};
