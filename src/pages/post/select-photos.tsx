import clsx from "clsx";
import { nanoid } from "nanoid";
import { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import { UploadImage } from "../../components/upload-image";
import Close from "../../assets/svg/close.svg";
import Camera from "../../assets/svg/camera.svg";
// import { Modal } from "../../reusable-components/modal";
// import { EditPhoto } from "./edit-photo";

interface photoProps extends InputHTMLAttributes<HTMLInputElement> {
  photoFiles: Array<File>;
  setPhotoFiles: React.Dispatch<React.SetStateAction<Array<File>>>;
  photoURLs: Array<string>;
  setPhotoURLs: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export const SelectPhotos = forwardRef<HTMLInputElement, photoProps>(
  (props, ref) => {
    const {
      name,
      onChange,
      photoFiles,
      setPhotoFiles,
      photoURLs,
      setPhotoURLs,
    } = props;

    const [selctedPhotos, setSelectedPhotos] = useState<Array<File>>([]);
    const [photoThumbnails, setPhotoThumbnails] = useState<
      Array<[string, string]>
    >(photoFiles.map((file) => [URL.createObjectURL(file), file.name]));
    useEffect(() => {
      setPhotoFiles((photoFiles) =>
        photoFiles.filter((file) =>
          photoThumbnails.map((arr) => arr[1]).includes(file.name),
        ),
      );
    }, [photoThumbnails, setPhotoFiles]);
    useEffect(() => {
      setPhotoFiles((photoFiles) => photoFiles.concat(selctedPhotos));
      setPhotoThumbnails((photoThumbnails) =>
        photoThumbnails.concat(
          selctedPhotos.map((photo) => [
            URL.createObjectURL(photo),
            photo.name,
          ]),
        ),
      );
    }, [selctedPhotos, setPhotoFiles]);
    // const [isEditOpen, openEdit] = useState(false);
    // const [selectedPhoto, setSelectedPhoto] = useState<File>(new File([], ""));
    return (
      <div className="flex w-full flex-col items-center">
        {/* <Modal isOpen={isEditOpen} close={() => openEdit(false)}>
          <EditPhoto photo={selectedPhoto} />
        </Modal> */}
        <p>عکس های مورد نظرت رو آپلود کن</p>
        <div
          className={clsx(
            "grid grid-flow-row auto-rows-max gap-3",
            photoURLs.length + photoFiles.length == 0 && `grid-cols-1`,
            photoURLs.length + photoFiles.length == 1 && `grid-cols-2`,
            photoURLs.length + photoFiles.length >= 2 && `grid-cols-3`,
          )}
        >
          <UploadImage
            multiple={true}
            setSelectedPhotos={setSelectedPhotos}
            placeholderImage={Camera}
            ref={ref}
            name={name}
            onChange={onChange}
            className="h-20 w-20"
          />
          {photoThumbnails.map((photo, index) => {
            return (
              <div
                className="relative h-24"
                key={nanoid()}
                onClick={() => {
                  // setSelectedPhoto(photoFiles[index]);
                  // openEdit(true);
                }}
              >
                <img
                  src={Close}
                  className="absolute -right-1 -top-1 z-10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoThumbnails((photoThumbnails) => {
                      return photoThumbnails
                        .slice(0, index)
                        .concat(photoThumbnails.slice(index + 1));
                    });
                  }}
                />
                <img
                  src={photo[0]}
                  className="absolute h-20 w-20 overflow-hidden rounded-3xl"
                />
              </div>
            );
          })}
          {photoURLs.map((photo, index) => {
            return (
              <div
                className="relative h-24"
                key={nanoid()}
                onClick={() => {
                  // setSelectedPhoto(photoFiles[index]);
                  // openEdit(true);
                }}
              >
                <img
                  src={Close}
                  className="absolute -right-1 -top-1 z-10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoURLs((photoURLs) => {
                      return photoURLs
                        .slice(0, index)
                        .concat(photoURLs.slice(index + 1));
                    });
                  }}
                />
                <img
                  src={photo}
                  className="absolute h-20 w-20 overflow-hidden rounded-3xl"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
