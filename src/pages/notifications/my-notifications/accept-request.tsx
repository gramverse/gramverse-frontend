import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Follow } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";

export const AcceptRequest = (props: Follow) => {
  const {
    performerUserName,
    followingUserName,
    creationDate,
    seen,
    profileImage,
  } = props;
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
        size="large"
        picture={profileImage}
        onClick={() => {
          navigate(`/${performerUserName}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="m-0 p-0">{`${followingUserName} درخواست دوستیت رو قبول کرد `}</p>

        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
    </div>
  );
};
