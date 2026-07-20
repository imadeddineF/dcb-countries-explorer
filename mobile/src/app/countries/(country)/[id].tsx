import { formatPopulation, useCountry } from "@dcb/shared";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/shared/screen";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/theme";

export default function CountryDetail() {
  const { id: idParam } = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { data: country, isPending, isError, refetch } = useCountry(id);

  if (isPending) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </Screen>
    );
  }

  if (isError || !country) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={[styles.message, { color: colors.textMuted }]}>
            {t("countryDetail.error")}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("countryDetail.retry")}
            onPress={() => refetch()}
            style={[
              styles.retry,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              {t("countryDetail.retry")}
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const rows: [string, string][] = [
    [t("countryDetail.capital"), country.capital ?? "—"],
    [t("countryDetail.population"), formatPopulation(country.population)],
    [
      t("countryDetail.region"),
      country.subregion
        ? `${country.region} — ${country.subregion}`
        : country.region,
    ],
    [t("countryDetail.languages"), country.languages.join(", ") || "—"],
  ];

  return (
    <Screen>
      {/* Overrides the layout's static fallback title once the data is in. */}
      <Stack.Screen options={{ title: country.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: country.flagPng }}
          style={styles.flag}
          contentFit="cover"
          accessibilityLabel={country.flagAlt ?? country.name}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          {country.name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {country.officialName}
        </Text>

        <View style={[styles.card, { borderColor: colors.border }]}>
          {rows.map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                {label}
              </Text>
              <Text style={[styles.value, { color: colors.text }]}>
                {value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  flag: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
  },
  card: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
  },
  row: {
    gap: 2,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  message: {
    fontSize: 14,
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
