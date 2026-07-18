import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Home03Icon,
  Notification03Icon,
  UserCircle02Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";
import { Slot, useRouter, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import { TABS, tabKeyFromPathname, type TabKey } from "./tabs";

const HUGEICONS: Record<TabKey, typeof Home03Icon> = {
  index: Home03Icon,
  countries: Globe02Icon,
  notifications: Notification03Icon,
  account: UserCircle02Icon,
};

export default function AppTabs() {
  const router = useRouter();
  const selected = tabKeyFromPathname(usePathname());
  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      <Slot />

      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}
      >
        {TABS.map((tab) => {
          const focused = selected === tab.key;
          const color = focused ? colors.text : colors.textMuted;

          return (
            <Pressable
              key={tab.key}
              style={styles.item}
              onPress={() => router.navigate(tab.href)}
            >
              <HugeiconsIcon
                icon={HUGEICONS[tab.key]}
                size={24}
                color={color}
              />
              <Text style={[styles.label, { color }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
  bar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    paddingBottom: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
