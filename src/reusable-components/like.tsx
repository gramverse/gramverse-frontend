import clsx from "clsx";
import { MouseEventHandler } from "react";

type LikeProps = {
  isLiked: boolean| undefined;
  defaultValue: boolean;
  onClick: MouseEventHandler<SVGSVGElement>;
};

export const Like = ({ isLiked, defaultValue, onClick }: LikeProps) => {
  const likeValue = isLiked == undefined ? defaultValue : isLiked;
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 -2 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        className={clsx(
          "stroke-submit-btn stroke-2",
          likeValue ? "fill-submit-btn" : "fill-none",
        )}
        d="M6.43809 3.00111ZM18.5619 0.000165358C16.85 0.00612748 15.2073 0.676822 13.9805 1.87076L12.5 3.31121L11.0195 1.87076C9.79267 0.676822 8.15 0.00612748 6.43809 0.000165358C5.10767 0.000165358 3.78725 0.420298 2.70691 1.29057C2.05771 1.80306 1.52559 2.44844 1.14623 3.18342C0.766877 3.91841 
          0.549054 4.72601 0.507372 5.55207C0.46569 6.37813 0.601113 7.20355 0.904557 7.97298C1.208 8.74242 1.67246 9.43808 2.26677 10.0133C2.26677 10.0133 8.55876 17.0255 10.7494 19.2762C11.2196 19.7664 11.8598 20.0065 12.5 20.0065C13.1402 20.0065 13.7804 19.7664 14.2506 19.2762C16.4412 17.0255 22.7332 10.0133 22.7332 10.0133C23.3275 9.43808 23.792 8.74242 24.0954 7.97298C24.3989 7.20355 24.5343 6.37813 24.4926 5.55207C24.4509 4.72601 24.2331 3.91841 23.8538 3.18342C23.4744 2.44844 22.9423 1.80306 22.2931 1.29057C21.234 0.445588 19.9168 -0.00996438 18.5619 0.000165358Z"
      />
    </svg>
  );
};
