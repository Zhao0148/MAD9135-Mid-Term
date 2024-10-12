import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  paddingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  marginHorizontal: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export const textStyles = StyleSheet.create({
  h2: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 15,
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
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  textContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    display: "flex",
    marginTop: 10,
  },
  customPersonParagraph: {
    color: "grey",
    fontSize: 16,
    fontFamily: "monospace",
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
  mainContainer: {
    flex: 1,
    // padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cameraContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  cameraView: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  selectedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedImage: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#000000",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    minWidth: 120,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  retakeButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    minWidth: 120,
    borderWidth: 1,
    borderColor: "#000000",
  },
});

export const modalStyles = StyleSheet.create({
  modalPosition: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 14,
    alignItems: "center",
    width: 270,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
  },
  modalText: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  modalButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 12,
    borderTopWidth: 0.4,
    borderTopColor: "#ccc",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  modalAcknowledgement: {
    fontSize: 13,
    color: "#0E7AFE",
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 20,
  },
});

export const ideaListStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 10,
    borderBottomColor: "#222",
    backgroundColor: "#dedede",
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
  },
  image: {
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export const PhotoModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  modalImage: {
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
});
export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#000000",
  },
  saveButton: {
    backgroundColor: "#000000",
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
});

export const touchableBtn = StyleSheet.create({
  touchable: {
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const stylesInput = StyleSheet.create({
  input: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    color: "#000",
  },

  inputContainer: {
    marginBottom: 20,
  },
});
