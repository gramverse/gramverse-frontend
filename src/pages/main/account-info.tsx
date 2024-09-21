import { AccountDetail } from "../../types/account-info";
import { RoundPicture } from "../../components/round-picture";
import profile from "@asset/svg/profile.svg";
import { useSwitchAccount } from "../../services/switch-account";
import { useEffect } from "react";

export const AccountInfo = ({
  account,
  close,
}: {
  account: AccountDetail;
  close: () => void;
}) => {
  const { switchAccount, isSuccess } = useSwitchAccount(account.userName);
  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [close, isSuccess]);
  return (
    <div
      className="flex cursor-pointer items-center gap-5"
      onClick={() => {
        switchAccount();
        close();
      }}
    >
      <RoundPicture
        picture={
          account.profileImage && account.profileImage !== ""
            ? account.profileImage
            : profile
        }
      />
      <span>{account.userName || ""}</span>
    </div>
  );
};
