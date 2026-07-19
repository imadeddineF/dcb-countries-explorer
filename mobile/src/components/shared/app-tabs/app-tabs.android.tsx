import {
  Host,
  Icon,
  NavigationBar,
  NavigationBarItem,
  Text,
} from "@expo/ui/jetpack-compose";
import { Slot, useRouter, usePathname } from "expo-router";
import { StyleSheet, View, type ImageSourcePropType } from "react-native";

import { useTranslation } from "@/i18n";
import { useTheme } from "@/theme";
import { TABS, tabKeyFromPathname, type TabKey } from "./tabs";
const MD_ICONS: Record<TabKey, ImageSourcePropType> = {
  index: require("@expo/material-symbols/home.xml"),
  countries: require("@expo/material-symbols/globe.xml"),
  notifications: require("@expo/material-symbols/notifications.xml"),
  account: require("@expo/material-symbols/account_circle.xml"),
};

export default function AppTabs() {
  const router = useRouter();
  const selected = tabKeyFromPathname(usePathname());
  const { colors } = useTheme();
  const { t, language } = useTranslation();

  return (
    <View style={styles.root}>
      <Slot />

      <Host key={language} matchContents={{ vertical: true }}>
        {/* The Compose host doesn't follow RN's Appearance override, so the
            palette is passed explicitly to keep the bar in sync with the app theme */}
        <NavigationBar containerColor={colors.background}>
          {TABS.map((tab) => (
            <NavigationBarItem
              key={tab.key}
              selected={selected === tab.key}
              onClick={() => router.navigate(tab.href)}
              colors={{
                selectedIconColor: colors.text,
                selectedTextColor: colors.text,
                selectedIndicatorColor: colors.border,
                unselectedIconColor: colors.textMuted,
                unselectedTextColor: colors.textMuted,
              }}
            >
              <NavigationBarItem.Icon>
                <Icon source={MD_ICONS[tab.key]} />
              </NavigationBarItem.Icon>
              <NavigationBarItem.Label>
                <Text>{t(tab.labelKey)}</Text>
              </NavigationBarItem.Label>
            </NavigationBarItem>
          ))}
        </NavigationBar>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});
