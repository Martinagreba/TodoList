import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';

const backgroundImage = require('../assets/images/background.png');

const getCurrentDate = () => {
  const today = new Date();

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return today.toLocaleDateString('en-US', dateFormat);
};

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const currentDate = getCurrentDate();

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '700',
  },
});
