import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppTabs from "@/components/shared/app-tabs";
import { ThemeProvider } from "@/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <AppTabs />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
