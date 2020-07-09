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
    backgroundColor: Color.PRIMARY_WHITE,
  },
  statisticsScrollViewTop: {
    display: 'flex',
    marginLeft: -8,
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  statisticsScrollView: {
    display: 'flex',
    marginLeft: -8,
    paddingHorizontal: 16,
    overflow: 'visible',
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
