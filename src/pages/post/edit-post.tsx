import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useEditPost } from "../../services/post";
import { useGetPost } from "../../services/post-details";
import { EditPostFormData, PostFormDataSchema } from "../../types/post";
import { Button } from "../../components/button";
import { ContainterWeb } from "../../components/container";
import { Switch } from "../../components/switch";
import { Mention } from "./mentions";
import { SelectPhotos } from "./select-photos";
import { Caption } from "./caption";
import { ProgressBar } from "./progress-bar";
import { Alert } from "../../components/alert";

const EditPostLayout = ({
  classes,
  postId,
  close,
}: {
  classes?: string;
  postId?: string;
  close?: () => void;
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post, isSuccess } = useGetPost(postId ?? params.postId);
  const [stage, setStage] = useState(1);
  const [mentions, setMentions] = useState<Array<string>>([]);
  const [caption, setCaption] = useState("");
  const [photoFiles, setPhotoFiles] = useState<Array<File>>([]);
  const [photoURLs, setPhotoURLs] = useState<Array<string>>([]);
  useEffect(() => {
    if (isSuccess) {
      setMentions(post.mentions);
      setCaption(post.caption);
      setPhotoURLs(post.photoUrls);
    }
  }, [isSuccess]);
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
  const { isPending, mutate } = useEditPost(handleSuccess);

  const onSubmit: SubmitHandler<z.infer<typeof PostFormDataSchema>> = (
    data,
  ) => {
    const postData: EditPostFormData = {
      caption,
      mentions,
      photoURLs,
      photoFiles,
      forCloseFriends: data.forCloseFriends,
      _id: isSuccess ? post._id : "",
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
            defaultChecked={post?.forCloseFriends}
            className=""
            label="فقط به دوستان نزدیکم نمایش بده"
            {...register("forCloseFriends")}
          />
        )}
        <section className="flex items-center justify-end gap-5 self-end">
          <Button
            btnColor="transparent"
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
            <Button
              type="submit"
              id="submit-modal"
              isPending={isPending}
              disabled={isPending}
            >
              {"ثبت و انتشار پست"}
            </Button>
          )}
        </section>
      </form>
    </div>
  );
};

export const EditPost = ({
  close,
  postId,
}: {
  close: () => void;
  postId: string;
}) => {
  return (
    <ContainterWeb>
      <EditPostLayout close={close} postId={postId} />
    </ContainterWeb>
  );
};

export const EditPostMobile = () => {
  return (
    <div className="grow">
      <EditPostLayout classes={clsx("h-[680px] px-1")} />
    </div>
  );
};
