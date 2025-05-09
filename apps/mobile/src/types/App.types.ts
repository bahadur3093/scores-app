export type RootStackParamList = {
  home: undefined;
  blog: {
    screen?: 'blogHome' | 'postDetails' | 'createPost';
    params?: {
      postId?: string;
    };
  };
  profile: undefined;
  createUser: undefined;
  register: undefined;
  login: undefined;
};