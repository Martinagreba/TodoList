import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type CategorySelectProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  direction?: 'TOP' | 'BOTTOM';
  showAllOption?: boolean;
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
};

const CategorySelect = ({
  selectedCategory,
  onSelectCategory,
  direction = 'TOP',
  showAllOption = false,
  style,
  dropdownStyle,
}: CategorySelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(selectedCategory);

  const categoryItems = [
    { label: 'General', value: 'General' },
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Wishlist', value: 'Wishlist' },
    { label: 'Birthday', value: 'Birthday' },
    { label: 'Learning', value: 'Learning' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Study', value: 'Study' },
  ];

  const [items, setItems] = useState(
    showAllOption ? [{ label: 'All', value: 'All' }, ...categoryItems] : categoryItems,
  );

  useEffect(() => {
    if (open) Keyboard.dismiss();
  }, [open]);

  return (
    <View style={[styles.container, style]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Category"
        dropDownDirection={direction}
        style={[styles.dropdown, dropdownStyle]}
        dropDownContainerStyle={styles.dropDownContainer}
        listMode="SCROLLVIEW"
        onChangeValue={newValue => {
          if (newValue) {
            onSelectCategory(newValue);
          }
        }}
      />
    </View>
  );
};
export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  dropdown: {
    borderRadius: 8,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
  },
});
