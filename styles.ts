import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignItems: "flex-start",
    // marginTop: 16,
    // marginHorizontal: 16,
    // justifyContent: "center",
    // height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  paddingContainer: {
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
    paddingTop: 16,
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
    backgroundColor: "#007AFF",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  retakeButtonText: {
    color: "#007AFF",
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
    borderColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export const modalStyles = StyleSheet.create({
  modalPosition: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 14,
    alignItems: 'center',
    width: 270,
    shadowColor: '#000',
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
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  modalButton: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 12,
    borderTopWidth: 0.4,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalAcknowledgement: {
    fontSize: 13,
    color: '#0E7AFE',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 20,
    
  }
})


export const ideaListStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  description: {
    fontSize: 15,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
