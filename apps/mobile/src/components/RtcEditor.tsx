import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import { io, Socket } from 'socket.io-client';

interface IRichTextEditor {
  value: string;
  onChange?: (text: string) => void;
  onSave?: (text: string) => void;
}

const socket: Socket = io('http://192.168.68.58:3333');

export default function RichTextEditor({ value, onChange }: IRichTextEditor) {
  const richText = useRef<RichEditor>(null);
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handlerOnChange = (text: string) => {
    if (onChange) {
      debounce(() => onChange(text), 2000)();
    }
  };

  const handleImprove = () => {
    setOutput('');
    setIsStreaming(true);
    richText.current?.getContentHtml().then((html) => {
      socket.emit('improve-text', { content: html });
    });
  };

  useEffect(() => {
    socket.on('improved-chunk', (chunk: string) => {
      console.log('Received chunk:', chunk);
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

  useEffect(() => {
    if (output) {
      richText.current?.setContentHTML(output);
    }
  }, [output]);

  return (
    <View className="flex-1 border border-gray-300 rounded-md overflow-hidden">
      <View className="flex flex-row bg-gray-100 p-2 justify-start items-center border-b border-gray-300">
        <View className="border-r border-gray-300 pr-2">
          <RichToolbar
            editor={richText}
            iconSize={16}
            iconMap={{
              [actions.setBold]: () => <Ionicons name="text" size={16} />,
              [actions.setItalic]: () => (
                <Ionicons name="text-outline" size={16} />
              ),
            }}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
            disabled={isStreaming}
          />
        </View>
        <View className="border-r border-gray-300 pr-2">
          <RichToolbar
            editor={richText}
            iconSize={16}
            iconMap={{
              [actions.insertOrderedList]: () => (
                <Ionicons name="list-circle-outline" size={16} />
              ),
              [actions.insertLink]: () => (
                <Ionicons name="link-outline" size={16} />
              ),
              [actions.insertImage]: () => (
                <Ionicons name="image-outline" size={16} />
              ),
              [actions.setUnderline]: () => (
                <Ionicons name="text-outline" size={16} />
              ),
            }}
            actions={[
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
            ]}
            style={{ flex: 1 }}
            disabled={isStreaming}
          />
        </View>
        <View className="">
          <RichToolbar
            editor={richText}
            iconSize={16}
            iconMap={{
              [actions.redo]: () => <Ionicons name="arrow-redo" size={16} />,
              [actions.undo]: () => <Ionicons name="arrow-undo" size={16} />,
            }}
            actions={[actions.redo, actions.undo]}
            style={{ flex: 1 }}
            disabled={isStreaming}
          />
        </View>
        <View className="flex-1 flex-row justify-end pl-2">
          <TouchableOpacity
            onPress={handleImprove}
            className={`bg-green-500 rounded-md flex-row items-center px-2 py-2 ${
              isStreaming ? 'opacity-50' : ''
            }`}
            disabled={true}
            style={{ pointerEvents: 'none' }}
          >
            {isStreaming ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
          <Ionicons
            name="star"
            size={16}
            color="white"
            style={{ marginRight: 4 }}
          />
          <Text className="text-white font-bold">
            {isStreaming ? 'Generating' : 'Magic'}
          </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <RichEditor
          ref={richText}
          placeholder="Start writing here..."
          initialContentHTML={value}
          onChange={handlerOnChange}
          editorStyle={{ backgroundColor: 'white' }}
          style={{ flex: 1 }}
          disabled={isStreaming}
        />
      </View>
    </View>
  );
}
