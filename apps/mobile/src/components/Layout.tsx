import { TouchableOpacity, View } from 'react-native';
import { FC, ReactNode, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  hideHeader = false,
}: LayoutProps) => {
  const [showHeader, setShowHeader] = useState(false);

  return (
    <View className="flex-1 relative">
      <View className="flex-1 bg-white">{children}</View>
      {!hideHeader && (
        <View className="absolute bottom-5 left-5">
          <TouchableOpacity onPress={() => setShowHeader((prev) => !prev)}>
            <View className="w-14 h-14 bg-blue-600 rounded-full flex justify-center items-center shadow-lg">
              <Ionicons name="menu" size={24} color="white" />
            </View>
          </TouchableOpacity>
          {showHeader && (
            <View className="absolute bg-white rounded-md shadow-lg bottom-[110%] left-0 py-2 w-[12rem]">
              <Header />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Layout;
