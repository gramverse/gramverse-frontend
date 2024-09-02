type mention = {
  type: "mention";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
};

type like = {
  type: "like";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
};

type follow = {
  type: "follow";
  userName: string;
  request: "accepted" | "pending";
  followRequestState:
    | "accepted"
    | "pending"
    | "none"
    | "declined"
    | "unfollowed";
  seen: boolean;
};

type comment = {
  type: "comment";
  comment: string;
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
};

export type MyNotifications = {
  notifications: Array<mention | like | follow | comment>;
  totalCount: number;
};

type userComment = {
  type: "comment";
  comment: string;
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
};
type userLike = {
  type: "like";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
};
type userFollow = {
  type: "follow";
  followerUserName: string;
  followingUserName: string;
  followingProfileImage: string;
  seen: boolean;
};

export type FollowingNotifications = {
  notifications: Array<userComment | userLike | userFollow>;
  totalCount: number;
};
