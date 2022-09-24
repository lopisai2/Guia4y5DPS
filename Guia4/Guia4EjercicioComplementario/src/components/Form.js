import { Picker } from '@react-native-picker/picker'; //RNPicker no funciona, manda un error Hook Call...
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import colors from '../utils/colors';

export default function Form(props) {
  //props contiene las propiedades que se pueden llevar a otro formulario y a la vez traerlas del mismo hacia aquí con las modificaciones
  const {setNombreempleado, setSalarioBase} = props;    
  return (
    <View style={styles.viewForm}>
      <View style={styles.viewInputs}>
        <TextInput
          placeholder="Nombre del Empleado"
          keyboardType="ascii-capable"
          style={styles.input}
          onChange={e => setNombreempleado(e.nativeEvent.text)}
        />
        <TextInput
          placeholder="Salario Base"
          //Define el tipo de teclado
          keyboardType="numeric"
          style={[styles.input, styles.inputPercentage]}
          onChange={e => setSalarioBase(e.nativeEvent.text)}
        />
      </View>      
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
    height: 325,
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

