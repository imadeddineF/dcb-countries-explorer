import type { ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

export function Screen({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  // Screen owns the themed background so individual screens don't have to.
  // On Android this also paints the safe-area strip under the status bar,
  // which otherwise stays white in dark mode.
  const { colors } = useTheme();
  const themed = { backgroundColor: colors.surface };

  if (Platform.OS === "ios") {
    return <View style={[styles.root, themed, style]}>{children}</View>;
  }

  return (
    <SafeAreaView style={[styles.root, themed, style]} edges={["top"]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
