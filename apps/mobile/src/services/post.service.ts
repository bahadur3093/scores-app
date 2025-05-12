import { API_URL } from '../config/urls.config';
import { ICategory, IPost, IPostPayload } from '../model/Post.model';
import api from '../utils/axiosInstance.util';

export const getPosts = async (): Promise<IPost[]> => {
  const result = await api.get<IPost[]>(API_URL.post.get);
  return result.data;
};

export const getPostById = async (postId: string): Promise<IPost> => {
  const result = await api.get<IPost>(`${API_URL.post.getById}/${postId}`);
  return result.data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const result = await api.get<ICategory[]>(API_URL.post.category);
  return result.data;
};

export const createPost = async (
  payload: IPostPayload
): Promise<IPostPayload> => {
  const result = await api.post<IPostPayload>(API_URL.post.create, payload);
  return result.data;
};

export const updatePostContent = async (
  postId: string,
  content: string
): Promise<IPost> => {
  const result = await api.put<IPost>(`${API_URL.post.content(postId)}`, {
    content,
  });
  return result.data;
};
