import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type StatusSelectProps = {
  selectedStatus: 'all' | 'active' | 'completed';
  onSelectStatus: (status: 'all' | 'active' | 'completed') => void;
};

const StatusSelect = ({ selectedStatus, onSelectStatus }: StatusSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(selectedStatus);
  const [items, setItems] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]);

  useEffect(() => {
    if (open) Keyboard.dismiss();
  }, [open]);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Status"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        listMode="SCROLLVIEW"
        onChangeValue={newValue => {
          if (newValue === 'all' || newValue === 'active' || newValue === 'completed') {
            onSelectStatus(newValue);
          }
        }}
      />
    </View>
  );
};

export default StatusSelect;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: '#4A3780',
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 12,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
