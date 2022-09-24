import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Result(props) {
  const {salarioneto, errorMessage, nombreempleado,salariobase} = props;
    //salarioneto &&(...) sirve para llamar las propiedades dentro de salarioneto
  return (
    <View style={styles.content}>
      {salarioneto && (
        <View style={styles.boxResult}>
          <Text style={styles.title}>Resumen del Salario</Text>
          <DataResult title="Nombre del Empleado:" value={`${nombreempleado}`} />
          <DataResult title="Salario Base:" value={`$${salariobase}`} />
          <DataResult title="Descuento del ISSS (3%) :" value={`$${salarioneto.newisss}`} />
          <DataResult title="Descuento del APF (4%):" value={`$${salarioneto.newafp}`} />
          <DataResult title="Descuento de la renta (5%):" value={`$${salarioneto.newrenta}`} />
          <DataResult
            title="Salario Neto:"
            value={`$${salarioneto.newsalarioneto}`}
          />
        </View>
      )}
      <View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
}

function DataResult(props) {
  const {title, value} = props;

  return (
    <View style={styles.value}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 45,
    marginTop:-40,
    
  },
  boxResult: {padding: 20},
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  value: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginBottom: 20,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
