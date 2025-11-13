import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ModalButtonsProps = {
  text: string;
  onPress: () => void;
  type: 'cancel' | 'create';
};

const ModalButtons = ({ text, onPress, type }: ModalButtonsProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'cancel' ? styles.cancelButton : styles.createButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          type === 'cancel' ? styles.cancelButtonText : styles.createButtonText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ModalButtons;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

  createButton: {
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#ffffff',
  },
  createButtonText: {
    color: '#4A3780',
  },
});
