import {
  ChangeEventHandler,
  InputHTMLAttributes,
  useCallback,
} from "react";
import clsx from "clsx";
import Upload from "../../assets/svg/upload-photo.svg";
import { blobToDataUrl } from "../../common/utilities/blob-to-data-url";

export type UploadImageProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue"
> & {
  setSelectedPhoto: (arg: string) => void;
};

export const UploadPhoto = (props:UploadImageProps)=> {
  const{setSelectedPhoto,className,style,...attrs} = props
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      async (event) => {
        event.stopPropagation();
        const file = event.currentTarget.files?.[0];
        if (file) {
          setSelectedPhoto(await blobToDataUrl(file));
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
          onChange={handleFileChange}
          {...attrs}
        />
        <img className="h-full w-full object-cover" src={Upload} />
      </label>
    );
  }
