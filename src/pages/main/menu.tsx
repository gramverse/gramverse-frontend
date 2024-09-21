import { Tab } from "../../components/tab";
import friend from "@asset/svg/close-friend.svg";
import blocked from "@asset/svg/blocked.svg";
import { useNavigate } from "react-router-dom";
import { useGetAccounts } from "../../services/switch-account";
import { AccountInfo } from "./account-info";
export const Menu = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  const { accounts, isMultiple } = useGetAccounts();

  return (
    <div className="absolute bottom-20 right-10 z-10 h-fit w-fit rounded-t-2xl rounded-bl-2xl border-2 border-solid border-gray-300 bg-white ps-2">
      {!isMultiple && (
        <>
          <Tab
            text="دوستان نزدیک"
            icon={friend}
            onClick={() => {
              close();
              navigate("/close-friends");
            }}
          />
          <Tab
            text="لیست سیاه"
            icon={blocked}
            onClick={() => {
              close();
              navigate("/black-list");
            }}
          />
        </>
      )}
      {isMultiple && accounts && (
        <>
          <div className="mx-5 flex flex-col gap-8 border border-x-0 border-t-0 border-solid border-form-border py-8">
            {accounts.map((account) => {
              return (
                <AccountInfo
                  key={account.userName}
                  account={account}
                  close={close}
                />
              );
            })}
          </div>
          <Tab
            text="دوستان نزدیک"
            icon={friend}
            onClick={() => {
              close();
              navigate("/close-friends");
            }}
          />
          <Tab
            text="لیست سیاه"
            icon={blocked}
            onClick={() => {
              close();
              navigate("/black-list");
            }}
          />
        </>
      )}
    </div>
  );
};
