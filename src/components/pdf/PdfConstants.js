import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    color: "black",
    fontSize: 12,
  },
  rowColored: {
    flexDirection: "row",
    backgroundColor: "#4A86E8",
    margin: 10,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
  },
  clientData: {
    width: "60%",
    fontSize: 16,
    fontFamily: "Times-Bold",
  },
  bikeData: {
    width: "40%",
    fontSize: 16,
    fontFamily: "Times-Bold",
  },
  boldAndFontSize16: {
    fontSize: 16,
    fontFamily: "Times-Bold",
  },
  row60: {
    width: "60%",
  },
  row40: {
    width: "40%",
  },
  row10Centered: {
    textAlign: "center",
    width: "10%",
  },
  row15Centered: {
    textAlign: "center",
    width: "15%",
  },
  spaceTop: {
    marginTop: 20,
  },
  description: {
    width: "60%",
    fontSize: 16,
    fontFamily: "Times-Bold",
  },
  quantity: {
    width: "10%",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  value: {
    width: "15%",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  total: {
    width: "15%",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  data: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  row50Centered: {
    width: "50%",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Times-Bold",
  },
  titleData: {
    fontFamily: "Times-Bold",
  },
  image: {
    width: "50%",
    alignSelf: "center",
  },
  parts: {
    width: "15%",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
});
