import { itemList } from "./menu-data";
import { Tab } from "../../components/tab";
import { useNavigate } from "react-router-dom";
import friend from "@asset/svg/close-friend.svg";
import blocked from "@asset/svg/blocked.svg";
import { useSignOut } from "../../services/signout";
import { useGetProfile } from "../../services/get-my-profile";
import { useGetAccounts } from "../../services/switch-account";
import { AccountInfo } from "./account-info";
import { useCallback, useEffect, useState } from "react";
import { useGetNotificationCount } from "../../services/notifications";
import { ModalMobile } from "../../components/modal";
import { AccountsLimitMobile } from "./accounts-limit";
import { ChooseAccountMobile } from "./choose-account";
import { useGetMessageCount } from "../../services/chat";
export const DrawerMenu = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetProfile();
  const { accounts, isMultiple } = useGetAccounts();
  const [modal, setModal] = useState<"account-limit" | "choose-account" | null>(
    null,
  );
  const { data: count } = useGetNotificationCount();
  const { data: messageCount } = useGetMessageCount();

  const [countView, setCountView] = useState(count && count.unreadCount > 0);
  const handleSuccess = useCallback(() => {
    isMultiple ? setModal("choose-account") : () => {};
  }, [isMultiple]);
  const { mutate: singOut } = useSignOut(handleSuccess);

  useEffect(() => {
    setCountView(count && count.unreadCount > 0);
  }, [count]);
  return (
    <div className="flex flex-col rounded-t-3xl border-2 border-solid border-gray-300 bg-white shadow-lg">
      <ModalMobile
        isOpen={modal === "account-limit"}
        className="mb-20"
        close={() => {
          setModal(null);
        }}
      >
        <AccountsLimitMobile
          close={() => {
            close();
            setModal(null);
          }}
        />
      </ModalMobile>
      <ModalMobile
        isOpen={modal === "choose-account"}
        close={() => {
          setModal(null);
        }}
      >
        <ChooseAccountMobile
          close={() => {
            setModal(null);
            close();
          }}
        />
      </ModalMobile>
      <>
        {isMultiple && accounts && (
          <div className="mx-5 flex flex-col gap-4 border border-x-0 border-t-0 border-solid border-form-border py-8">
            {accounts.map((account) => {
              return (
                <AccountInfo
                  key={account.userName}
                  account={account}
                  close={() => {
                    close();
                    setModal(null);
                  }}
                />
              );
            })}
          </div>
        )}
        <Tab
          key={itemList["myPage"].text}
          text={itemList["myPage"].text}
          icon={itemList["myPage"].icon}
          value={"myPage"}
          onClick={() => {
            close();
            isSuccess && navigate(`${data.userName}`);
          }}
        />
        <Tab
          key={itemList["saved"].text}
          text={itemList["saved"].text}
          icon={itemList["saved"].icon}
          value={"saved"}
          onClick={() => {
            close();
            isSuccess && navigate("/bookmark-page");
          }}
        />
        <div className="relative flex">
          <Tab
            key={itemList["messages"].text}
            text={itemList["messages"].text}
            icon={itemList["messages"].icon}
            value={"messages"}
            onClick={() => {
              navigate("/chat");
            }}
          />
          {messageCount && messageCount.unreadCount > 0 && (
            <div className="absolute left-5 top-4 my-auto flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
              {messageCount?.unreadCount}
            </div>
          )}
        </div>
        <div className="relative flex">
          <Tab
            key={itemList["notifs"].text}
            text={itemList["notifs"].text}
            icon={itemList["notifs"].icon}
            value={"notifs"}
            onClick={() => {
              navigate("/my-notifications");
            }}
          />
          {countView && (
            <div className="absolute left-5 top-4 my-auto flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white">
              {count?.unreadCount}
            </div>
          )}
        </div>
        <Tab
          key={itemList["mention"].text}
          text={itemList["mention"].text}
          icon={itemList["mention"].icon}
          value={"mention"}
          onClick={() => {
            close();
            isSuccess && navigate("/mention-page");
          }}
        />
        <Tab
          key={itemList["signOut"].text}
          text={itemList["signOut"].text}
          icon={itemList["signOut"].icon}
          value={"signOut"}
          onClick={() => {
            singOut();
          }}
        />
        <Tab
          key={itemList["addAccount"].text}
          text={itemList["addAccount"].text}
          icon={itemList["addAccount"].icon}
          value={"addAccount"}
          onClick={() => {
            if (!isSuccess) return;
            if (accounts?.length && accounts.length >= 3) {
              setModal("account-limit");
            } else {
              localStorage.setItem("addAccount", data.userName);
              navigate("/login");
            }
          }}
        />
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
    </div>
  );
};
