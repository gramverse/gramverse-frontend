import { itemList } from "./menu-data";
import { Tab } from "../../components/tab";
import { useNavigate } from "react-router-dom";
import friend from "../../assets/svg/close-friend.svg";
import blocked from "../../assets/svg/blocked.svg";
import { useSignOut } from "../../services/signout";
import { useGetProfile } from "../../services/get-my-profile";
import { useGetAccounts } from "../../services/switch-account";
import { AccountInfo } from "./account-info";
export const DrawerMenu = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  const { mutate: singOut } = useSignOut();
  const { data, isSuccess } = useGetProfile();
  const { accounts, isMultiple } = useGetAccounts();

  return (
    <div className="flex flex-col rounded-t-3xl border-2 border-solid border-gray-300 bg-white shadow-lg">
      {!isMultiple && (
        <>
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
          <Tab
            key={itemList["messages"].text}
            text={itemList["messages"].text}
            icon={itemList["messages"].icon}
            value={"messages"}
            onClick={() => {}}
          />
          <Tab
            key={itemList["notifs"].text}
            text={itemList["notifs"].text}
            icon={itemList["notifs"].icon}
            value={"notifs"}
            onClick={() => {
              close();
              navigate("/my-notifications");
            }}
          />
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
              close();
              singOut();
            }}
          />
          <Tab
            key={itemList["addAccount"].text}
            text={itemList["addAccount"].text}
            icon={itemList["addAccount"].icon}
            value={"addAccount"}
            onClick={() => {
              isSuccess && navigate("switch-account/login");
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
      )}
      {isMultiple && accounts && (
        <>
          <div className="mx-5 flex flex-col gap-4 border border-x-0 border-t-0 border-solid border-form-border py-8">
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
          <Tab
            key={itemList["messages"].text}
            text={itemList["messages"].text}
            icon={itemList["messages"].icon}
            value={"messages"}
            onClick={() => {}}
          />
          <Tab
            key={itemList["notifs"].text}
            text={itemList["notifs"].text}
            icon={itemList["notifs"].icon}
            value={"notifs"}
            onClick={() => {
              close();
              navigate("/my-notifications");
            }}
          />
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
              close();
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
              localStorage.setItem('addAccount', data.userName)
              isSuccess && navigate("/login");
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
      )}
    </div>
  );
};
