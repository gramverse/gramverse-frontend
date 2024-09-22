export const MarkSeenMessage = ({ hasSeen, className }: { hasSeen: boolean, className:string; }) => {
  const sendStateColor: string = hasSeen ? "#81E299" : "#D8D8D8";
  return (
    <svg
      width="18"
      height="9"
      viewBox="0 0 18 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.7931 0.608751L4.63338 8.48726L1.142 5.14794"
        stroke={sendStateColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7397 0.607967L9.57958 8.48689L6.98346 6.028"
        stroke={sendStateColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
