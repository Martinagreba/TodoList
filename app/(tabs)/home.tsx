import PlusIcon from '@/assets/images/plusIcon.svg';
import CategorySelect from '@/components/CategorySelect';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import AddTaskModal from '@/components/modals/addTaskModal';
import StatusSelect from '@/components/StatusSelect';
import TaskItem from '@/components/TaskItem';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Task, useTaskStore } from '../../store/taskStore';

type FilterStatus = 'all' | 'active' | 'completed';

const Home = () => {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const tasks = useTaskStore(state => state.tasks);
  const hasTasks = tasks.length > 0;
  const subscribeToTasks = useTaskStore(state => state.subscribeToTasks);

  useEffect(() => {
    const unsubscribe = subscribeToTasks();
    return () => unsubscribe();
  }, []);

  const openTaskModal = () => setModalVisible(true);
  const closeTaskModal = () => setModalVisible(false);

  const openEditPage = (task: Task) => {
    router.push({
      pathname: `/task/[id]`,
      params: {
        id: task.id,
        taskJson: JSON.stringify(task),
      },
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
          ? !task.isCompleted
          : task.isCompleted;
    const matchCategory =
      filterCategory === 'All' || !filterCategory
        ? true
        : task.category === filterCategory;
    const matchSearch =
      searchText.trim() === '' ||
      task.title.toLowerCase().includes(searchText.trim().toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const filteredActiveTasks = filteredTasks.filter(t => !t.isCompleted);
  const filteredCompletedTasks = filteredTasks.filter(t => t.isCompleted);

  return (
    <View style={styles.fullScreen}>
      <Header title="My Todo List" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.filterRow}>
        <View style={styles.dropdownWrapper}>
          <Text style={styles.label}>Status</Text>
          <StatusSelect selectedStatus={filterStatus} onSelectStatus={setFilterStatus} />
        </View>
        <View style={styles.dropdownWrapper}>
          <Text style={styles.label}>Category</Text>
          <CategorySelect
            selectedCategory={filterCategory}
            onSelectCategory={setFilterCategory}
            direction="BOTTOM"
            showAllOption={true}
            style={{ marginRight: 0 }}
            dropdownStyle={{ borderBlockColor: '#4A3780' }}
          />
        </View>
      </View>
      {hasTasks ? (
        <>
          <ScrollView contentContainerStyle={styles.taskContainer}>
            {filteredActiveTasks.length > 0 && (
              <View>
                {filteredActiveTasks.map(task => (
                  <TaskItem key={task.id} task={task} onEditPress={openEditPage} />
                ))}
              </View>
            )}

            {filteredCompletedTasks.length > 0 && (
              <View>
                <Text style={styles.completedTitle}>Completed</Text>
                {filteredCompletedTasks.map(task => (
                  <TaskItem key={task.id} task={task} onEditPress={openEditPage} />
                ))}
              </View>
            )}
          </ScrollView>
          <TouchableOpacity style={styles.icon} onPress={openTaskModal}>
            <PlusIcon />
          </TouchableOpacity>
        </>
      ) : (
        <EmptyState onAddTask={openTaskModal} />
      )}
      <AddTaskModal isVisible={isModalVisible} onClose={closeTaskModal} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    zIndex: 2000,
  },
  dropdownWrapper: {
    width: '48%',
    zIndex: 3000,
    marginBottom: 10,
  },
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    zIndex: 2000,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A3780',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginHorizontal: 10,
    paddingBottom: 80,
  },
  icon: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    zIndex: 10,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '600',
  },
});
