import { createStackNavigator } from '@react-navigation/stack';

import BlogScreen from '../screens/Blog';
import PostDetails from '../screens/PostDetails';
import CreatePost from '../screens/CreatePost';

const BlogStack = createStackNavigator();

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
        options={{ headerShown: false, title: 'Post Details', presentation: 'modal' }}
      />
      <BlogStack.Screen
        name="createPost"
        component={CreatePost}
        options={{
          headerShown: false,
          title: 'Create Post',
          presentation: 'modal',
        }}
      />
    </BlogStack.Navigator>
  );
};

export default BlogNavigator;
