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
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useCreatePost, useEditPost } from "../../api-hooks/post";
import { useGetPost } from "../../api-hooks/post-details";
import Camera from "../../assets/svg/camera.svg";
import Close from "../../assets/svg/close.svg";
import Emoji from "../../assets/svg/emoji.svg";
import {
  EditPostFormData,
  PostFormData,
  PostFormDataSchema,
} from "../../common/types/post";
import { Alert } from "../../reusable-components/alert";
import { Button } from "../../reusable-components/button";
import {
  ContainterMobile,
  ContainterWeb,
} from "../../reusable-components/container";
import { EmojiKeyboard } from "../../reusable-components/emoji/emoji-keyboard";
import { InputField } from "../../reusable-components/input-field";
import { Switch } from "../../reusable-components/switch";
import { TextArea } from "../../reusable-components/text-area";
import { UploadImage } from "../../reusable-components/upload-image";
import { ProgressIndicator } from "./progress-indicator";
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

interface mentionProps extends InputHTMLAttributes<HTMLInputElement> {
  mentions: Array<string>;
  setMentions: React.Dispatch<React.SetStateAction<string[]>>;
  removeMention: (index: number) => void;
}
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

const Mention = forwardRef<HTMLInputElement, mentionProps>((props, ref) => {
  const { name, onChange, mentions, setMentions, removeMention } = props;
  return (
    <div className="flex w-full flex-col items-center">
      <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
      <InputField
        direction="left"
        autoFocus
        ref={ref}
        dir="ltr"
        name={name}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            const typedMention = (e.target as HTMLInputElement).value;
            if (typedMention.match(/(@[A-Za-z0-9_]+)/g)?.length === 1) {
              setMentions((mentions) => mentions.concat(typedMention.slice(1)));
              (e.target as HTMLInputElement).value = "";
            }
          } else if (e.key == " ") {
            e.preventDefault();
            (e.target as HTMLInputElement).value = (
              e.target as HTMLInputElement
            ).value.trim();
          }
        }}
        onChange={onChange}
        fieldsize={"medium"}
      />

      <div className="flex flex-row-reverse flex-wrap self-end">
        {mentions.map((mention, index) => (
          <div className="relative h-10" key={nanoid()}>
            <img
              src={Close}
              className="absolute -left-1 -top-2 z-10 h-4 w-4 cursor-pointer"
              onClick={() => removeMention(index)}
            />
            <span
              key={mention + index}
              className="mx-1 my-2 rounded-md bg-gray-300 px-2 py-2 text-xs text-black"
            >
              {mention}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

const CreatePostLayout = ({ classes }: { classes?: string }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPost(params.postId);
  const [stage, setStage] = useState(1);

  const handleSuccess = useCallback(() => {
    // const closeButton = document.body.querySelector("#close-modal");
    // (closeButton as HTMLElement).click();
    navigate(-1);
  }, [navigate]);
  const { mutate: createPost, isPending: isCreatePending } =
    useCreatePost(handleSuccess);
  const { mutate: editPost, isPending: isEditPending } =
    useEditPost(handleSuccess);
  const [mentions, setMentions] = useState<Array<string>>(post?.mentions ?? []);
  const [caption, setCaption] = useState(post?.caption ?? "");
  const [photoFiles, setPhotoFiles] = useState<Array<File>>([]);
  const [photoURLs, setPhotoURLs] = useState<Array<string>>(
    post?.photoUrls ?? [],
  );

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

  const onSubmit: SubmitHandler<z.infer<typeof PostFormDataSchema>> = (
    data,
  ) => {
    const postData: PostFormData = {
      caption,
      mentions,
      photoURLs,
      photoFiles,
      isForCloseFriends: data.isForCloseFriends,
    };
    if (params.postId) {
      const editPostData: EditPostFormData = {
        ...postData,
        _id: post?._id ?? "",
      };
      editPost(editPostData);
    } else {
      createPost(postData);
    }
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
        "my-5 flex min-h-96 w-80 grow flex-col items-center gap-5 transition-transform",
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
            <Caption
              caption={caption}
              setCaption={setCaption}
              hashtags={post?.tags ?? []}
            />
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
              setTimeout(() => {
                navigate(-1);
              }, 450);
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
            <Button
              type="submit"
              id="submit-modal"
              isPending={isCreatePending || isEditPending}
            >
              {"ثبت و انتشار پست"}
            </Button>
          )}
        </section>
      </form>
    </div>
  );
};

export const CreatePost = () => {
  return (
    <ContainterWeb>
      <CreatePostLayout />
    </ContainterWeb>
  );
};

export const CreatePostMobile = () => {
  return (
    <ContainterMobile className="w-fit rounded-t-3xl border-2 border-solid border-gray-300">
      <CreatePostLayout classes="h-[700px] px-1 " />
    </ContainterMobile>
  );
};
