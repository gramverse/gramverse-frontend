import dot from "../../assets/svg/dot.svg";

export const CarouselIndicator = ({
  count,
  index,
}: {
  count: number;
  index: number;
}) => {
  const indicatorArray = Array(count).fill(0);
  indicatorArray[index] = 1;
  return (
    <div className="absolute bottom-4 flex items-center gap-2">
      {indicatorArray.map((val, index) => {
        if (val) {
          return (
            <img
              key={index}
              src={dot}
              className="h-3 rounded-full border-2 border-solid border-gray-400"
            />
          );
        } else {
          return <img src={dot} className="h-3" />;
        }
      })}
    </div>
  );
};
