import { Stack } from "expo-router";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/theme";

export default function CountriesLayout() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.surface },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(country)/[id]"
        options={{ title: t("countryDetail.headerTitle") }}
      />
    </Stack>
  );
}
