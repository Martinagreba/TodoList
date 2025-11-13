import TrashIcon from '@/assets/images/trashIcon.svg';
import CategoryandDateRow from '@/components/CategoryandDateRow';
import Header from '@/components/Header';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useTaskStore } from '@/store/taskStore';
import { TaskData, TaskSchema } from '@/validation/taskValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, editTask, deleteTask } = useTaskStore();
  const existingTask = tasks.find(t => t.id === id);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TaskData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: existingTask?.title || '',
      notes: existingTask?.notes || '',
      category: existingTask?.category || 'General',
      date: existingTask?.date ? new Date(existingTask.date) : new Date(),
    },
  });

  useEffect(() => {
    if (!existingTask) {
      router.back();
    }
  }, [existingTask]);

  const onSubmit = async (data: TaskData) => {
    if (!existingTask) return;
    await editTask(existingTask.id, data);
    router.back();
  };

  const handleDelete = async () => {
    if (!existingTask) return;
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteTask(existingTask.id);
          router.replace('/home');
        },
      },
    ]);
  };

  if (!existingTask) return null;

  return (
    <View style={styles.container}>
      <Header title="Edit Task" />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
          enableOnAndroid={true}
        >
          <Text style={styles.label}>Task Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <>
                <Input
                  placeholder="Task Title"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    {
                      borderWidth: 1,
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
            name="category"
            render={({ field: { value, onChange } }) => (
              <CategoryandDateRow
                category={value}
                onSelectCategory={onChange}
                date={getValues('date')}
                onDateChange={d => setValue('date', d)}
                direction="BOTTOM"
                showTitles={true}
                labelStyle={styles.label}
              />
            )}
          />

          <Text style={styles.label}>Notes</Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Notes"
                multiline
                value={value}
                onChangeText={onChange}
                style={{ height: 120, marginBottom: 16, borderWidth: 1 }}
              />
            )}
          />

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <TrashIcon />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>

          <Button
            title="Save"
            onPress={handleSubmit(onSubmit)}
            backgroundColor="#4A3780"
            textColor="#ffffff"
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    color: '#ED3535',
    marginLeft: 6,
    fontSize: 15,
  },
  error: {
    color: '#ED3535',
    fontSize: 14,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
});
