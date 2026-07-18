import { Host, Column, Button } from "@expo/ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
// import { useTheme } from "@/theme";

const COUNTRIES = [
  { id: "pl", name: "Palestine" },
  { id: "alg", name: "Algeria" },
  { id: "jp", name: "Japan" },
];

export default function Countries() {
  const router = useRouter();
  // const { colors } = useTheme();

  return (
    <Screen>
      <Host style={[styles.host]}>
        <Column spacing={12} style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            Countries
          </ThemedText>
          {COUNTRIES.map((country) => (
            <Button
              key={country.id}
              label={country.name}
              onPress={() =>
                router.push({
                  pathname: "/countries/country/[id]",
                  params: { id: country.id },
                })
              }
            />
          ))}
        </Column>
      </Host>
    </Screen>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  content: { flex: 1, padding: 16 },
});
