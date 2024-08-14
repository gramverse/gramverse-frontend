const sizes = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-20,h-20",
};

interface ImageProps {
  size?: "small" | "medium" | "large";
  picture: string;
  classes?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

export const RoundPicture = (props: ImageProps) => {
  const { size = "medium", picture, classes = "", onClick } = props;
  const customClasses = `border-none rounded-full ${classes} ${sizes[size]}`;
  return <img onClick={onClick} src={picture} className={customClasses}></img>;
};
