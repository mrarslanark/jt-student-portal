import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import TabBarIcon, {TabBarIconType} from '../components/TabBarIcon';
import {Icons} from '../constants/icons';

import ChatNavigator from './ChatNavigator';
import StudentNavigator from './StudentNavigator';

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#134074',
  tabBarInactiveTintColor: '#8DA9C4',
};

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={'ChatNavigator'}
        component={ChatNavigator}
        options={{
          title: 'Chats',
          tabBarIcon: props => (
            <TabBarIcon
              {...props}
              focusedIcon={Icons.ChatFocused}
              icon={Icons.Chat}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'StudentNavigator'}
        component={StudentNavigator}
        options={{
          title: 'Students',
          tabBarIcon: props => (
            <TabBarIcon
              {...props}
              focusedIcon={Icons.StudentsFocused}
              icon={Icons.Students}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
