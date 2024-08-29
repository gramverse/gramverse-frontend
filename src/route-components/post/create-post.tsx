import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { nanoid } from "nanoid";
import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreatePost } from "../../api-hooks/post";
import Camera from "../../assets/svg/camera.svg";
import Close from "../../assets/svg/close.svg";
import Emoji from "../../assets/svg/emoji.svg";
import {
  CreatePostFormData,
  PostFormDataSchema,
} from "../../common/types/post";
import { Alert } from "../../reusable-components/alert";
import { Button } from "../../reusable-components/button";
import { ContainterWeb } from "../../reusable-components/container";
import { EmojiKeyboard } from "../../reusable-components/emoji/emoji-keyboard";
import { Switch } from "../../reusable-components/switch";
import { TextArea } from "../../reusable-components/text-area";
import { UploadImage } from "../../reusable-components/upload-image";
import { ProgressIndicator } from "./progress-indicator";
import { Mention } from "./mentions";
const ProgressBar = ({ stage }: { stage: number }) => {
  return (
    <div className="m-0 flex flex-row-reverse items-center p-0">
      <ProgressIndicator
        text={"عکس"}
        state={stage === 1 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <span
        className={clsx(
          "border-1 mt-2 w-32 self-start border-solid",
          stage < 2 && "border-gray-300",
          stage >= 2 && "border-black",
        )}
      />
      <ProgressIndicator
        text={"متن"}
        state={stage === 1 ? "toBeDone" : stage === 2 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <span
        className={clsx(
          "border-1 mt-2 w-32 self-start border-solid",
          stage < 3 && "border-gray-300",
          stage === 3 && "border-black",
        )}
      />
      <ProgressIndicator
        text={"تنظیمات"}
        state={stage < 3 ? "toBeDone" : "current"}
        className="z-10 -ml-5"
      />
    </div>
  );
};

interface photoProps extends InputHTMLAttributes<HTMLInputElement> {
  photoFiles: Array<File>;
  setPhotoFiles: React.Dispatch<React.SetStateAction<Array<File>>>;
  photoURLs: Array<string>;
  setPhotoURLs: React.Dispatch<React.SetStateAction<Array<string>>>;
}
interface captionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  hashtags: Array<string>;
}
const SelectPhotos = forwardRef<HTMLInputElement, photoProps>((props, ref) => {
  const { name, onChange, photoFiles, setPhotoFiles, photoURLs, setPhotoURLs } =
    props;

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
        selctedPhotos.map((photo) => [URL.createObjectURL(photo), photo.name]),
      ),
    );
  }, [selctedPhotos, setPhotoFiles]);
  return (
    <div className="flex w-full flex-col items-center">
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
            <div className="relative h-24" key={nanoid()}>
              <img
                src={Close}
                className="absolute -right-1 -top-1 z-10 cursor-pointer"
                onClick={() =>
                  setPhotoThumbnails((photoThumbnails) => {
                    return photoThumbnails
                      .slice(0, index)
                      .concat(photoThumbnails.slice(index + 1));
                  })
                }
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
            <div className="relative h-24" key={nanoid()}>
              <img
                src={Close}
                className="absolute -right-1 -top-1 z-10 cursor-pointer"
                onClick={() =>
                  setPhotoURLs((photoURLs) => {
                    return photoURLs
                      .slice(0, index)
                      .concat(photoURLs.slice(index + 1));
                  })
                }
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
});

const Caption = forwardRef<HTMLTextAreaElement, captionProps>((props, ref) => {
  const { name, onChange, caption, setCaption } = props;
  // const hashtagString = hashtags
  //   ?.map((mention) => `#${mention}`)
  //   .reduce((prev, cur) => `${prev} ${cur}`, "");

  const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <span className="flex w-full flex-row justify-around">
        <p>کپشن مورد نظرت رو بنویس:</p>
        <img
          src={Emoji}
          alt=""
          onClick={() =>
            setKeyboardVisibility((isKeyBoardVisible) => !isKeyBoardVisible)
          }
        />
      </span>
      <div className="relative h-52 w-80 self-center">
        <EmojiKeyboard
          visibility={isKeyBoardVisible}
          setEmoji={(emoji) => {
            setCaption((caption) => caption.concat(emoji));
            setKeyboardVisibility(false);
          }}
        />
        <TextArea
          className="absolute z-10"
          id="caption"
          autoFocus
          ref={ref}
          value={caption}
          name={name}
          onChange={(e) => {
            setCaption(e.target.value);
            onChange?.(e);
          }}
          maxLength={500}
          rows={7}
          cols={40}
        />
      </div>
    </div>
  );
});

