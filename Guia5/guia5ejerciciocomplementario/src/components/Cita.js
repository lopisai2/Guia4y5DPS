import React from 'react';
import { Text,StyleSheet,View,TouchableHighlight } from 'react-native';

const styles=StyleSheet.create({
    cita:{
        backgroundColor:'#FFF',
        borderBottomColor:'#e1e1e1',
        borderStyle:'solid',
        borderBottomWidth:1,
        paddingVertical:20,
        paddingHorizontal:10,
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20,
    },
    texto:{
        fontSize:18,
    },
    btnEliminar:{
        padding:10,
        backgroundColor:'red',
        marginVertical:10,
    },
    textoEliminar:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center',
    }
})


const Cita=({item,eliminarPaciente})=>{

    const dialogoEliminar = id =>{
        console.log('eliminando...',id);
        eliminarPaciente(id);
    }
    return(
        <View style={styles.cita}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.texto}>{item.nombre}</Text>
            <View>
                <Text style={styles.label}>Cantidad de Personas</Text>
                <Text style={styles.texto}>{item.cantidad}</Text>
            </View>
            <View>
                <Text style={styles.label}>Seccion:</Text>
                <Text style={styles.texto}>{item.seccion}</Text>
            </View>            
            <View>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.texto}>{item.fecha}</Text>
            </View>            
            <View>
                <Text style={styles.label}>Hora:</Text>
                <Text style={styles.texto}>{item.hora}</Text>
            </View>            
            <TouchableHighlight style={styles.btnEliminar} onPress={()=>dialogoEliminar(item.id)}>
                <Text style={styles.textoEliminar}>Eliminar &times;</Text>
            </TouchableHighlight>
        </View>
        )
}


export default Cita;