import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {ChatDetailProps} from '../../navigator/ChatNavigator';

const ChatDetail: React.FC<ChatDetailProps> = ({navigation, route}) => {
  const {avatar, name, studentId} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitleStyle: {
        fontSize: 16,
      },
      headerRight: () => (
        <Image
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            borderRadius: 100,
          }}
          source={{uri: avatar}}
        />
      ),
    });
  }, []);

  return (
    <View>
      <Text>Chat Detail</Text>
    </View>
  );
};

export default ChatDetail;
