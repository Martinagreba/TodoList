import { Tabs } from 'expo-router';
import React from 'react';
import SmallUserIcon from '../../assets/images/smallUserIcon.svg';
import TodoIcon from '../../assets/images/todoIcon.svg';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#ebe4e4ff',
        tabBarStyle: {
          backgroundColor: '#4A3780',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ focused, color }) => (
            <TodoIcon
              width={18}
              height={18}
              fill={focused ? color : 'none'}
              stroke={focused ? 'none' : color}
              strokeWidth={1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <SmallUserIcon
              width={16}
              height={18}
              fill={focused ? color : 'none'}
              stroke={focused ? 'none' : color}
              strokeWidth={1.5}
            />
          ),
        }}
      />
      <Tabs.Screen name="editTask" options={{ href: null }} />
    </Tabs>
  );
}
