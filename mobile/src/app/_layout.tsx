import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppTabs from "@/components/shared/app-tabs";
import { LanguageProvider } from "@/i18n";
import { ThemeProvider } from "@/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <StatusBar style="auto" />
          <AppTabs />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
