import {
  filterCountries,
  useCountries,
  useDebounce,
  type Country,
} from "@dcb/shared";
import { Host, Column, TextInput } from "@expo/ui";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/theme";

export default function Countries() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const search = useDebounce(query, 300);
  const { data, isPending, isError, refetch } = useCountries();

  const filtered = useMemo(
    () => filterCountries(data ?? [], search),
    [data, search],
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

        {isPending ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
        ) : isError ? (
          <View style={styles.center}>
            <Text style={[styles.message, { color: colors.textMuted }]}>
              {t("countries.error")}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("countries.retry")}
              onPress={() => refetch()}
              style={[
                styles.retry,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                {t("countries.retry")}
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlashList
            data={filtered}
            keyExtractor={(item) => item.code}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            keyboardDismissMode="on-drag"
            ListEmptyComponent={
              <Text style={[styles.message, { color: colors.textMuted }]}>
                {t("countries.empty")}
              </Text>
            }
            renderItem={({ item }: { item: Country }) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.name}
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
                    params: { id: item.code },
                  })
                }
              >
                <Image
                  source={{ uri: item.flagPng }}
                  style={styles.flag}
                  contentFit="cover"
                  accessibilityLabel={item.flagAlt ?? item.name}
                />
                <View style={styles.rowText}>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.rowMeta, { color: colors.textMuted }]}>
                    {item.region}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        )}
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    width: 40,
    height: 28,
    borderRadius: 4,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  rowMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    paddingVertical: 8,
  },
  retry: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 44,
    justifyContent: "center",
  },
});
