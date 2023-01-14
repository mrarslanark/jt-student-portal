import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {StudentDetailProps} from '../../navigator/StudentNavigator';
import students from '../../constants/students.json';
import {StudentItemType} from '../../components/StudentItem';
import Divider from '../../components/Divider';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {setActiveRoom} from '../../store/slices/chats';

const StudentDetail: React.FC<StudentDetailProps> = ({navigation, route}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [studentInfo, setStudentInfo] = useState<StudentItemType | null>(null);
  const [studentStatus, setStudentStatus] = useState<boolean | null>(null);
  const {id} = route.params;

  useEffect(() => {
    const student = students.find(item => item.id === id);
    if (student) {
      setStudentInfo(student);
      setStudentStatus(student.active);
      navigation.setOptions({
        title: student.first_name,
      });
    }
  }, []);

  if (!studentInfo) {
    return null;
  }

  const handleToggleStatus = () => {
    if (studentStatus === null) {
      Alert.alert(
        'Something went wrong',
        'We are unable to change the status for now',
      );
      return;
    }
    setStudentStatus(prevState => !prevState);
  };

  const handleNavigation = () => {
    dispatch(setActiveRoom(studentInfo.id));
    navigation.navigate('ChatDetail', {
      studentId: studentInfo.id,
      name: `${studentInfo.first_name} ${studentInfo.last_name}`,
      avatar: studentInfo.avatar,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: studentInfo.avatar}} style={styles.avatar} />
        <Text style={styles.name}>
          {studentInfo.first_name} {studentInfo.last_name}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button onPress={handleNavigation} title={'Chat'} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToggleStatus}
          style={styles.statusButton}>
          <Text
            style={
              studentStatus
                ? styles.statusTextDisabled
                : styles.statusTextEnabled
            }>
            {studentStatus ? 'Disable' : 'Enable'}
          </Text>
        </TouchableOpacity>
      </View>
      <Divider type="colored" marginVertical={16} />
      <Text style={styles.sectionTitle}>Student Information</Text>
      <InfoRow title={'First Name'} value={studentInfo.first_name} />
      <InfoRow title={'Last Name'} value={studentInfo.last_name} />
      <InfoRow title={'Class'} value={studentInfo.class_id} />
      <InfoRow title={'Roll #'} value={studentInfo.roll_no} />
      <InfoRow
        title={'Status'}
        value={studentStatus ? 'Enabled' : 'Disabled'}
      />
      <InfoRow
        title={'Joined'}
        value={moment(studentInfo.created_at).format('MMMM DD, YYYY')}
      />
      <InfoRow
        title={'Information last updated'}
        value={moment(studentInfo.updated_at).format('MMMM DD, YYYY')}
      />
    </ScrollView>
  );
};

interface ButtonType {
  title: string;
  onPress: () => void | undefined;
}

const Button: React.FC<ButtonType> = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionContainer}>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
};

type InfoRowType = {
  title: string;
  value: string;
};

const InfoRow: React.FC<InfoRowType> = ({title, value}) => {
  return (
    <View>
      <View style={styles.infoRowContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Divider marginVertical={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 24,
    opacity: 0.6,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statusButton: {
    borderBottomColor: '#13315C',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 0.48,
  },
  statusTextEnabled: {
    color: 'green',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statusTextDisabled: {
    color: 'gray',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  actionContainer: {
    backgroundColor: '#134074',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 0.48,
  },
  actionText: {
    color: '#EEF4ED',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default StudentDetail;
