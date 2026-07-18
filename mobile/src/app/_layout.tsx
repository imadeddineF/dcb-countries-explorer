import { SafeAreaProvider } from "react-native-safe-area-context";
import AppTabs from "@/components/shared/app-tabs";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppTabs />
    </SafeAreaProvider>
  );
}
