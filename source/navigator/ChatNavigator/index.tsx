import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chats from '../../screens/Chat';
import ChatDetail from '../../screens/ChatDetail';

const ChatStackNavigator = createNativeStackNavigator();
const ChatNavigator = () => {
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen name="Chats" component={Chats} />
      <ChatStackNavigator.Screen name="ChatDetail" component={ChatDetail} />
    </ChatStackNavigator.Navigator>
  );
};

export default ChatNavigator;
