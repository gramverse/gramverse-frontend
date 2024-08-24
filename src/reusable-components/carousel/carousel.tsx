import { HTMLAttributes, useState } from "react";
//import { CarouselIndicator } from "./carousel-indicator";
import { Post } from "../../common/types/post";
import leftArrow from "../../assets/svg/arrow.svg";
import clsx from "clsx";

interface Carousel
  extends HTMLAttributes<HTMLDivElement>,
    Pick<Post, "photoUrls"> {
  boxWidth?: string;
}

export const Carousel = (props: Carousel) => {
  const { photoUrls: photoUrls, boxWidth, ...rest } = props;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex items-center justify-between" {...rest}>
      {photoUrls.length > 0 && (
        <img
          src={leftArrow}
          alt=""
          className="z-20 h-9 rotate-180 cursor-pointer rounded-lg bg-white p-2 opacity-45"
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
          "h-[375px] w-[600px] rounded-3xl object-cover",
          boxWidth,
        )}
      />
      {photoUrls.length > 0 && (
        <img
          src={leftArrow}
          alt=""
          className="z-20 mx-2 h-9 cursor-pointer rounded-lg bg-white p-2 opacity-45"
          onClick={() => {
            if (index < photoUrls.length - 1) {
              setIndex((index) => index + 1);
            }
          }}
        />
      )}
    </div>
  );
};
// export const CarouselMobile = (props: Carousel) => {
//     const { photoUrls: photoUrls, ...rest } = props;
//     const [index, setIndex] = useState(0);
//     return (
//       <div className="flex flex-col items-center">
//         <div className="relative h-56 w-full" {...rest}>
//           {photoUrls.length > 0 && (
//             <img
//               src={leftArrow}
//               alt=""
//               className="absolute inset-y-0 right-0 z-10 mx-1 h-3 rotate-180 cursor-pointer self-center rounded-full bg-white p-1 opacity-75"
//               onClick={() => {
//                 if (index > 0) {
//                   setIndex((index) => index - 1);
//                 }
//               }}
//             />
//           )}
//           <img
//             src={photoUrls[index]}
//             alt=""
//             className="absolute -inset-x-6 top-0 h-56 object-cover object-center"
//           />
//           {photoUrls.length > 0 && (
//             <img
//               src={leftArrow}
//               alt=""
//               className="absolute inset-y-0 left-0 z-10 mx-1 h-3 cursor-pointer self-center rounded-full bg-white p-1 opacity-75"
//               onClick={() => {
//                 if (index < photoUrls.length - 1) {
//                   setIndex((index) => index + 1);
//                 }
//               }}
//             />
//           )}
//         </div>
//         <CarouselIndicator count={photoUrls.length} index={index} />
//       </div>
//     );
//   };
