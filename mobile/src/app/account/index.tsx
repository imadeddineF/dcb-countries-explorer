import { Column, Host, Row } from "@expo/ui";
import { StyleSheet } from "react-native";
import { Screen } from "@/components/shared/screen";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { ThemedText } from "@/components/shared/themed-text";
// import { useTheme } from "@/theme";

export default function Account() {
  // const { colors } = useTheme();

  return (
    <Screen>
      <Host style={[styles.host]}>
        <Column spacing={8} alignment="center" style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            Account
          </ThemedText>

          <Row spacing={8} alignment="center">
            <ThemedText>Dark mode</ThemedText>
            <ModeToggle />
          </Row>
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
