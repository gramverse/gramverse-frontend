import { Outlet, useNavigate, useParams } from "react-router-dom";
import rahnema from "../../assets/svg/rahnema.svg";
import { Button } from "../../reusable-components/button";
import PlusIcon from "../../assets/svg/plus-round.svg";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import MobileBottomNavigation from "./mobile-bottom-navigation";
import { Panel } from "./web-side-panel";
import { ContainterMobile } from "../../reusable-components/container";
import { CreatePost } from "../post/post";
import { Modal } from "../../reusable-components/modal";
import MobileTopNavigation from "./mobile-top-navigation";
import { useGetProfile } from "../../api-hooks/get-my-profile";
import { urls } from "../../common/routes";
import { ContextType } from "./outlet-context";

export const ModalContext = createContext<{
  setModal: (newModal: ReactNode) => void;
}>({ setModal: () => {} });

export const Main = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [modal, setModal] = useState<ReactNode | null>(null);
  const { data } = useGetProfile();
  const post = null;

  const handleClick = (newValue: string) => {
    setTab(newValue);
  };

  const changeTab = useCallback(() => {
    switch (tab) {
      case "myPage":
        navigate(`/${data?.userName}`);
        break;
      case "explore":
        navigate(urls.main);
        break;
    }
  }, [data?.userName, navigate, tab]);

  useEffect(() => {
    changeTab();
  }, [changeTab, data?.userName, navigate, params.userName, tab]);

  return (
    <ModalContext.Provider
      value={{
        setModal: (newModal) => {
          setModal(newModal);
        },
      }}
    >
      <div className="flex h-full grow bg-primary">
        <Modal>{modal}</Modal>
        <div className="flex grow flex-row justify-stretch bg-primary px-5 pt-16">
          <img src={rahnema} className="absolute left-20" alt="" />
          <div className="flex h-full w-fit flex-col items-center gap-5 self-start">
            <Button
              classes="flex items-center justify-center"
              onClick={() => {
                setModal(<CreatePost post={null} />);
              }}
            >
              <img src={PlusIcon} alt="" />
              <span>ایجاد پست جدید</span>
            </Button>
            <Panel handleClick={handleClick} selectedTab={tab} />
          </div>
          <div className="flex grow items-center justify-center px-12">
            <Outlet context={{ setTab, post } satisfies ContextType} />
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const MainMobile = () => {
  const post = null;
  const [tab, setTab] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetProfile();
  const handleClick = (newValue: string) => {
    setTab(newValue);
  };
  const changeTab = useCallback(() => {
    switch (tab) {
      case "myPage":
        navigate(`/${data?.userName}`);
        break;
      case "explore":
        navigate(urls.main);
        break;
      case "createPost":
        navigate(urls.createPost);
    }
  }, [data?.userName, navigate, tab]);

  useEffect(() => {
    changeTab();
  }, [changeTab, data?.userName, navigate, params.userName, tab]);
  const [modal, setModal] = useState<ReactNode | null>(null);
  return (
    <ModalContext.Provider
      value={{
        setModal: (newModal) => {
          setModal(newModal);
        },
      }}
    >
      <Modal>{modal}</Modal>
      <ContainterMobile>
        <MobileTopNavigation handleItemClick={handleClick} />
        <div className="flex grow flex-col">
          <Outlet context={{ post, setTab } satisfies ContextType} />
        </div>
        {tab !== "createPost" && (
          <MobileBottomNavigation handleItemClick={handleClick} />
        )}
      </ContainterMobile>
    </ModalContext.Provider>
  );
};
