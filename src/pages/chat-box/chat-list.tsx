import { useContext, useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { useInView } from "react-intersection-observer";
import { useGetChatList } from "../../services/chat";
import { Loading } from "../../components/loading";
import { ChatSummary } from "./chat-summary";
import { useNavigate } from "react-router-dom";
import { ChatBox } from "./chat-box";
import { UserNameContext } from "../../router/Router";

export const ChatList = () => {
  const [chatId, setSelectedChatId] = useState("");
  const [modal, setModal] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetChatList({ limit: 1 });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const myUserName = useContext(UserNameContext);
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    data,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  return (
    <div className="flex w-full grow flex-col gap-4 overflow-y-scroll">
      <p className="text-xl font-bold">پیام ها</p>
      <Modal
        isOpen={modal}
        close={() => {
          setModal(false);
        }}
      >
        <ChatBox
          myUserName={myUserName}
          chatId={chatId}
          close={() => setModal(false)}
        />
      </Modal>
      {data?.pages
        .flatMap((page) => page.chats)
        .map((chat) => (
          <ChatSummary
            key={chat._id}
            clickHandler={() => {
              setSelectedChatId(chat._id);
              setModal(true);
            }}
            {...chat}
          />
        ))}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="my-3 self-center"
        ref={ref}
      />
    </div>
  );
};

// export const ChatList = () => {
//   const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
//     useGetChatList({ limit: 1 });
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [
//     data,
//     fetchNextPage,
//     hasNextPage,
//     inView,
//     isFetching,
//     isFetchingNextPage,
//   ]);
//   return (
//     <div className="flex w-full grow flex-col gap-4 overflow-y-scroll">
//       <p className="text-xl font-bold">پیام ها</p>
//       {data?.pages
//         .flatMap((page) => page.chats)
//         .map((chat) => (
//           <ChatSummary
//             clickHandler={() => {
//               navigate(`/chat/${chat.userName}`);
//             }}
//             {...chat}
//           />
//         ))}
//       <Loading
//         isLoading={isFetching || isFetchingNextPage}
//         className="my-3 self-center"
//         ref={ref}
//       />
//     </div>
//   );
// };

export const ChatListMobile = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetChatList({ limit: 1 });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    data,
    fetchNextPage,
    hasNextPage,
    inView,
    isFetching,
    isFetchingNextPage,
  ]);
  const navigate = useNavigate();
  return (
    <div className="flex w-full grow flex-col gap-4 overflow-y-scroll">
      <p className="text-xl font-bold">پیام ها</p>
      {data?.pages
        .flatMap((page) => page.chats)
        .map((chat) => (
          <ChatSummary
            key={chat._id}
            clickHandler={() => {
              //navigate to chat
              navigate(`/chat/${chat.userName}`);
            }}
            {...chat}
          />
        ))}
      <Loading
        isLoading={isFetching || isFetchingNextPage}
        className="my-3 self-center"
        ref={ref}
      />
    </div>
  );
};
