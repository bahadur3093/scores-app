import { useRef } from 'react';
import { View } from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';

export default function RichTextEditor() {
  const richText = useRef<RichEditor>(null);

  return (
    <View style={{ flex: 1 }}>
      <RichEditor
        ref={richText}
        style={{ flex: 1, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Start writing here..."
        
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
        ]}
      />
    </View>
  );
}
