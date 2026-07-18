import { Host, TabView, RNHostView } from "@expo/ui/swift-ui";
import { frame, tabViewStyle } from "@expo/ui/swift-ui/modifiers";
import { Slot, useRouter, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { TABS, tabKeyFromPathname } from "./tabs";

export default function AppTabs() {
  const router = useRouter();
  const selected = tabKeyFromPathname(usePathname());

  return (
    <Host style={styles.root}>
      <TabView
        selection={selected}
        onSelectionChange={(key) => {
          const tab = TABS.find((t) => t.key === key);
          if (tab) router.navigate(tab.href);
        }}
        modifiers={[
          frame({ maxWidth: Infinity, maxHeight: Infinity }),
          tabViewStyle({ type: "automatic" }),
        ]}
      >
        {TABS.map((tab) => (
          <TabView.Tab
            key={tab.key}
            value={tab.key}
            label={tab.label}
            systemImage={
              selected === tab.key ? tab.sf.selected : tab.sf.default
            }
          >
            <RNHostView>
              {/* SwiftUI TabView already applies safe-area insets — no SafeAreaView here */}
              <View style={styles.root}>
                {selected === tab.key ? <Slot /> : <View style={styles.root} />}
              </View>
            </RNHostView>
          </TabView.Tab>
        ))}
      </TabView>
    </Host>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
