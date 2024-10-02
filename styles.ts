import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignItems: "flex-start",
    // marginTop: 16,
    // marginHorizontal: 16,
    // justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  peopleContainer: {
    paddingHorizontal: 16, paddingVertical: 8,
    width: "100%",
  },
  marginHorizontal: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export const textStyles = StyleSheet.create({
  h2: {
    color: "black",
    fontFamily: "monospace",
    fontSize: 32,
    textAlign: "center",
    // paddingVertical: 16,
    // marginVertical: 16,
    // marginHorizontal: 8,
  },
  h3: {
    paddingTop: 4,
    color: "white",
    fontSize: 16,
    paddingBottom: 10,
    fontFamily: "monospace",
  },
  h4: {
    paddingTop: 4,
    color: "black",
    fontSize: 15,
    paddingBottom: 10,
    fontFamily: "monospace",
  },
  p: {
    color: "grey",
    fontSize: 16,
    paddingBottom: 10,
    fontFamily: "monospace",
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    display: "flex",
    marginTop: 10,
  },
  customPersonParagraph:{
    color: "grey",
    fontSize: 16,
    fontFamily: "monospace",
    // marginVertical: 1,
  }
});

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 21,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "center",
    marginRight: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },
  absoluteButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#26653A",
  },
  headerTitle: {
    color: "white",
  },
  headerRightButton: {
    // backgroundColor: "#fff",
    marginRight: 10,
    color: "white",
  },
  headerLeftButton: {
    backgroundColor: "#fff",
    marginLeft: 25,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});