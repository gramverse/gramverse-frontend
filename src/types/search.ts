export type Account = {
  profileImage: string;
  followerCount: number;
  userName: string;
  followState: "accepted" | "pending" | "none" | "declined";
  firstName?: string;
  lastName?: string;
  fullName: string;
  accountId?: string;
};

export type SearchAccounts = {
  users: Array<Account>;
  totalCount: number;
};
export type Post = {
  postId: string;
  postImage: string;
  userName: string;
};
export type SearchPosts = {
  posts: Array<Post>;
  totalCount: number;
};
