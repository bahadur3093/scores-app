import { Text, TextInput, View } from 'react-native';

interface IRenderField {
  label: string;
  value: string;
  placeholder: string;
  isEditing: boolean;
  multiline?: boolean;
}

const RenderField = ({
  label,
  value,
  placeholder,
  isEditing,
  multiline = false,
}: IRenderField) => {
  return (
    <View className="mb-2">
      <Text className="text-gray-700 font-bold mb-1">{label}:</Text>
      {isEditing ? (
        <TextInput
          className="border border-gray-300 rounded-lg p-2 bg-white"
          placeholder={placeholder}
          defaultValue={value}
          multiline={multiline}
        />
      ) : (
        <Text className="text-gray-700">{value}</Text>
      )}
    </View>
  );
};

export default RenderField;
