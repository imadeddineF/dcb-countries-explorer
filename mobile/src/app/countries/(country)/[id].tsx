import { Host, Column, FieldGroup, ScrollView } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/shared/themed-text";
import { useTranslation } from "@/i18n";

export default function CountryDetail() {
  const { id: idParam } = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const { t } = useTranslation();

  return (
    <Host style={styles.host}>
      <ScrollView>
        <Column spacing={12} alignment="center" style={styles.content}>
          <ThemedText textStyle={{ fontSize: 20, fontWeight: "600" }}>
            {`${t("countryDetail.headerTitle")}:  ${id}`}
          </ThemedText>

          <Column spacing={8} alignment="start" style={styles.content}>
            <ThemedText
              textStyle={{ fontSize: 16 }}
            >{`Name: ${id}`}</ThemedText>
            <ThemedText
              textStyle={{ fontSize: 16 }}
            >{`Flag: ${id}`}</ThemedText>
            <ThemedText
              textStyle={{ fontSize: 16 }}
            >{`Capital: ${id}`}</ThemedText>
            <ThemedText
              textStyle={{ fontSize: 16 }}
            >{`Population: ${id}`}</ThemedText>
            <ThemedText
              textStyle={{ fontSize: 16 }}
            >{`Region: ${id}`}</ThemedText>
          </Column>
        </Column>
      </ScrollView>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
  content: { flex: 1, paddingHorizontal: 16, paddingVertical: 40 },
  fieldGroup: {},
});
