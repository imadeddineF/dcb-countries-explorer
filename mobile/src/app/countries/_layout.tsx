import { Stack } from "expo-router";
import { useTheme } from "@/theme";

export default function CountriesLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        // Screens under a header don't use <Screen>, so the Stack owns their bg
        contentStyle: { backgroundColor: colors.surface },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="country/[id]" options={{ title: "Country" }} />
    </Stack>
  );
}
