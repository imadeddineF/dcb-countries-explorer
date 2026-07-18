import { Host, Column, Text } from "@expo/ui";
import { StyleSheet } from "react-native";

import { Screen } from "@/components/shared/screen";

export default function Index() {
  return (
    <Screen>
      <Host style={styles.host}>
        <Column spacing={8} alignment="center" style={styles.content}>
          <Text textStyle={{ fontSize: 20, fontWeight: "600" }}>
            Notifications
          </Text>
        </Column>
      </Host>
    </Screen>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
