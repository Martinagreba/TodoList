import LogOutIcon from '@/assets/images/logOutIcon.svg';
import PencilIcon from '@/assets/images/pencilIcon.svg';
import UserIcon from '@/assets/images/userIcon.svg';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';

const ProfileScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [newName, setNewName] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || '');
    }
  }, []);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.replace('/');
  };

  const handleEditPress = () => {
    setNewName(userName);
    setEdit(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'This filed cannot be empty');
      return;
    }

    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: newName.trim() });
      setUserName(newName.trim());
      setEdit(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setNewName('');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <View style={styles.profileSection}>
        <UserIcon style={styles.userIcon} />
        {edit ? (
          <View style={styles.nameRow}>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              autoFocus
            />
            <TouchableOpacity onPress={handleSaveName}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <PencilIcon style={styles.pencilIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOutIcon />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginBottom: 10,
  },
  userName: {
    fontWeight: '700',
    fontSize: 25,
    color: '#000',
  },

  pencilIcon: {
    marginLeft: 10,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000ff',
    marginHorizontal: 20,
    marginTop: 50,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#ED3535',
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 20,
    paddingVertical: 2,
    minWidth: 120,
  },
  saveButton: {
    fontSize: 18,
    color: '#4A3780',
    fontWeight: '600',
    marginLeft: 20,
  },
  cancelButton: {
    fontSize: 18,
    color: '#ED3535',
    fontWeight: '600',
    marginLeft: 10,
  },
});
