import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform
} from 'react-native';

const TextField = ({value, unit, width, keyboardType, placeholder, onChangeText, onSubmitEditing}) => {
  return (
    <View style={{...StyleSheet.flatten(styles.container), width}}>
      <TextInput
        underlineColorAndroid='transparent'
        style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      >
      </TextInput>
      { unit && <Text style={styles.unit}>{unit}</Text>}
    </View>
  )
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  
  unit: {
    flex: 8,
    fontSize: 24,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'right',
    color: '#3c4859',
    paddingRight: 16
  },

  input: {
    flex: 12,
    height: 52, 
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    paddingHorizontal: 20,
  },
});
