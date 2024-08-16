import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  useCallback,
  useEffect,
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
import { useCreatePost, useGetPost } from "../api-hooks/post";
import clsx from "clsx";
import { Button } from "../reusable-components/button";
import { InputField } from "../reusable-components/input-field";
import Emoji from "../assets/svg/emoji.svg";
import Camera from "../assets/svg/camera.svg";
import { TextArea } from "../reusable-components/text-area";
import { Post, PostFormData, PostSchema } from "../common/types/post";
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
    <div className={clsx("flex flex-col gap-2 p-0 m-0", className)}>
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
    <div dir="ltr" className="flex flex-row-reverse items-center p-0 m-0">
      <ProgressIndicator
        text={"عکس"}
        state={stage === 1 ? "current" : "done"}
        className="-mr-1 z-10"
      />
      <img src={line} className="self-start w-fit h-1 mt-2 " />
      <ProgressIndicator
        text={"متن"}
        state={stage === 1 ? "toBeDone" : stage === 2 ? "current" : "done"}
        className="-mr-1 z-10"
      />
      <img src={line} className="self-start w-f0t h-1 mt-2" />
      <ProgressIndicator
        text={"تنظیمات"}
        state={stage < 3 ? "toBeDone" : "current"}
        className="-ml-4 z-10"
      />
    </div>
  );
};

interface props extends InputHTMLAttributes<HTMLInputElement> {
  queryValue: Partial<Post>|undefined
}

const SelectPhotos = forwardRef<HTMLInputElement, props>((props, ref) => {
  //const queryPhotos = props.queryValue?.photos ;
  //const defaultPhotos = queryPhotos?queryPhotos:[]
  const { name, onChange } = props;
  const [photos, setPhotos] = useState<Array<string>>([]);
  const setSelectedPhotos = (selectedPhotos: Array<string>) => {
    setPhotos(selectedPhotos);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <p>عکس های مورد نظرت رو آپلود کن</p>
      <div
        className={clsx(
          "grid gap-3",
          photos.length == 0 && `grid-cols-1`,
          photos.length == 1 && `grid-cols-2`,
          photos.length >= 2 && `grid-cols-3`
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
              //src={photo}
              key={nanoid()}
              className="rounded-3xl h-24 w-24 overflow-hidden"
            />
          );
        })}
      </div>
    </div>
  );
});

const Caption = forwardRef<HTMLDivElement, props>((props, ref) => {
  const hashtags = props.queryValue?.hashtags?.map((mention)=> `#${mention}`).reduce((prev,cur)=>`${prev} ${cur}`,'')
  return (
    <div ref={ref} className="flex flex-col w-full items-center">
      <span className="flex flex-row w-full justify-between">
        <p>کپشن مورد نظرت رو بنویس:</p>
        <img src={Emoji} alt="" />
      </span>

      <TextArea defaultValue={props.queryValue?.caption?.concat(hashtags ? hashtags:'')} rows={7} cols={40} />
    </div>
  );
});

const Mention = forwardRef<HTMLDivElement, props>((props, ref) => {
  return (
    <div ref={ref} className="flex flex-col w-full items-center">
      <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
      {/* <InputField defaultValue={props.queryValue?.mentions?.map((mention)=> `@${mention}`).reduce((prev,cur)=>`${prev} ${cur}`,'')} fieldsize={"large"} /> */}
    </div>
  );
});

const CreatePostLayout = ({ Close,id }: { Close: () => void,id:number|null }) => {
  const [stage, setStage] = useState(1);
  const { mutate } = useCreatePost();
  const { data: post } = useGetPost(id);

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<PostFormData>({
    mode: "onChange",
    resolver: zodResolver(PostSchema),
  });
  const onSubmit: SubmitHandler<PostFormData> = (data) => {
    if (data.photos) {
          mutate(data);
    } else if (post) {
      const postData:PostFormData = {
        ...data,
      //  photos:post?.photos
      }
      mutate(postData);
    }
  };
  const handleClick = useCallback(() => {
    stage === 1
      ? trigger("photos").then((value) =>
          value ? setStage(stage + 1) : setStage(stage)
        )
      : stage === 2
      ? trigger("caption").then((value) =>
          value ? setStage(stage + 1) : setStage(stage)
        )
      : trigger("mentions");
    setTimeout(() => {
      clearErrors();
    }, 2000);
  }, [clearErrors, stage, trigger]);

  useEffect(() => {
    console.log(stage)
  },[stage])
  return (
    <div className="flex bgColor flex-col items-center justify-between w-fit h-fit gap-5 my-auto ">
      <section>
        <ProgressBar stage={stage} />
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 justify-center items-center"
      >
        {stage === 1 && errors.photos?.message && (
          <Alert status="error" message={errors.photos?.message} />
        )}
        {stage === 2 && errors.caption?.message && (
          <Alert status="error" message={errors.caption?.message} />
        )}
        {stage === 2 && errors.mentions?.message && (
          <Alert status="error" message={errors.mentions?.message} />
        )}

        <section>
          {/* {stage === 1 && <SelectPhotos queryValue={{photos:post?.photos}} {...register("photos")} />} */}
          {stage === 2 && <Caption queryValue={{caption:post?.caption, hashtags:post?.hashtags}} {...register("caption")} />}
          {stage === 3 && <Mention queryValue={{mentions:post?.mentions}}{...register("mentions")} />}
        </section>
        <section className="flex gap-5 justify-end items-center w-full">
          <span
            onClick={() => {
              Close();
            }}
          >
            پشیمون شدم
          </span>
          <Button type={stage < 3 ? "button" : "submit"} onClick={handleClick}>
            {stage < 3 ? "بعدی" : "ثبت و انتشار پست"}
          </Button>
        </section>
      </form>
    </div>
  );
};

export const CreatePost = ({ Close,id }: { Close: () => void,id:number|null }) => {
  return (
    <ContainterWeb>
      <CreatePostLayout id={id} Close={Close} />
    </ContainterWeb>
  );
};

export const CreatePostMobile = ({ Close,id }: { Close: () => void,id:number|null }) => {
  return (
    <ContainterMobile>
      <CreatePostLayout  id={id} Close={Close} />
    </ContainterMobile>
  );
};





// export const CreatePost = ({ Close,id }: { Close: () => void,id:number|null }) => {
//   return (
//    // <ContainterWeb>
//       <CreatePostLayout id={id} Close={Close} />
//    // </ContainterWeb>
//   );
// };

// export const CreatePostMobile = ({ Close,id }: { Close: () => void,id:number|null }) => {
//   return (
//     //<ContainterMobile>
//       <CreatePostLayout  id={id} Close={Close} />
//     //</ContainterMobile>
//   );
// };

// const CreatePostLayout = ({ Close,id }: { Close: () => void,id:number|null }) => {
//   console.log(id)
//   return(<></>);
// }