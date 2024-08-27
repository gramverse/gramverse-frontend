import { HTMLAttributes, useState } from "react";
import { PostDetail } from "../../../common/types/post-detail";
import leftArrow from "../../../assets/svg/arrow.svg";
import clsx from "clsx";

interface Carousel
  extends HTMLAttributes<HTMLDivElement>,
    Pick<PostDetail, "photoUrls"> {}
export const Carousel = (props: Carousel) => {
  const { photoUrls: photoUrls, ...rest } = props;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="relative flex h-[375px] w-[500px] items-center justify-between"
        {...rest}
      >
        {photoUrls.length > 1 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 right-0 z-10 mx-1 h-4 rotate-180 cursor-pointer self-center rounded-full bg-white p-3 opacity-75"
            onClick={() => {
              if (index > 0) {
                setIndex((index) => index - 1);
              }
            }}
          />
        )}
        <img
          src={photoUrls[index]}
          alt=""
          className={clsx(
            "absolute h-[375px] w-[500px] rounded-3xl bg-slate-200 object-cover",
            photoUrls.length === 0 && "animate-pulse",
          )}
        />
        {photoUrls.length > 1 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 left-0 z-10 mx-1 h-4 cursor-pointer self-center rounded-full bg-white p-3 opacity-75"
            onClick={() => {
              if (index < photoUrls.length - 1) {
                setIndex((index) => index + 1);
              }
            }}
          />
        )}
      </div>
      <CarouselIndicator count={photoUrls.length} index={index} />
    </div>
  );
};

const CarouselIndicator = ({
  count,
  index,
}: {
  count: number;
  index: number;
}) => {
  const indicatorArray = Array(count).fill(0);
  indicatorArray[index] = 1;
  return (
    <>
      {count > 1 && (
        <div className="flex items-center gap-2">
          {indicatorArray.map((val, index) => {
            if (val) {
              return (
                <div
                  key={index}
                  className="h-3 w-3 rounded-full border-2 border-solid border-gray-400"
                />
              );
            } else {
              return <div className="h-3 w-3 rounded-full bg-white" />;
            }
          })}
        </div>
      )}
    </>
  );
};

export const CarouselMobile = (props: Carousel) => {
  const { photoUrls: photoUrls, ...rest } = props;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="relative flex h-[300px] w-[375px] items-center justify-between"
        {...rest}
      >
        {photoUrls.length > 1 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 right-0 z-10 mx-1 h-4 rotate-180 cursor-pointer self-center rounded-full bg-white p-3 opacity-75"
            onClick={() => {
              if (index > 0) {
                setIndex((index) => index - 1);
              }
            }}
          />
        )}
        <img
          src={photoUrls[index]}
          alt=""
          className="absolute inset-x-0 h-full w-full object-cover"
        />
        {photoUrls.length > 1 && (
          <img
            src={leftArrow}
            alt=""
            className="absolute inset-y-0 left-0 z-10 mx-1 h-4 cursor-pointer self-center rounded-full bg-white p-3 opacity-75"
            onClick={() => {
              if (index < photoUrls.length - 1) {
                setIndex((index) => index + 1);
              }
            }}
          />
        )}
      </div>
      <CarouselIndicator count={photoUrls.length} index={index} />
    </div>
  );
};
