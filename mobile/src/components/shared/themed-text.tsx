import { Text } from "@expo/ui";
import type { ComponentProps } from "react";

import { useTheme } from "@/theme";

type Props = ComponentProps<typeof Text>;

export function ThemedText({ textStyle, ...rest }: Props) {
  const { colors } = useTheme();

  return <Text textStyle={{ color: colors.text, ...textStyle }} {...rest} />;
}
