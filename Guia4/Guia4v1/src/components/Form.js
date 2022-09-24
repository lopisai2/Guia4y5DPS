import { Picker } from '@react-native-picker/picker'; //RNPicker no funciona, manda un error Hook Call...
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import colors from '../utils/colors';

export default function Form(props) {
  const {setCapital, setInterest, setMonths,months} = props;  
  console.log(months);
  return (
    <View style={styles.viewForm}>
      <View style={styles.viewInputs}>
        <TextInput
          placeholder="Cantidad a pedir"
          keyboardType="numeric"
          style={styles.input}
          onChange={e => setCapital(e.nativeEvent.text)}
        />
        <TextInput
          placeholder="Interes %"
          keyboardType="numeric"
          style={[styles.input, styles.inputPercentage]}
          onChange={e => setInterest(e.nativeEvent.text)}
        />
      </View>
      <Picker
        style={picketSelectStyles.inputAndroid}                 
        selectedValue={months}
        onValueChange={(value) => setMonths(value)}        
        >        
        <Picker.Item label='Seleccionar Meses' value={null}></Picker.Item>
        <Picker.Item label='3 Meses' value={3}></Picker.Item>
        <Picker.Item label='6 Meses' value={6}></Picker.Item>        
        <Picker.Item label='12 Meses' value={12}></Picker.Item>        
        <Picker.Item label='24 Meses' value={24}></Picker.Item>        
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    position: 'absolute',
    bottom: 0,
    width: '85%',
    paddingHorizontal: 20,
    backgroundColor: colors.PRIMARY_COLOR_DARK,
    borderRadius: 30,
    height: 300,
    justifyContent: 'center',
  },
  viewInputs: {flexDirection: 'row'},
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.PRIMARY_COLOR,
    borderRadius: 5,
    width: '60%',
    marginRight: 5,
    marginLeft: -5,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 20,
  },
  inputPercentage: {width: '40%', marginLeft: 5},
});

const picketSelectStyles = StyleSheet.create({
  
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginLeft: -5,
    marginRight: -5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
});
