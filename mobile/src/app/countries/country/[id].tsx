import { Host, Column } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/shared/themed-text";
// import { useTheme } from "@/theme";

export default function CountryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // const { colors } = useTheme();

  return (
    <Host style={[styles.host]}>
      <Column spacing={8} alignment="center" style={styles.content}>
        <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
          Country
        </ThemedText>
        <ThemedText textStyle={{ fontSize: 14 }}>{id}</ThemedText>
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  content: { flex: 1, padding: 16 },
});
