import { Picker } from "@expo/ui";
import { useTranslation } from "@/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <Picker selectedValue={language} onValueChange={setLanguage}>
      <Picker.Item label="English" value="en" />
      <Picker.Item label="Spanish" value="es" />
      <Picker.Item label="French" value="fr" />
    </Picker>
  );
}
