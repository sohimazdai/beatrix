import { shadowOptions } from "../../constant/shadowOptions";
import { ThemeColor } from "../../constant/ThemeColor";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: ThemeColor.BG_COLOR
  },
  cardsViewWrap: {
    backgroundColor: "#E3EAFF",
  },
  cardsView: {
    paddingBottom: 70,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: ThemeColor.BG_COLOR
  },
  iconBarViewWrap: {
    backgroundColor: "#2E3858",
  },
  iconBarView: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3EAFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  iconBarIcon: {
    flex: 1,
    height: 30
  },
  cardWrap: {
    width: "100%",
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center"
  },
  dateView: {
    marginBottom: 10,

    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 22,

    color: "#555"
  },
  dayNotes: {
    width: "100%",
    padding: 10,
    borderRadius: 25,
    flexDirection: "column"
  },
  cardHat: {
    height: 20,
    width: "100%",

    marginBottom: 20,

    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  cardHatText: {
    width: "25%",

    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,

    color: "#666666"
  },
  addNoteButtonView: {
    position: "absolute",
    bottom: 5,
    right: 5,

    ...shadowOptions
  },
  noNotesStub: {
    flex: 1,
    padding: 40,
    fontSize: 20,

    color: "#333333"
  },
  addNoteButton: {
    display: "flex",
    padding: 5,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(250,250,250, 1)",
    borderRadius: 30,
    ...shadowOptions
  },
  addNoteButtonText: {
    fontSize: 18,
    color: "#333333",
    marginRight: 5
  },
  showMoreButtonWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  showMoreButton: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(250,250,250, 1)",
    borderRadius: 30,
    ...shadowOptions,
  },
  noteListBottom: {
    marginVertical: 35
  }
});
