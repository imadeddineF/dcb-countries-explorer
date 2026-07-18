import { Text, View, StyleSheet, Platform } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello there!</Text>
      {/* show the name of the platform */}
      <Text>{Platform.OS}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
