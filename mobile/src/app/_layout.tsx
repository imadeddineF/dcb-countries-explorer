import { configureCountriesApi } from "@dcb/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppTabs from "@/components/shared/app-tabs";
import { LanguageProvider } from "@/i18n";
import { ThemeProvider } from "@/theme";

configureCountriesApi({
  apiKey: process.env.EXPO_PUBLIC_RESTCOUNTRIES_KEY ?? "",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="auto" />
            <AppTabs />
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
