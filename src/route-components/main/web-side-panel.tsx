import { itemList } from "./menu-data";
import { Tab } from "../../reusable-components/tab";
import { ProfileSummary } from "../../reusable-components/profile-summary";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import { useEffect, useState } from "react";
import { Modal } from "../../reusable-components/modal";
import { CreatePost } from "../post/create-post";
import { Menu } from "./menu";
import { useSignOut } from "../../api-hooks/signout";

export const Panel = ({ tab }: { tab: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isSuccess } = useGetProfile();
  const [createPost, setCreatePost] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: singOut } = useSignOut();

  // useEffect(() => {
  //   if (isFetched) {
  //     if (data?.userName === undefined) {
  //       navigate("/login");
  //     }
  //   }
  // }, [data, isFetched, navigate]);
  useEffect(() => {}, [location.pathname]);
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
            onClick={() => {}}
          />
          <Tab
            key={itemList["messages"].text}
            text={itemList["messages"].text}
            icon={itemList["messages"].icon}
            selectedValue={tab}
            value={"messages"}
            onClick={() => {}}
          />
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
          <Tab
            key={itemList["mention"].text}
            text={itemList["mention"].text}
            icon={itemList["mention"].icon}
            selectedValue={tab}
            value={"mention"}
            onClick={() => {
              isSuccess && navigate(`${data.userName}`);
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
              navigate(`/`);
            }}
          />
          <Tab
            key={itemList["search"].text}
            text={itemList["search"].text}
            icon={itemList["search"].icon}
            selectedValue={tab}
            value={"search"}
            onClick={() => {}}
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