const CreatePostLayout = ({
  classes,
  close,
}: {
  classes?: string;
  close?: () => void;
}) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [mentions, setMentions] = useState<Array<string>>([]);
  const [caption, setCaption] = useState("");
  const [photoFiles, setPhotoFiles] = useState<Array<File>>([]);
  const [photoURLs, setPhotoURLs] = useState<Array<string>>([]);
  const handleSuccess = useCallback(() => {
    if (close) {
      close();
    } else {
      navigate(-1);
    }
  }, [close, navigate]);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof PostFormDataSchema>>({
    mode: "onChange",
    resolver: zodResolver(PostFormDataSchema),
  });
  const [photoError, setPhotoError] = useState(errors.photos?.message);
  const { isPending, mutate } = useCreatePost(handleSuccess);

  const onSubmit: SubmitHandler<z.infer<typeof PostFormDataSchema>> = (
    data,
  ) => {
    const postData: CreatePostFormData = {
      caption,
      mentions,
      photoFiles,
      isForCloseFriends: data.isForCloseFriends,
    };
    mutate(postData);
  };
  const handleClick = useCallback(() => {
    stage === 1
      ? trigger("photos").then((value) => {
          value && (photoFiles.length !== 0 || photoURLs.length !== 0)
            ? setStage(stage + 1)
            : setStage(stage);
        })
      : stage === 2
        ? setStage(stage + 1)
        : () => {};
  }, [photoFiles.length, photoURLs.length, stage, trigger]);
  useEffect(() => {
    if (photoFiles.length !== 0 || photoURLs.length !== 0) {
      setPhotoError(errors.photos?.message);
    }
  }, [errors.photos?.message, photoFiles.length, photoURLs.length]);

  return (
    <div
      className={clsx(
        "my-5 flex w-80 grow flex-col items-center gap-5 transition-transform",
        classes,
      )}
    >
      <ProgressBar stage={stage} />
      <Alert
        status="error"
        message={
          stage === 1 ? photoError : stage === 3 ? errors.mentions?.message : ""
        }
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full grow flex-col items-center justify-between gap-6"
      >
        <section className="w-full">
          {stage === 1 && (
            <SelectPhotos
              photoFiles={photoFiles}
              photoURLs={photoURLs}
              setPhotoFiles={setPhotoFiles}
              setPhotoURLs={setPhotoURLs}
              {...register("photos")}
            />
          )}
          {stage === 2 && (
            <Caption caption={caption} setCaption={setCaption} hashtags={[]} />
          )}
          {stage === 3 && (
            <Mention
              removeMention={(index) =>
                setMentions((mentions) =>
                  mentions.slice(0, index).concat(mentions.slice(index + 1)),
                )
              }
              mentions={mentions}
              setMentions={setMentions}
              {...register("mentions")}
            />
          )}
        </section>
        {stage === 3 && (
          <Switch
            className=""
            label="فقط به دوستان نزدیکم نمایش بده"
            {...register("isForCloseFriends")}
          />
        )}
        <section className="flex items-center justify-end gap-5 self-end">
          <Button
            btnColor="transparent"
            id={"close-modal"}
            onClick={() => {
              if (close) {
                close();
              } else {
                navigate(-1);
              }
            }}
          >
            پشیمون شدم
          </Button>
          {stage < 3 && (
            <Button
              type="button"
              onClick={() => {
                if (photoFiles.length === 0 && photoURLs.length === 0) {
                  setPhotoError("حدافل یک عکس انتخاب کنید");
                } else {
                  setPhotoError(errors.photos?.message);
                }
                handleClick();
              }}
            >
              {"بعدی"}
            </Button>
          )}
          {stage === 3 && (
            <Button type="submit" id="submit-modal" isPending={isPending}>
              {"ثبت و انتشار پست"}
            </Button>
          )}
        </section>
      </form>
    </div>
  );
};
export const CreatePost = ({ close }: { close: () => void }) => {
  return (
    <ContainterWeb>
      <CreatePostLayout close={close} />
    </ContainterWeb>
  );
};

export const CreatePostMobile = () => {
  return (
    <div className="grow">
      <CreatePostLayout classes={clsx("h-[680px] px-1")} />
    </div>
  );
};
