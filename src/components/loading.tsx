import { forwardRef } from "react";
type LoadingProps = {
  isLoading: boolean;
  className?: string;
  size?: "small" | "large";
};
export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ isLoading, className, size = "small" }, ref) => {
    return (
      <>
        {size === "small" && (
          <div ref={ref} className={className}>
            {isLoading && (
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#f6881f"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </div>
        )}
        {size === "large" && (
          <div ref={ref} className={className}>
            {isLoading && (
              <svg
                className="h-10 w-10 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#e5e7eb"
                  strokeWidth="7"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#f6881f"
                  d="M8 24a16 16 0 0116-16V0C10.746 0 0 10.746 0 24h8zm4 10.582A15.924 15.924 0 018 24H0c0 6.084 2.27 11.648 6 15.876l6-5.294z"
                ></path>
              </svg>
            )}
          </div>
        )}
      </>
    );
  },
);
