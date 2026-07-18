import { Stack } from "expo-router";

export default function CountriesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="country/[id]" options={{ title: "Country" }} />
    </Stack>
  );
}
