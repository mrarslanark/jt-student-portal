import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import {useDispatch} from 'react-redux';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import InfoRow from '../../components/InfoRow';
import {StudentItemType} from '../../components/StudentItem';
import students from '../../constants/students.json';
import {StudentDetailProps} from '../../navigator/StudentNavigator';
import {AppDispatch} from '../../store';
import {setActiveRoom} from '../../store/slices/chats';
import styles from './styles';

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

export default StudentDetail;
