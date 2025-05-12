import { create } from "lodash";

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3333/api';

export const API_URL = {
  users: {
    getUsers: `${BASE_URL}/user`,
    createUser: `${BASE_URL}/users`,
  },
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: () => `${BASE_URL}/auth/register`,
    logout: `${BASE_URL}/auth/logout`,
    user: `${BASE_URL}/auth/user`,
    profile: () => `${BASE_URL}/auth/user`,
    validateToken: () => `${BASE_URL}/auth/validate-token`,
  },
  post: {
    get: `${BASE_URL}/post`,
    getById: `${BASE_URL}/post`,
    create: `${BASE_URL}/post`,
    category: `${BASE_URL}/category`,
    content: (postId: string) => `${BASE_URL}/post/${postId}/content`,
  },
  comment: {
    getAll: (postId: string) => `${BASE_URL}/post/${postId}/comments`,
    create: (postId: string) => `${BASE_URL}/post/${postId}/comments`,
  },
  reply: {
    getAllByCommentId: (commentId: string) =>
      `${BASE_URL}/comments/${commentId}/reply`,
    create: (commentId: string) =>
      `${BASE_URL}/comments/${commentId}/reply`,
  },
};
