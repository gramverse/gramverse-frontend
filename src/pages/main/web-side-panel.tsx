import { itemList } from "./menu-data";
import { Tab } from "../../components/tab";
import { ProfileSummary } from "../../components/profile-summary";
import { useGetProfile } from "../../services/get-my-profile";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { CreatePost } from "../post/create-post";
import { Menu } from "./menu";
import { useSignOut } from "../../services/signout";
import { useGetNotificationCount } from "../../services/notifications";

export const Panel = ({ tab }: { tab: string }) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetProfile();
  const [createPost, setCreatePost] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: singOut } = useSignOut();
  const { data: count } = useGetNotificationCount();
  const [countView, setCountView] = useState(count && count.unreadCount > 0);
  useEffect(() => {
    setCountView(count && count.unreadCount > 0);
  }, [count]);
  return (
    <>
      <Modal
        isOpen={createPost}
        close={() => {
          setCreatePost(false);
        }}
      >
        <CreatePost
          close={() => {
            setCreatePost(false);
          }}
        />
      </Modal>
      <Button
        classes="flex items-center justify-center"
        onClick={() => {
          setCreatePost(true);
        }}
      >
        <img src={PlusIcon} alt="" />
        <span>ایجاد پست جدید</span>
      </Button>
      <div className="flex w-80 flex-grow flex-col rounded-t-3xl border-2 border-solid border-gray-300 bg-white pt-10">
        <ProfileSummary className="ms-10" />
        <section className="relative flex h-full w-full flex-col items-start gap-5 p-5 pb-20">
          <Tab
            key={itemList["myPage"].text}
            text={itemList["myPage"].text}
            icon={itemList["myPage"].icon}
            selectedValue={tab}
            value={"myPage"}
            onClick={() => {
              isSuccess && navigate(`${data.userName}`);
            }}
          />
          <Tab
            key={itemList["saved"].text}
            text={itemList["saved"].text}
            icon={itemList["saved"].icon}
            selectedValue={tab}
            value={"saved"}
            onClick={() => {
              isSuccess && navigate("/bookmark-page");
            }}
          />
          <Tab
            key={itemList["messages"].text}
            text={itemList["messages"].text}
            icon={itemList["messages"].icon}
            selectedValue={tab}
            value={"messages"}
            onClick={() => {}}
          />
          <div className="relative flex">
            <Tab
              key={itemList["notifs"].text}
              text={itemList["notifs"].text}
              icon={itemList["notifs"].icon}
              selectedValue={tab}
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
            selectedValue={tab}
            value={"mention"}
            onClick={() => {
              isSuccess && navigate("/mention-page");
            }}
          />
          <div className="-ms-5 h-0.5 w-80 bg-gray-300" />

          <Tab
            key={itemList["explore"].text}
            text={itemList["explore"].text}
            icon={itemList["explore"].icon}
            selectedValue={tab}
            value={"explore"}
            onClick={() => {
              isSuccess && navigate(`/`);
            }}
          />
          <Tab
            key={itemList["search"].text}
            text={itemList["search"].text}
            icon={itemList["search"].icon}
            selectedValue={tab}
            value={"search"}
            onClick={() => {
              navigate("/search");
            }}
          />

          <div className="absolute bottom-4">
            <Tab
              key={itemList["signOut"].text}
              text={itemList["signOut"].text}
              icon={itemList["signOut"].icon}
              selectedValue={tab}
              value={"signOut"}
              onClick={() => {
                singOut();
              }}
            />
            <Tab
              key={itemList["addAccount"].text}
              text={itemList["addAccount"].text}
              icon={itemList["addAccount"].icon}
              selectedValue={tab}
              value={"addAccount"}
              onClick={() => {
                if (!isSuccess) return;
                localStorage.setItem('addAccount', data.userName)
                navigate('/login');
              }}
            />
            <>
              {isMenuOpen && (
                <Menu
                  close={() => {
                    setIsMenuOpen(false);
                  }}
                />
              )}
              <Tab
                key={itemList["more"].text}
                text={itemList["more"].text}
                icon={itemList["more"].icon}
                selectedValue={tab}
                value={"more"}
                onClick={() => {
                  setIsMenuOpen((isMenuOpen) => !isMenuOpen);
                }}
              />
            </>
          </div>
        </section>
      </div>
    </>
  );
};
