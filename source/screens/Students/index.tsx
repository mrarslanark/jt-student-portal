import React, {useState, useEffect} from 'react';
import {FlatList, Image, TextInput, View} from 'react-native';

import Divider from '../../components/Divider';
import StudentItem, {StudentItemType} from '../../components/StudentItem';
import {Icons} from '../../constants/icons';
import students from '../../constants/students.json';
import {StudentsProps} from '../../navigator/StudentNavigator';
import styles from './styles';

const Students: React.FC<StudentsProps> = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDataSource, setFilteredDataSource] = useState<
    StudentItemType[]
  >([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const range =
      currentPage * 20 > students.length ? students.length : currentPage * 20;
    setFilteredDataSource(students.slice(0, range));
  }, [currentPage]);

  const handleNavigation = (id: string) => {
    navigation.navigate('StudentDetail', {id});
  };

  const searchFilter = (text: string) => {
    if (text) {
      const newData = students.filter(item => {
        const {first_name, last_name, class_id, roll_no} = item;
        const firstName = first_name
          ? first_name.toLowerCase()
          : ''.toLowerCase();
        const lastName = last_name ? last_name.toLowerCase() : ''.toLowerCase();
        const classNum = class_id ? class_id.toLowerCase() : ''.toLowerCase();
        const rollNum = roll_no ? roll_no.toLowerCase() : ''.toLowerCase();
        const inputText = text.toLowerCase();
        return (
          firstName.indexOf(inputText) > -1 ||
          lastName.indexOf(inputText) > -1 ||
          classNum.indexOf(inputText) > -1 ||
          rollNum.indexOf(inputText) > -1
        );
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(students);
      setSearchText(text);
    }
  };

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <Image source={Icons.Search} style={styles.searchIconActive} />
        <TextInput
          placeholder={'Search Students'}
          onChangeText={searchFilter}
          autoComplete={'off'}
          autoCapitalize={'none'}
          keyboardType={'default'}
          style={styles.input}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredDataSource}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={() => setCurrentPage(prevState => prevState + 1)}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          return (
            <StudentItem onPress={() => handleNavigation(item.id)} {...item} />
          );
        }}
      />
    </View>
  );
};

export default Students;
