export type mention = {
  type: "mention";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};

export type like = {
  type: "like";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};

export type follow = {
  type: "follow";
  userName: string;
  request: "accepted" | "pending";
  profileImage: string;
  followRequestState: "accepted" | "pending" | "none" | "declined";
  seen: boolean;
  creationDate: string;
};

export type comment = {
  type: "comment";
  comment: string;
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};

export type MyNotifications = {
  notifications: Array<mention | like | follow | comment>;
  totalCount: number;
};

export type userComment = {
  type: "comment";
  comment: string;
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};
export type userLike = {
  type: "like";
  userName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};
export type userFollow = {
  type: "follow";
  followerUserName: string;
  followingUserName: string;
  followingProfileImage: string;
  seen: boolean;
  profileImage: string;
  creationDate: string;
};

export type FollowingNotifications = {
  notifications: Array<userComment | userLike | userFollow>;
  totalCount: number;
};
