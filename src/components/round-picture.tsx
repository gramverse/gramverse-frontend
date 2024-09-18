import profile from "./../assets/svg/profile.svg";
const sizes = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-20 h-20",
  xlarge: "w-40 h-40",
};

interface ImageProps {
  size?: "small" | "medium" | "large" | "xlarge";
  picture: string;
  classes?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

export const RoundPicture = (props: ImageProps) => {
  const { size = "medium", picture, classes = "", onClick } = props;
  const customClasses = `border-none rounded-full object-cover bg-gray-300 object-cover ${classes} ${sizes[size]}`;
  return (
    <img
      onClick={onClick}
      src={picture && picture !== "" ? picture : profile}
      className={customClasses}
    ></img>
  );
};
