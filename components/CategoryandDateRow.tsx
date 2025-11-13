import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import CategorySelect from './CategorySelect';
import DateTime from './DateTime';

type Props = {
  category: string;
  onSelectCategory: (cat: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  direction?: 'TOP' | 'BOTTOM';
  showTitles?: boolean;
  labelStyle?: TextStyle;
};

export default function CategoryandDateRow({
  category,
  onSelectCategory,
  date,
  onDateChange,
  direction = 'TOP',
  showTitles = false,
  labelStyle,
}: Props) {
  return (
    <View style={styles.twoColumn}>
      <View style={styles.wrapperLeft}>
        {showTitles && <Text style={labelStyle}>Category</Text>}
        <CategorySelect
          selectedCategory={category}
          onSelectCategory={onSelectCategory}
          direction={direction}
        />
      </View>
      <View style={styles.wrapperRight}>
        {showTitles && <Text style={labelStyle}>Date</Text>}
        <DateTime date={date} onDateChange={onDateChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  wrapperLeft: {
    flex: 1,
    marginRight: 10,
  },
  wrapperRight: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
  },
});
