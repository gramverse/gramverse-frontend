import {
  skipToken,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { queryClient } from "../common/query-client";
import { getPostResponseSchema } from "../types/post";
import {
  RequestStatus,
  UserProfile,
  userProfileSchema,
} from "../types/user-profile";
import { handleRequestError } from "../common/utilities/http-error-handler";

export const calcUserStates = (userProfile: UserProfile) => {
  if (!userProfile) return;
  const isBlockedUs = userProfile.hasBlockedUs;
  const isUserDataVisible =
    !isBlockedUs &&
    (!userProfile?.isPrivate ||
      userProfile.followRequestState == RequestStatus.accepted);
  const isFollowedUser =
    !isBlockedUs && userProfile.followRequestState === RequestStatus.accepted;
  const isPublicPage = !isBlockedUs && !userProfile.isPrivate;
  const isEmptyGallery =
    (isPublicPage || isFollowedUser) && userProfile.postCount == 0;
  const isNoneEmptyGallery =
    (isPublicPage || isFollowedUser) && userProfile.postCount > 0;
  const isPrivatePage =
    !isBlockedUs &&
    userProfile.isPrivate &&
    userProfile.followRequestState !== RequestStatus.accepted;
  const followBtnText = userProfile.isBlocked
    ? "آنبلاک کردن"
    : isBlockedUs
      ? "+ دنبال کردن"
      : userProfile.followRequestState == RequestStatus.pending
        ? "لغو درخواست"
        : userProfile.followRequestState == RequestStatus.accepted
          ? "دنبال نکردن"
          : "+ دنبال کردن";
  const followBtnColor = userProfile.hasBlockedUs
    ? "disabled"
    : userProfile.isBlocked ||
        userProfile.followRequestState == RequestStatus.pending ||
        userProfile.followRequestState == RequestStatus.accepted
      ? "outline"
      : "secondary";
  return {
    isBlockedUs,
    isUserDataVisible,
    isFollowedUser,
    isEmptyGallery,
    isNoneEmptyGallery,
    isPrivatePage,
    followBtnText,
    followBtnColor,
  };
};

export const useGetUserProfile = (userName: string) => {
  const httpClient = useHttpClient();
  const { data, ...rest } = useQuery({
    queryKey: ["getUserProfile", userName],
    queryFn:
      userName !== ""
        ? () =>
            httpClient
              .get(`users/profile/${userName}`)
              .json()
              .then(userProfileSchema.parse)
        : skipToken,
  });

  const userStates = calcUserStates(data as UserProfile);
  return { ...rest, userProfile: data, ...userStates };
};

const calcIsFollowing = (current: RequestStatus) => {
  return (
    current == RequestStatus.none ||
    current == RequestStatus.declined ||
    !(current == RequestStatus.pending || current == RequestStatus.accepted)
  );
};

export const useFollowUser = (
  userName: string,
  myUserName: string,
  followRequestState: "accepted" | "pending" | "none" | "declined",
) => {
  const httpClient = useHttpClient();
  const isFollow = calcIsFollowing(followRequestState);
  const json = { followingUserName: userName, isFollow };
  return useMutation({
    mutationFn() {
      return httpClient.post("users/follow", { json }).json();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", userName],
      });

      queryClient.invalidateQueries({
        queryKey: ["Followingers", myUserName, true],
      });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};

export const useGetUserPosts = (
  userName: string | undefined,
  allowedViewPost: boolean | undefined,
  limit: number,
) => {
  const httpClient = useHttpClient();
  const initialPageParam = 1;
  return useInfiniteQuery({
    queryKey: ["getUserPosts", userName],
    queryFn:
      userName != undefined && allowedViewPost
        ? async ({ pageParam }) => {
            return await httpClient
              .get(`posts/username/${userName}`, {
                searchParams: { page: pageParam, limit },
              })
              .json()
              .then(getPostResponseSchema.parse);
          }
        : skipToken,
    initialPageParam: initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalCount / limit;
      return pages.length > totalPage
        ? undefined
        : initialPageParam + pages.length;
    },
  });
};
