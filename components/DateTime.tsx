import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarIcon from '../assets/images/calendarIcon.svg';

type DateTimeProps = {
  date: Date;
  onDateChange: (newDate: Date) => void;
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };
  return date.toLocaleDateString('en-US', options);
};

const DateTime = ({ date, onDateChange }: DateTimeProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(date);

  const handlePress = () => {
    setPickerVisible(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) setTempDate(selectedDate);
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    setPickerVisible(false);
  };

  const handleCancel = () => {
    setPickerVisible(false);
    setTempDate(date);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{formatDate(date)}</Text>
        <CalendarIcon width={20} height={20} />
      </TouchableOpacity>

      <Modal visible={isPickerVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={handleCancel}
          activeOpacity={1}
        >
          <View style={styles.modalTop}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Date and Time</Text>

              <DateTimePicker
                value={tempDate}
                mode="datetime"
                display="inline"
                onChange={onChange}
              />

              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.cancelBtn]}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.confirmBtn]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalTop: {
    marginTop: 80,
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginLeft: 10,
  },
  cancelBtn: {
    backgroundColor: '#F0F0F0',
  },
  confirmBtn: {
    backgroundColor: '#6748b9ff',
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '500',
  },
});
