import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function Input({ style, ...props }: TextInputProps & { style?: any }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#606061"
      autoCapitalize="none"
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 14,
    color: '#000000',
  },
});
