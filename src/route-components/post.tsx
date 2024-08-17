import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from "react";
import {
  ContainterMobile,
  ContainterWeb,
} from "../reusable-components/container";
import checked from "../assets/svg/check-mark.svg";
import circle from "../assets/svg/circle.svg";
import dot from "../assets/svg/circle-dot.svg";
import line from "../assets/svg/line.svg";
import { useCreatePost } from "../api-hooks/post";
import clsx from "clsx";
import { Button } from "../reusable-components/button";
import { InputField } from "../reusable-components/input-field";
import Emoji from "../assets/svg/emoji.svg";
import Camera from "../assets/svg/camera.svg";
import { TextArea } from "../reusable-components/text-area";
import { Post, PostFormData, PostFormDataSchema } from "../common/types/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "../reusable-components/alert";
import { UploadImage } from "../reusable-components/upload-image";
import { nanoid } from "nanoid";
interface ProgressIndicatorTypes extends HTMLAttributes<HTMLDivElement> {
  text: string;
  state: "current" | "done" | "toBeDone";
}
const ProgressIndicator = ({
  text,
  state,
  className,
}: ProgressIndicatorTypes) => {
  return (
    <div className={clsx("m-0 flex flex-col gap-2 p-0", className)}>
      <img
        src={state === "current" ? dot : state === "done" ? checked : circle}
        className="h-5"
        alt=""
      />
      <span className="text-xs text-black">{text}</span>
    </div>
  );
};
const ProgressBar = ({ stage }: { stage: number }) => {
  return (
    <div dir="ltr" className="m-0 flex flex-row-reverse items-center p-0">
      <ProgressIndicator
        text={"عکس"}
        state={stage === 1 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <img src={line} className="mt-2 h-1 w-fit self-start" />
      <ProgressIndicator
        text={"متن"}
        state={stage === 1 ? "toBeDone" : stage === 2 ? "current" : "done"}
        className="z-10 -mr-1"
      />
      <img src={line} className="w-f0t mt-2 h-1 self-start" />
      <ProgressIndicator
        text={"تنظیمات"}
        state={stage < 3 ? "toBeDone" : "current"}
        className="z-10 -ml-4"
      />
    </div>
  );
};

interface props extends InputHTMLAttributes<HTMLInputElement> {
  queryValue: Partial<Post> | undefined;
}
interface captionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  queryValue: Partial<Post> | undefined;
}
const SelectPhotos = forwardRef<HTMLInputElement, props>((props, ref) => {
  const queryPhotos = props.queryValue?.photoUrls;
  const defaultPhotos = queryPhotos ? queryPhotos : [];
  const { name, onChange } = props;
  const [photos, setPhotos] = useState<Array<string>>(defaultPhotos);
  const setSelectedPhotos = (selectedPhotos: Array<string>) => {
    setPhotos(selectedPhotos);
  };
  return (
    <div className="flex w-full flex-col items-center">
      <p>عکس های مورد نظرت رو آپلود کن</p>
      <div
        className={clsx(
          "grid gap-3",
          photos.length == 0 && `grid-cols-1`,
          photos.length == 1 && `grid-cols-2`,
          photos.length >= 2 && `grid-cols-3`,
        )}
      >
        <UploadImage
          multiple={true}
          setSelectedPhotos={setSelectedPhotos}
          placeholderImage={Camera}
          ref={ref}
          name={name}
          onChange={onChange}
        />
        {photos.map((photo) => {
          return (
            <img
              src={photo}
              key={nanoid()}
              className="h-24 w-24 overflow-hidden rounded-3xl"
            />
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
  const { name, onChange } = props;
  return (
    <div className="flex flex-col items-center">
      <span className="flex flex-row justify-between">
        <p>کپشن مورد نظرت رو بنویس:</p>
        <img src={Emoji} alt="" />
      </span>

      <TextArea
        ref={ref}
        name={name}
        onChange={onChange}
        defaultValue={props.queryValue?.caption?.concat(
          hashtags ? hashtags : "",
        )}
        rows={7}
        cols={40}
      />
    </div>
  );
});

const Mention = forwardRef<HTMLInputElement, props>((props, ref) => {
  const { name, onChange } = props;
  return (
    <div ref={ref} className="flex w-full flex-col items-center">
      <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
      <InputField
        ref={ref}
        name={name}
        onChange={onChange}
        defaultValue={props.queryValue?.mentions
          ?.map((mention) => `@${mention}`)
          .reduce((prev, cur) => `${prev} ${cur}`, "")}
        fieldsize={"medium"}
      />
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
  const { mutate } = useCreatePost();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<PostFormData>({
    mode: "onChange",
    resolver: zodResolver(PostFormDataSchema),
  });
  const onSubmit: SubmitHandler<PostFormData> = (data) => {
    if (data.photos) {
      mutate(data);
    } else if (post) {
      const postData: PostFormData = {
        ...data,
        photos: post.photoUrls,
      };
      mutate(postData);
    }
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
    <div className="my-12 flex w-fit grow flex-col items-center gap-5">
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
              queryValue={{ photoUrls: post?.photoUrls }}
              {...register("photos")}
            />
          )}
          {stage === 2 && (
            <Caption
              queryValue={{ caption: post?.caption, hashtags: post?.hashtags }}
              {...register("caption")}
            />
          )}
          {stage === 3 && (
            <Mention
              queryValue={{ mentions: post?.mentions }}
              {...register("mentions")}
            />
          )}
        </section>
        <section className="flex items-center justify-end gap-5 self-end">
          <span
            onClick={() => {
              Close();
            }}
          >
            پشیمون شدم
          </span>
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

export const CreatePost = ({
  Close,
  post,
}: {
  Close: () => void;
  post: Post | null;
}) => {
  return (
    <ContainterWeb>
      <CreatePostLayout post={post} Close={Close} />
    </ContainterWeb>
  );
};

export const CreatePostMobile = ({
  Close,
  post,
}: {
  Close: () => void;
  post: Post | null;
}) => {
  return (
    <ContainterMobile>
      <CreatePostLayout post={post} Close={Close} />
    </ContainterMobile>
  );
};
