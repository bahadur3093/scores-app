export interface IPost {
  _id: string;
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  comments: IComment[];
  author: string;
  cover: string;
}
export interface IComment {
  _id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentCommentId: string;
}

export interface IReply {
  _id: string;
  commentId: string;
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
