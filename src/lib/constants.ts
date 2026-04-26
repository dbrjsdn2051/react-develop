export const QUERY_KES = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId]
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId],
    byId: (postId: string) => ["post", "byId", postId]
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId]
  }
};

export const BUCKET_NAME = "uploads";