import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../common/http-client";
import { HTTPError } from "ky";
import { queryClient } from "../common/query-client";
import { getPostResponseSchema } from "../common/types/post";
import {
  RequestStatus,
  UserProfile,
  userProfileSchema,
} from "../common/types/user-profile";

const calcUserStates = (userProfile: UserProfile) => {
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
  const followBtnText = isBlockedUs
    ? "+ دنبال کردن"
    : userProfile.followRequestState == RequestStatus.pending
      ? "لغو درخواست"
      : userProfile.followRequestState == RequestStatus.accepted
        ? "دنبال نکردن"
        : "+ دنبال کردن";
  const followBtnColor = (userProfile.hasBlockedUs||userProfile.isBlocked)
    ? "disabled"
    : userProfile.followRequestState == RequestStatus.pending ||
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
  const { data, ...rest } = useQuery<UserProfile, HTTPError>({
    queryKey: ["getUserProfile", userName],
    enabled: !!userName,
    queryFn: () =>
      httpClient
        .get(`users/profile/${userName}`)
        .json()
        .then(userProfileSchema.parse),
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

export const useFollowUser = (userName: string) => {
  const { userProfile } = useGetUserProfile(userName);
  const httpClient = useHttpClient();

  return useMutation({
    async mutationFn() {
      if (!userProfile) return;
      const isFollow = calcIsFollowing(userProfile.followRequestState);
      const json = { followingUserName: userName, isFollow };
      return httpClient.post("users/follow", { json }).json();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
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
    queryFn: async ({ pageParam }) => {
      return await httpClient
        .get(`posts/username/${userName}`, {
          searchParams: { page: pageParam, limit },
        })
        .json()
        .then(getPostResponseSchema.parse);
    },
    initialPageParam: initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalCount / limit;
      return pages.length > totalPage
        ? undefined
        : initialPageParam + pages.length;
    },
    enabled: userName != undefined && allowedViewPost,
  });
};
