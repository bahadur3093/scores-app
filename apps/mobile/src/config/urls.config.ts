export const BASE_URL = process.env.BASE_URL || 'http://localhost:3333/api/';

export const API_URL = {
  users: {
    get: () => `${BASE_URL}users`,
    post: () => `${BASE_URL}users`,
  },
};
