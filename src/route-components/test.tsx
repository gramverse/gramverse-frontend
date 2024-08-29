import { useInfiniteQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { useInView } from "react-intersection-observer";
import { forwardRef, useEffect } from "react";
import clsx from "clsx";

export interface Todo {
  id: number;
  title: string;
}

export const Test = () => {
  const [nearEndRef, isNearEnd] = useInView();

  const httpClient = useHttpClient();
  // const defaultPage = 1;

  const initialPageParam = 1;
  const totalCount = 200;
  const limit = 10;
  const totalPage = Math.ceil(totalCount / limit);
  //
  const {
    data,
    //   error,
    //   fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    // status,
  } = useInfiniteQuery(
    // <unknown,HTTPError,Post[]>
    {
      queryKey: ["projects"],
      queryFn: async ({ pageParam }) => {
        console.log("pageparam", pageParam);
        const result = await httpClient
          .get("todos", {
            prefixUrl: "https://jsonplaceholder.typicode.com",
            searchParams: { _page: pageParam },
          })
          .json();
        // const result = await fetch(
        //   `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`,
        // );
        return result as Todo[];
        // return result.json();
      },
      initialPageParam: initialPageParam,
      getNextPageParam: (_, pages) =>
        pages.length > totalPage ? undefined : initialPageParam + pages.length,
    },
  );

  useEffect(() => {
    if (!hasNextPage || !isNearEnd || isFetching) return;

    fetchNextPage();
    //console.log("hame data ro mikham", data?.pages.flat());
  }, [isNearEnd, isFetchingNextPage, hasNextPage]);

  const todos = data?.pages.flat() ?? [];
  //   const nearEndOfListObserverIndex =
  //     todos.length >= 10 ? todos.length - 10 : todos.length - 1;

  return (
    <div className="max-h-[content] grow overflow-y-scroll">
      {todos.map((todo) => (
        <TodoCard key={todo.id} title={todo.title} />
      ))}
      {/* <button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button> */}
      {/* <div className={clsx("h-full w-full", hasNextPage ? "" : "hidden")}></div> */}
      <div
        ref={nearEndRef}
        className={clsx(
          "flex w-full items-center justify-center text-2xl",
          hasNextPage ? "h-[calc(11rem/3)]" : "",
        )}
      >
        {hasNextPage && isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

type TodoCardProps = Omit<Todo, "id">;

export const TodoCard = forwardRef<HTMLParagraphElement, TodoCardProps>(
  function TodoCard({ title }, ref) {
    return (
      <p className="todo-card" ref={ref}>
        {title}
      </p>
    );
  },
);
