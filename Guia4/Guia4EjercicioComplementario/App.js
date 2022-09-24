/**
 * @format
 * @flow stict-local
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import Result from './src/components/Result';
import colors from './src/utils/colors';

export default function App() {
  const [nombreempleado, setNombreempleado] = useState(null);
  const [salariobase, setSalarioBase] = useState(null);  
  const [salarioneto, setSalarioNeto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  //Actualiza sin necesidad de pinchar el botón de calcular
  useEffect(() => {    
    if (nombreempleado && salariobase) calculate();
    else reset();
  }, [nombreempleado,salariobase]);

  const calculate = () => {
    reset();

    if (!nombreempleado) {
      setErrorMessage('Ingresa el nombre del empleado');
    } else if (!salariobase) {
      setErrorMessage('Ingresa el salario base');
    } else {
      const isss = salariobase*0.03;
      const afp=salariobase*0.04
      const renta = salariobase*0.05;
      setSalarioNeto({
        newisss: isss.toFixed(2).replace('.', ','),
        newafp: afp.toFixed(2).replace('.', ','),
        newrenta:renta.toFixed(2).replace('.',','),
        newsalarioneto:(salariobase-isss-afp-renta).toFixed((2)).replace('.',','),
      });
    }
  };

  const reset = () => {
    setErrorMessage('');
    setSalarioNeto(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.background} />
        <Text style={styles.titleApp}>Calcular el Salario de un empleado</Text>
        <Form
          setNombreempleado={setNombreempleado}
          setSalarioBase={setSalarioBase}          
        />
      </SafeAreaView>
      <Result
        nombreempleado={nombreempleado}
        salariobase={salariobase}        
        salarioneto={salarioneto}
        errorMessage={errorMessage}
      />
      <Footer calculate={calculate} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
  },
  titleApp: {fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 15},
});
