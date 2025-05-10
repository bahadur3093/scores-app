import { createStackNavigator } from '@react-navigation/stack';

import TabHeader from '../components/TabHeader';
import BlogScreen from '../screens/Blog';
import PostDetails from '../screens/PostDetails';
import CreatePost from '../screens/CreatePost';

export type BlogStackParamList = {
  blogHome: undefined;
  postDetails: { postId: string };
  createPost: undefined;
};

const BlogStack = createStackNavigator<BlogStackParamList>();

const BlogNavigator = () => {
  return (
    <BlogStack.Navigator>
      <BlogStack.Screen
        name="blogHome"
        component={BlogScreen}
        options={{ headerShown: false }}
      />
      <BlogStack.Screen
        name="postDetails"
        component={PostDetails}
        options={({ navigation }) => ({
          header: () => (
            <TabHeader navigation={navigation} title="Post Details" />
          ),
          presentation: 'modal',
        })}
      />
      <BlogStack.Screen
        name="createPost"
        component={CreatePost}
        options={({ navigation }) => ({
          header: () => (
            <TabHeader navigation={navigation} title="Create Post" />
          ),
          presentation: 'modal',
        })}
      />
    </BlogStack.Navigator>
  );
};

export default BlogNavigator;
