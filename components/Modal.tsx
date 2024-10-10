import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { modalStyles } from "../styles";

type Props = {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  titleText?: string;
  bodyText?: string;
  onConfirm?: () => void;
  onCancel?: () => void | undefined;
};

const ModalComponent = ({
  isModalVisible,
  setModalVisible,
  titleText,
  bodyText,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={modalStyles.modalPosition}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>{titleText}</Text>
          <Text style={modalStyles.modalText}>{bodyText}</Text>
          {!onCancel ? (
            <Pressable style={[modalStyles.modalButton]}>
              <Text style={modalStyles.modalAcknowledgement}>OK</Text>
            </Pressable>
          ) : (
            <Pressable style={[modalStyles.modalButton]} onPress={onConfirm}>
              <Text style={modalStyles.modalAcknowledgement}>Confirm</Text>
            </Pressable>
          )}
          {onCancel && (
            <Pressable
              style={[modalStyles.modalButton]}
              onPress={() => onCancel()}
            >
              <Text style={modalStyles.modalAcknowledgement}>Cancel</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
