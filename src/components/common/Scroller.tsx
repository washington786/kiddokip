import { ScrollView, StyleSheet } from "react-native";
import React, { FC, ReactNode } from "react";
import colors from "../../config/colors";

interface prop {
  children: ReactNode;
}
const Scroller: FC<prop> = ({ children }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.con}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </ScrollView>
  );
};

export default Scroller;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: colors.zinc[50],
    flexGrow: 1,
  },
});
