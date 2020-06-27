import { shadowOptions } from "../../constant/ShadowOptions";
import { Color } from "../../constant/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Color.PRIMARY,
    maxWidth: 420,
  },
  scrollViewWrapper: {
    backgroundColor: Color.PRIMARY,
  },
  scrollView: {
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Color.PRIMARY_WHITE,
  },
  addNoteButtonView: {
    position: "absolute",
    bottom: 5,
    width: '100%',
    ...shadowOptions
  },
  profileIconView: {
    width: 30,
    height: 30,
    padding: 3,
    borderRadius: 5,
    backgroundColor: Color.PRIMARY_WHITE,
    ...shadowOptions,
  },
  stub: {
    marginTop: 152,
  },
});
