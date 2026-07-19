import { Host, Column, Button } from "@expo/ui";
import { Platform, StyleSheet } from "react-native";
import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
import { useTranslation } from "@/i18n";
import { useRouter } from "expo-router";
// import { useTheme } from "@/theme";

export default function Index() {
  const { t } = useTranslation();
  // const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <Host style={[styles.host]}>
        <Column spacing={20} alignment="center" style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            {t("home.title")}
          </ThemedText>
          <ThemedText
            textStyle={{ fontSize: 14, fontWeight: "600" }}
          >{`${t("home.platform")}: ${Platform.OS.toUpperCase()}`}</ThemedText>

          <Button
            label={t("home.countries")}
            onPress={() => router.push("/countries")}
          />
        </Column>
      </Host>
    </Screen>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
