import { Column, Host, Row, Spacer } from "@expo/ui";
import { StyleSheet } from "react-native";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Screen } from "@/components/shared/screen";
import { ThemedText } from "@/components/shared/themed-text";
import { useTranslation } from "@/i18n";

export default function Account() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Host style={styles.host}>
        <Column spacing={16} alignment="center" style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            {t("account.title")}
          </ThemedText>

          <Row spacing={8} alignment="center" style={styles.row}>
            <ThemedText>{t("account.darkMode")}</ThemedText>
            <Spacer flexible />
            <ModeToggle />
          </Row>

          <Row spacing={8} alignment="center" style={styles.row}>
            <ThemedText>{t("account.language")}</ThemedText>
            <Spacer flexible />
            <LanguageSwitcher />
          </Row>
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
  row: {
    width: "100%",
  },
});
