import { AccountDetail } from "../../types/account-info";
import { RoundPicture } from "../../components/round-picture";
import profile from "../../assets/svg/profile.svg";
import { useSwitchAccount } from "../../services/switch-account";

export const AccountInfo = ({ account, close }: { account: AccountDetail; close: () => void }) => {
  const { switchAccount } = useSwitchAccount(account.userName);
  return (
    <div
      className="flex items-center gap-5"
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
