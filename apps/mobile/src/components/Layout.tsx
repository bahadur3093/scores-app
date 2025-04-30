import { View } from "react-native";
import { FC, ReactNode } from "react";

import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  hideHeader = false,
}: LayoutProps) => {
  return (
    <View className="flex-1 relative">
      <View className="flex-1 bg-white">{children}</View>
      {!hideHeader && (
        <View className="absolute bottom-0 w-full flex justify-center items-center">
          <Header />
        </View>
      )}
    </View>
  );
};

export default Layout;