export type mention = {
  type: "mention";
  performerUserName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};

export type like = {
  type: "like";
  performerUserName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
  postCreator: string;
};

export type follow = {
  type: "follow";
  performerUserName: string;
  followingUserName: string;
  seen: boolean;
  creationDate: string;
};

export type followRequest = {
  type: "followRequest";
  performerUserName: string;
  followingUserName: string;
  seen: boolean;
  creationDate: string;
};

export type comment = {
  type: "comment";
  comment: string;
  performerUserName: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
  postCreator: string;
};

export type MyNotifications = {
  notifications: Array<mention | like | follow | comment | followRequest>;
  totalCount: number;
};

export type userComment = {
  type: "comment";
  comment: string;
  performerUserName: string;
  postCreator: string;
  postId: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};
export type userLike = {
  type: "like";
  performerUserName: string;
  postId: string;
  postCreator: string;
  postImage: string;
  seen: boolean;
  creationDate: string;
};
export type userFollow = {
  type: "follow";
  performerUserName: string;
  followingUserName: string;
  seen: boolean;
  creationDate: string;
};

export type FollowingNotifications = {
  notifications: Array<userComment | userLike | userFollow>;
  totalCount: number;
  followingUserName: string;
};
