import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentDetail from '../../screens/StudentDetail';
import Students from '../../screens/Students';

const StudentStackNavigator = createNativeStackNavigator();
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
