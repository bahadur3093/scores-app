import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { createPost, getCategories } from '../services/post.service';
import { pickAndUpload } from '../utils/imageUpload.utils';
import { RootStackParamList } from '../types/App.types';
import { useUser } from '../store/UserContext';
import RichTextEditor from '../components/RtcEditor';
import { ScrollView } from 'react-native-gesture-handler';

const CreatePost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [uploadingImage, setUploadingImage] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ['post-category'],
    queryFn: async () => await getCategories().then((res) => res),
    staleTime: 1000 * 60 * 5,
  });
  const [pickerVisible, setPickerVisible] = useState(false);
  const { user } = useUser();

  return (
    <View className="px-4 bg-white">
      <Formik
        initialValues={{
          title: '',
          content: '',
          category: '',
          summary: '',
          cover: '',
          author: user?.name || '',
          authorId: user?.id || '',
        }}
        validate={(values) => {
          const errors: {
            title?: string;
            content?: string;
            category?: string;
            summary?: string;
            cover?: string;
            author?: string;
          } = {};
          if (!values.title) errors.title = 'Title is required';
          if (!values.content) errors.content = 'Content is required';
          if (!values.category) errors.category = 'Category is required';
          if (!values.summary) errors.summary = 'Summary is required';
          if (!values.cover) errors.cover = 'Cover is required';
          if (!values.author) errors.author = 'Author is required';
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createPost(values);
            Alert.alert('Post created!');
            resetForm();
            navigation.goBack();
          } catch (error) {
            console.error('Error creating post:', error);
            Alert.alert('Error', 'Please try again later.');
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="mb-1 font-medium">Title</Text>
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-2"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Enter title"
            />
            {errors.title && touched.title && (
              <Text className="text-red-500 mb-2">{errors.title}</Text>
            )}
            <Text className="mb-1 font-medium">Author</Text>
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-2 bg-gray-100"
              value={user?.name || ''}
              placeholder="Author name"
              editable={false}
              pointerEvents="none"
            />

            <Text className="mb-1 font-medium">Summary</Text>
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-2"
              onChangeText={handleChange('summary')}
              onBlur={handleBlur('summary')}
              value={values.summary}
              placeholder="Enter summary"
            />
            {errors.summary && touched.summary && (
              <Text className="text-red-500 mb-2">{errors.summary}</Text>
            )}

            <Text className="mb-1 font-medium">Category</Text>
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-2 bg-white"
                value={values.category}
                placeholder="Select category"
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            {errors.category && touched.category && (
              <Text className="text-red-500 mb-2">{errors.category}</Text>
            )}

            <Modal
              visible={pickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setPickerVisible(false)}
            >
              <View className="flex-1 justify-end bg-black/40">
                <View className="bg-white rounded-t-lg p-4">
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue) => {
                      setFieldValue('category', itemValue);
                      setPickerVisible(false);
                    }}
                  >
                    <Picker.Item label="Select category..." value="" />
                    {categories &&
                      categories.map((cat) => (
                        <Picker.Item
                          key={cat.id}
                          label={cat.name}
                          value={cat.name}
                        />
                      ))}
                  </Picker>
                  <Button
                    title="Cancel"
                    onPress={() => setPickerVisible(false)}
                  />
                </View>
              </View>
            </Modal>

            <Text className="mb-1 font-medium">Content</Text>
            <View className="border border-gray-300 rounded mb-2 h-[20rem]">
              <RichTextEditor
                value={values.content}
                onChange={handleChange('content')}
              />
            </View>
            {errors.content && touched.content && (
              <Text className="text-red-500 mb-2">{errors.content}</Text>
            )}
            <View className="mt-4 bg-yellow-100 p-3 rounded shadow-md">
              <Text className="text-yellow-800 text-sm">
                Note: Use the magic button above to check for grammatical errors
                or improve your blog content! (Disabled for now)
              </Text>
            </View>

            <View className="mt-4">
              {uploadingImage ? (
                <View className="items-center">
                  <Text className="text-gray-500 mt-2">Uploading image...</Text>
                </View>
              ) : (
                <TouchableOpacity
                  className="bg-green-500 rounded py-2 px-4 items-center"
                  onPress={async () => {
                    setUploadingImage(true);
                    const uploadedImage = await pickAndUpload();
                    if (uploadedImage) {
                      setFieldValue('cover', uploadedImage);
                    }
                    setUploadingImage(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-medium">
                    Upload cover image
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {values.cover ? (
              <View className="mt-4 items-center">
                <Text className="mb-2 font-medium">Uploaded Cover Image:</Text>
                <Image
                  source={{ uri: values.cover }}
                  className="w-48 h-48 rounded"
                />
              </View>
            ) : null}

            {errors.cover && touched.cover && (
              <Text className="text-red-500 mb-2">{errors.cover}</Text>
            )}
            <TouchableOpacity
              className="mt-4 bg-blue-600 rounded py-3 items-center"
              onPress={handleSubmit as any}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                Create Post
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default CreatePost;
