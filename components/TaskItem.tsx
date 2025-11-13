import { Task, useTaskStore } from '@/store/taskStore';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckMarkIcon from '../assets/images/checkMarkIcon.svg';

type TaskItemProps = {
  task: Task;
  onEditPress: (task: Task) => void;
};

const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(date).toLocaleTimeString('en-US', options);
};

const TaskItem = ({ task, onEditPress }: TaskItemProps) => {
  const editTask = useTaskStore(state => state.editTask);
  const formattedDate = formatTime(task.date);
  const handleToggle = () => {
    editTask(task.id, {
      isCompleted: !task.isCompleted,
    });
  };

  const handleEditPress = () => {
    onEditPress(task);
  };

  const isCompleted = task.isCompleted;

  return (
    <View style={[styles.container, isCompleted && styles.completedContainer]}>
      <TouchableOpacity onPress={handleEditPress} style={styles.taskContainer}>
        <Text style={[styles.title, task.isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        <View style={styles.info}>
          <Text style={[styles.text, task.isCompleted && styles.textCompleted]}>
            {task.category}
          </Text>
          <Text style={[styles.text, task.isCompleted && styles.textCompleted]}>
            {formattedDate}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleToggle}
        style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
      >
        {isCompleted && <CheckMarkIcon width={16} height={15} />}
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: '#4A3780',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    marginTop: 5,
  },
  completedContainer: {
    backgroundColor: '#f2f2f2',
    opacity: 0.7,
  },
  taskContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  info: {
    flexDirection: 'row',
  },
  text: {
    color: '#4A3780',
    fontSize: 14,
    marginRight: 10,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#2b2b2cff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#4A3780',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4A3780',
  },
});
