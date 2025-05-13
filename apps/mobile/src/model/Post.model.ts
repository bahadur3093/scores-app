export interface IPost {
  postId: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  comments: IComment[];
  author: string;
  authorId: string;
  cover: string;
}
export interface IComment {
  commentId: string;
  postId: string;
  authorId: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentCommentId: string;
  likes: number;
  isLiked: boolean;
}

export interface IReply {
  replyId: string;
  commentId: string;
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IPostPayload {
  title: string;
  content: string;
  summary: string;
  category: string;
  cover: string;
}
