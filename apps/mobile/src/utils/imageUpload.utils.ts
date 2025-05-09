import * as ImagePicker from 'expo-image-picker';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dhrnw7w0x/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';

const uploadImageToCloudinary = async (imageUri: string) => {
  const formData = new FormData();

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'scores3093');

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const pickAndUpload = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const image = result.assets[0];
    const cloudinaryUrl = await uploadImageToCloudinary(image.uri);
    return cloudinaryUrl;
  }
};
