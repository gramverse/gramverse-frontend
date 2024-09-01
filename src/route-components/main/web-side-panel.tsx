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

export const Panel = ({ tab }: { tab: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isSuccess, isFetched } = useGetProfile();
  const [createPost, setCreatePost] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isFetched) {
      if (data?.userName === undefined) {
        navigate("/login");
      }
    }
  }, [data, isFetched, navigate]);
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
          {Object.values(itemList)
            .slice(0, 5)
            .map(({ text, icon }, index) => {
              return (
                <Tab
                  key={text + index}
                  text={text}
                  icon={icon}
                  value={Object.keys(itemList)[index]}
                  selectedValue={tab}
                  onClick={() => {
                    isSuccess && navigate(`${data.userName}`);
                  }}
                />
              );
            })}
          <div className="-ms-5 h-0.5 w-80 bg-gray-300" />

          {Object.values(itemList)
            .slice(5, 7)
            .map(({ text, icon }, index) => {
              return (
                <Tab
                  key={text + index}
                  text={text}
                  icon={icon}
                  selectedValue={tab}
                  value={Object.keys(itemList)[index + 5]}
                  onClick={() => {
                    navigate("/");
                  }}
                ></Tab>
              );
            })}
          <div className="absolute bottom-4">
            {isMenuOpen && (
              <Menu
                close={() => {
                  setIsMenuOpen(false);
                }}
              />
            )}
            <Tab
              key={itemList["more"].text + 7}
              text={itemList["more"].text}
              icon={itemList["more"].icon}
              selectedValue={tab}
              value={Object.keys(itemList)[7]}
              className="absolute bottom-4"
              onClick={() => {
                setIsMenuOpen((isMenuOpen) => !isMenuOpen);
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
};
