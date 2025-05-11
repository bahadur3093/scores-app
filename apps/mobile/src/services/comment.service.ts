import { API_URL } from '../config/urls.config';
import { ICommentPayload } from '../model/Comment.model';
import { IComment, IReply } from '../model/Post.model';
import { IReplyPayload } from '../model/Reply.model';
import api from '../utils/axiosInstance.util';

export const getCommentsByPostId = async (
  postId: string
): Promise<IComment[]> => {
  const url = `${API_URL.comment.getAll(postId)}`;
  try {
    const result = await api.get<IComment[]>(url);
    return result.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getRepliesByCommentId = async (
  commentId: string
): Promise<IReply[]> => {
  const url = `${API_URL.reply.getAllByCommentId(commentId)}`;
  try {
    const result = await api.get<IReply[]>(url);
    return result.data;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const createComment = async (
  postId: string,
  payload: ICommentPayload
): Promise<IComment> => {
  const url = `${API_URL.comment.create(postId)}`;
  const result = await api.post<IComment>(url, payload);
  return result.data;
};

export const createReply = async (
  commentId: string,
  payload: IReplyPayload
): Promise<IReply> => {
  const url = `${API_URL.reply.create(commentId)}`;
  const result = await api.post<IReply>(url, payload);
  return result.data;
};
