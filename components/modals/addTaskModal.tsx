import CategoryandDateRow from '@/components/CategoryandDateRow';
import ModalButtons from '@/components/ModalButtons';
import Input from '@/components/UI/Input';
import { useTaskStore } from '@/store/taskStore';
import { TaskData, TaskSchema } from '@/validation/taskValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type AddTaskModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ isVisible, onClose }: AddTaskModalProps) {
  const { height } = Dimensions.get('window');
  const modalAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(isVisible);
  const addTask = useTaskStore(state => state.addTask);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      notes: '',
      category: 'General',
      date: new Date(),
    },
  });

  const watchedDate = watch('date'); 

  const onSubmit = async (data: TaskData) => {
    await addTask(data);
    reset();
    onClose();
  };

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      reset({
        title: '',
        notes: '',
        category: 'General',
        date: new Date(),
      });
      modalAnim.setValue(height);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.timing(modalAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setShowModal(false));
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <Modal transparent visible={showModal} animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoidingContainer}>
          <Animated.View style={[styles.modalView, { transform: [{ translateY: modalAnim }] }]}>
            <Text style={styles.title}>Create Task</Text>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    placeholder="Task Title"
                    value={value}
                    onChangeText={onChange}
                    style={[
                      {
                        borderWidth: errors.title ? 1 : 0,
                        borderColor: errors.title ? '#ED3535' : '#000',
                        marginBottom: 16,
                      },
                    ]}
                  />
                  {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Notes"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  style={{ height: 120, marginBottom: 16 }}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <CategoryandDateRow
                  category={value}
                  onSelectCategory={onChange}
                  date={watchedDate} 
                  onDateChange={date => setValue('date', date)} 
                  direction="TOP"
                  showTitles={false}
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <ModalButtons text="Cancel" onPress={onClose} type="cancel" />
              <ModalButtons text="Create" onPress={handleSubmit(onSubmit)} type="create" />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#4A3780',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  error: {
    color: '#ED3535',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
