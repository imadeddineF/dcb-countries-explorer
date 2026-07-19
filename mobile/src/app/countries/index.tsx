import { Host, Column, TextInput } from "@expo/ui";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/theme";

const COUNTRIES = [
  { id: "pl", name: "Palestine" },
  { id: "alg", name: "Algeria" },
  { id: "jp", name: "Japan" },
];

type Country = (typeof COUNTRIES)[number];

export default function Countries() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [query, setQuery] = useState("");

  const filtered = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen>
      <View style={styles.root}>
        <Host matchContents={{ vertical: true }} style={styles.headerHost}>
          <Column spacing={12} style={styles.header}>
            <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
              {t("countries.title")}
            </ThemedText>

            <TextInput
              placeholder={t("countries.search")}
              defaultValue=""
              onChangeText={setQuery}
              enterKeyHint="search"
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor={colors.textMuted}
              textStyle={{ color: colors.text, fontSize: 16 }}
              style={{
                width: "100%",
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 12,
              }}
            />
          </Column>
        </Host>

        <FlashList
          data={filtered}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.textMuted }]}>
              {t("countries.empty")}
            </Text>
          }
          renderItem={({ item }: { item: Country }) => (
            <Pressable
              style={[
                styles.row,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/countries/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Text style={[styles.rowLabel, { color: colors.text }]}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 40,
  },
  headerHost: {
    width: "100%",
  },
  header: {
    width: "100%",
    padding: 16,
    paddingBottom: 8,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    width: "100%",
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  empty: {
    fontSize: 14,
    paddingVertical: 8,
  },
});
