import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Button({
  title,
  backgroundColor,
  textColor,
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || '#ffffff' }, style]}
      {...props}
    >
      <Text style={[styles.buttonText, { color: textColor || '#4A3780' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
  },
  buttonText: {
    color: '#4A3780',
    fontSize: 16,
    fontWeight: '600',
  },
});
