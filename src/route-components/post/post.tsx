import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { nanoid } from "nanoid";
import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePost, useEditPost } from "../../api-hooks/post";
import {
  Post,
  PostFormData,
  PostFormDataSchema,
} from "../../common/types/post";
import { Alert } from "../../reusable-components/alert";
import { Button } from "../../reusable-components/button";
import {
  ContainterMobile,
  ContainterWeb,
} from "../../reusable-components/container";
import { InputField } from "../../reusable-components/input-field";
import { TextArea } from "../../reusable-components/text-area";
import { UploadImage } from "../../reusable-components/upload-image";
import Camera from "../../assets/svg/camera.svg";
import Emoji from "../../assets/svg/emoji.svg";
import Close from "../../assets/svg/close.svg";
import { ModalContext } from "../main/main";
import { ProgressIndicator } from "./progress-indicator";
import { EmojiKeyboard } from "../../reusable-components/emoji/emoji-keyboard";
import { z } from "zod";
import {
  replaceEmojiCodes,
  replaceEmojiWithCodes,
} from "../../reusable-components/emoji/emoji-utilities";
import { useMainOutletContext } from "../main/outlet-context";
const ProgressBar = ({ stage }: { stage: number }) => {
  return (
    <div dir="ltr" className="m-0 flex flex-row-reverse items-center p-0">
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
  queryValue: Partial<Post> | undefined;
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
  queryValue: Partial<Post> | undefined;
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
}
const SelectPhotos = forwardRef<HTMLInputElement, photoProps>((props, ref) => {
  const { name, onChange, photoFiles, setPhotoFiles, photoURLs, setPhotoURLs } =
    props;

  const [selctedPhotos, setSelectedPhotos] = useState<Array<File>>([]);
  const [photoThumblains, setPhotoThumblains] = useState<
    Array<[string, string]>
  >(photoFiles.map((file) => [URL.createObjectURL(file), file.name]));
  useEffect(() => {
    setPhotoFiles((photoFiles) =>
      photoFiles.filter((file) =>
        photoThumblains.map((arr) => arr[1]).includes(file.name),
      ),
    );
  }, [photoThumblains, setPhotoFiles]);
  useEffect(() => {
    setPhotoFiles((photoFiles) => photoFiles.concat(selctedPhotos));
    setPhotoThumblains((photoThumblains) =>
      photoThumblains.concat(
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
        {photoThumblains.map((photo, index) => {
          return (
            <div className="relative h-24" key={nanoid()}>
              <img
                src={Close}
                className="absolute -right-1 -top-1 z-10 cursor-pointer"
                onClick={() =>
                  setPhotoThumblains((photoThumblains) => {
                    return photoThumblains
                      .slice(0, index)
                      .concat(photoThumblains.slice(index + 1));
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
  const hashtags = props.queryValue?.hashtags
    ?.map((mention) => `#${mention}`)
    .reduce((prev, cur) => `${prev} ${cur}`, "");
  // const parseEmoji = useCallback((text: string) => {});
  const { name, onChange, caption, setCaption } = props;
  const [text, setText] = useState(replaceEmojiCodes(caption));

  useEffect(() => {
    setCaption(replaceEmojiWithCodes(text));
  }, [setCaption, text]);

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
            setText((text) => text.concat(String.fromCodePoint(emoji)));
            setKeyboardVisibility(false);
          }}
        />
        <TextArea
          className="absolute z-10"
          autoFocus
          ref={ref}
          value={text}
          name={name}
          onChange={(e) => {
            setText(e.target.value);
            onChange?.(e);
          }}
          maxLength={500}
          defaultValue={props.queryValue?.caption?.concat(
            hashtags ? hashtags : "",
          )}
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
        defaultValue={props.queryValue?.mentions
          ?.map((mention) => `@${mention}`)
          .reduce((prev, cur) => `${prev} ${cur}`, "")}
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

const CreatePostLayout = ({
  Close,
  post,
}: {
  Close: () => void;
  post: Post | null;
}) => {
  const [stage, setStage] = useState(1);
  const { mutate: createPost } = useCreatePost();
  const { mutate: editPost } = useEditPost();
  const [mentions, setMentions] = useState<Array<string>>([]);
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
  const onSubmit: SubmitHandler<z.infer<typeof PostFormDataSchema>> = () => {
    const postData: PostFormData = {
      caption,
      mentions,
      photoURLs,
      photoFiles,
    };
    if (post) {
      editPost(postData);
    } else {
      createPost(postData);
    }
    // console.log(postData);
  };
  const handleClick = useCallback(() => {
    stage === 1
      ? trigger("photos").then((value) =>
          value ? setStage(stage + 1) : setStage(stage),
        )
      : trigger("caption").then((value) =>
          value ? setStage(stage + 1) : setStage(stage),
        );
  }, [stage, trigger]);

  return (
    <div className="my-5 flex min-h-80 w-fit grow flex-col items-center gap-5 transition-transform">
      <ProgressBar stage={stage} />
      <Alert
        status="error"
        message={
          stage === 1
            ? errors.photos?.message
            : stage === 2
              ? errors.caption?.message
              : errors.mentions?.message
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
              queryValue={{ caption: post?.caption, hashtags: post?.hashtags }}
              {...register("caption")}
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
              queryValue={{ mentions: post?.mentions }}
              {...register("mentions")}
            />
          )}
        </section>
        <section className="flex items-center justify-end gap-5 self-end">
          <Button
            onClick={() => {
              Close();
            }}
            btnColor="transparent"
          >
            پشیمون شدم
          </Button>
          {stage < 3 && (
            <Button type="button" onClick={handleClick}>
              {"بعدی"}
            </Button>
          )}
          {stage === 3 && <Button type="submit">{"ثبت و انتشار پست"}</Button>}
        </section>
      </form>
    </div>
  );
};

export const CreatePost = ({ post }: { post: Post | null }) => {
  const { setModal } = useContext(ModalContext);
  return (
    <ContainterWeb>
      <CreatePostLayout
        post={post}
        Close={() => {
          setModal(null);
        }}
      />
    </ContainterWeb>
  );
};

export const CreatePostMobile = () => {
  const { setTab, post } = useMainOutletContext();
  return (
    <ContainterMobile>
      <CreatePostLayout post={post} Close={() => setTab("explore")} />
    </ContainterMobile>
  );
};
