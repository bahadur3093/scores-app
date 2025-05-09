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
import { Ionicons } from '@expo/vector-icons';

import { createPost, getCategories } from '../services/post.service';
import { pickAndUpload } from '../utils/imageUpload.utils';
import { RootStackParamList } from '../types/App.types';

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

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">
        Create New Post
      </Text>
      <TouchableOpacity
        className="absolute top-4 right-4 bg-red-400 rounded-full p-2"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <Formik
        initialValues={{
          title: '',
          content: '',
          category: '',
          summary: '',
          cover: '',
        }}
        validate={(values) => {
          const errors: {
            title?: string;
            content?: string;
            category?: string;
            summary?: string;
            cover?: string;
          } = {};
          if (!values.title) errors.title = 'Title is required';
          if (!values.content) errors.content = 'Content is required';
          if (!values.category) errors.category = 'Category is required';
          if (!values.summary) errors.summary = 'Summary is required';
          if (!values.cover) errors.cover = 'Cover is required';
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
          <View>
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
            <TextInput
              className="border border-gray-300 rounded px-3 py-2 mb-2 h-32 text-top"
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
              placeholder="Enter content"
              multiline
            />
            {errors.content && touched.content && (
              <Text className="text-red-500 mb-2">{errors.content}</Text>
            )}

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
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreatePost;
