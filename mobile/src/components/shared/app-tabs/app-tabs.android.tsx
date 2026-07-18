import {
  Host,
  Icon,
  NavigationBar,
  NavigationBarItem,
  Text,
} from "@expo/ui/jetpack-compose";
import { Slot, useRouter, usePathname } from "expo-router";
import { StyleSheet, View, type ImageSourcePropType } from "react-native";
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

  return (
    <View style={styles.root}>
      <Slot />

      <Host matchContents={{ vertical: true }}>
        <NavigationBar>
          {TABS.map((tab) => (
            <NavigationBarItem
              key={tab.key}
              selected={selected === tab.key}
              onClick={() => router.navigate(tab.href)}
            >
              <NavigationBarItem.Icon>
                <Icon source={MD_ICONS[tab.key]} />
              </NavigationBarItem.Icon>
              <NavigationBarItem.Label>
                <Text>{tab.label}</Text>
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
