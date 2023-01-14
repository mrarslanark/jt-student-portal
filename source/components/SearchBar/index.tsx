import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';
import {Icons} from '../../constants/icons';

interface ISearchBar {
  placeholder: string;
  onChangeText: (text: string) => void | undefined;
  value: string | undefined;
}

const SearchBar: React.FC<ISearchBar> = ({
  placeholder,
  onChangeText,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Image source={Icons.Search} style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoComplete={'off'}
        autoCapitalize={'none'}
        keyboardType={'default'}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export default SearchBar;
