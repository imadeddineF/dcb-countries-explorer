import { Host, Column } from "@expo/ui";
import { StyleSheet } from "react-native";
import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
// import { useTheme } from "@/theme";

export default function Index() {
  // const { colors } = useTheme();

  return (
    <Screen>
      <Host style={[styles.host]}>
        <Column spacing={8} alignment="center" style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            Notifications
          </ThemedText>
        </Column>
      </Host>
    </Screen>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
