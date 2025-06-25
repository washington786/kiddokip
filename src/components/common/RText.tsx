import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import colors from "../../config/colors";

interface prop {
  title: string;
}
const RText: FC<prop> = ({ title }) => {
  return (
    <Text variant="labelSmall" style={styles.txt}>
      {title}
    </Text>
  );
};

export default RText;

const styles = StyleSheet.create({
  txt: {
    marginVertical: 5,
    color: colors.primary[700],
  },
});
