import { FC, ReactNode } from 'react';
import { View } from 'react-native';

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <View className="flex-1 relative">
      <View className="flex-1 bg-white">{children}</View>
    </View>
  );
};

export default Layout;
