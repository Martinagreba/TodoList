import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebaseConfig';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  category: string;
  date: Date;
  isCompleted: boolean;
}

export type NewTaskData = Omit<Task, 'id' | 'isCompleted'>;

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error?: string | null;

  addTask: (newTaskData: NewTaskData) => Promise<void>;
  editTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  subscribeToTasks: () => () => void;

  filterStatus: 'all' | 'active' | 'completed';
  setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
}

export const useTaskStore = create<TaskState>(set => {
  const tasksCollection = collection(db, 'tasks');

  return {
    tasks: [],
    loading: false,
    error: null,
    filterStatus: 'active',

    addTask: async newTaskData => {
      try {
        await addDoc(tasksCollection, {
          ...newTaskData,
          date: newTaskData.date.toISOString(),
          isCompleted: false,
        });
      } catch (error: any) {
        set({ error: error.message });
      }
    },

    editTask: async (id, updates) => {
      try {
        const ref = doc(db, 'tasks', id);
        const taskUpdates: any = { ...updates };
        if (updates.date) taskUpdates.date = updates.date.toISOString();

        await updateDoc(ref, taskUpdates);
      } catch (error: any) {
        set({ error: error.message });
      }
    },
    deleteTask: async id => {
      try {
        await deleteDoc(doc(db, 'tasks', id));
      } catch (error: any) {
        set({ error: error.message });
      }
    },

    subscribeToTasks: () => {
      const q = query(tasksCollection, orderBy('date', 'asc'));
      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const tasks: Task[] = snapshot.docs.map(docSnap => {
            const d = docSnap.data() as any;
            return {
              id: docSnap.id,
              title: d.title,
              notes: d.notes,
              category: d.category,
              date: new Date(d.date),
              isCompleted: d.isCompleted,
            };
          });
          set({ tasks, loading: false, error: null });
        },
        error => set({ error: error.message, loading: false }),
      );
      return unsubscribe;
    },

    setFilterStatus: status => set({ filterStatus: status }),
  };
});
