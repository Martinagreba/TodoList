import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PlusIcon from '../assets/images/plusIcon.svg';

const character = require('../assets/images/character2.webp');

type EmptyStateProps = {
  onAddTask: () => void;
};

const EmptyState = ({ onAddTask }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create your first task</Text>

      <View style={styles.imageContainer}>
        <Image source={character} style={styles.image} />

        <TouchableOpacity onPress={onAddTask}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  image: {
    width: 100,
    height: 116,
    resizeMode: 'contain',
    marginRight: -15,
  },
});
