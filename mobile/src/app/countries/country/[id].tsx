import { Host, Column, Text } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function CountryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Host style={styles.host}>
      <Column spacing={8} alignment="center" style={styles.content}>
        <Text textStyle={{ fontSize: 20, fontWeight: "600" }}>Country</Text>
        <Text textStyle={{ fontSize: 14 }}>{id}</Text>
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  content: { flex: 1, padding: 16 },
});
