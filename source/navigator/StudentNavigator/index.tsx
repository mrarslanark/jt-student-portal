import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import StudentDetail from '../../screens/StudentDetail';
import Students from '../../screens/Students';

type ParamList = {
  Students: {} | undefined;
  StudentDetail: {
    id: string;
  };
  ChatDetail: {
    studentId: string;
    name: string;
    avatar: string;
  };
};

export type StudentsProps = NativeStackScreenProps<ParamList, 'Students'>;
export type StudentDetailProps = NativeStackScreenProps<
  ParamList,
  'StudentDetail'
>;

const StudentStackNavigator = createNativeStackNavigator<ParamList>();

const StudentNavigator = () => {
  return (
    <StudentStackNavigator.Navigator>
      <StudentStackNavigator.Screen name="Students" component={Students} />
      <StudentStackNavigator.Screen
        name="StudentDetail"
        component={StudentDetail}
      />
    </StudentStackNavigator.Navigator>
  );
};

export default StudentNavigator;
