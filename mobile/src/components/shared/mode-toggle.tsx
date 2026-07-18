import { Switch } from "@expo/ui";
import { useTheme } from "@/theme";

export function ModeToggle() {
  const { scheme, setMode } = useTheme();

  return (
    <Switch
      value={scheme === "dark"}
      onValueChange={(on) => setMode(on ? "dark" : "light")}
    />
  );
}
