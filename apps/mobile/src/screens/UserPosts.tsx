import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://192.168.68.58:3333');

const UserPosts = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    socket.on('improved-chunk', (chunk: string) => {
      setOutput((prev) => prev + chunk);
    });

    socket.on('improved-end', () => {
      setIsStreaming(false);
    });

    socket.on('improved-error', (error) => {
      console.error(error);
      setIsStreaming(false);
    });

    return () => {
      socket.off('improved-chunk');
      socket.off('improved-end');
      socket.off('improved-error');
    };
  }, []);

  const handleImprove = () => {
    setOutput('');
    setIsStreaming(true);
    socket.emit('improve-text', { content: input });
  };

  const handleCancel = () => {
    socket.disconnect();
    setIsStreaming(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      className="bg-gray-100 min-h-full"
    >
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Magic Blog
      </Text>
      <TextInput
        placeholder="Paste blog content..."
        multiline
        value={input}
        onChangeText={setInput}
        className="border border-gray-300 rounded-lg p-4 min-h-[100px] bg-white"
      />
      <View className="flex-row justify-end mt-4">
        <TouchableOpacity
          onPress={handleImprove}
          className="bg-green-500 rounded-lg px-2 py-3 mr-2"
        >
          <Text className="text-white text-center font-semibold text-sm">
            Improve Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-red-500 rounded-lg px-2 py-3"
        >
          <Text className="text-white text-center font-semibold text-sm">
            Cancel Request
          </Text>
        </TouchableOpacity>
      </View>
      <View className="border-t border-gray-300 mt-4" />
      <Text className="mt-6 text-lg font-semibold text-gray-700">
        Improved Content:
      </Text>
      {isStreaming && <Text className="mt-2 text-blue-500">Streaming...</Text>}
      {output ? (
        <Text className="mt-2 bg-gray-200 p-4 rounded-lg">{output}</Text>
      ) : (
        <Text className="mt-2 text-gray-500 italic">
          No improved content available yet.
        </Text>
      )}
    </ScrollView>
  );
};

export default UserPosts;
