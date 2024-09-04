import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../api-hooks/get-my-profile";
import { follow } from "../../../common/types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../reusable-components/round-picture";
import profile from "../../../assets/svg/profile.svg";

export const Follow = (props: follow) => {
  const { userName, creationDate, seen, profileImage } = props;
  const { data } = useGetProfile();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex w-full items-center gap-5 rounded-2xl py-2",
        seen && "bg-primary",
        !seen && "bg-purple-200",
      )}
    >
      <RoundPicture
        size="medium"
        picture={profileImage && profileImage !== "" ? profileImage : profile}
        onClick={() => {
          navigate(`/${data?.userName}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p>{`${userName}توی این عکس تورو منشن کرده `}</p>
        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
    </div>
  );
};
