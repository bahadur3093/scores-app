import { API_URL } from '../config/urls.config';
import { IComment, IReply } from '../model/Post.model';
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
