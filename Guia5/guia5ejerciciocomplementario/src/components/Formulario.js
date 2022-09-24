import { Picker } from '@react-native-picker/picker';
import React,{useState} from 'react';
import { Text,StyleSheet,View,TextInput,Button,TouchableHighlight,Alert,ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import color from '../utils/color'

const Formulario=({reservas,setReservas, guardarMostrarForm, guardarReservasStorage})=>{
    //Variables para el formulario

    const [nombre, guardarNombre]=useState('');    
    const [cantidad, guardarCantidad]=useState('');
    const [fecha, guardarFecha]=useState('');
    const [hora, guardarHora]=useState('');    
    const[seccion,guardarSeccion]=useState('');

    const [isDatePickerVisible, setDatePickerVisibility]=useState(false);
    const [isTimePickerVisible, setTimePickerVisibility]=useState(false);

    //Actualizar estado del DatePicker
    const showDatePicker = ()=>{
        setDatePickerVisibility(true);
    }
    const hideDatePicker=() =>{
        setDatePickerVisibility(false);
    }

    //Actualizar estado del TimePicker

    const showTimePicker=()=>{
        setTimePickerVisibility(true);
    }
    const hideTimePicker=() => {
        setTimePickerVisibility(false);
    }

    const confirmarFecha= date =>{
        const opciones ={year:'numeric', month:'long',day:'2-digit'};
        guardarFecha(date.toLocaleDateString('es-ES',opciones));
        hideDatePicker();
    }

    const confirmarHora= hora=>{
        const opciones={hour:'2-digit', minute:'2-digit', hour12: true};
        guardarHora(hora.toLocaleTimeString('es-ES',opciones));        
        hideTimePicker();
    }

    const crearReserva =() =>{
        console.log(seccion);
        //Validar
        if(nombre.trim()==='' ||           
           cantidad.trim()==='' ||
           fecha.trim()==='' ||
           hora.trim()===''||
           seccion==null
        )
        {   
            mostrarAlerta();         
            return
        }else
        {
            
        }

        const reserva={ nombre,cantidad,fecha,hora,seccion};
        reserva.id=shortid.generate();
        console.log(reserva)

        //Actualizar citas
        const reservasNuevo=[...reservas,reserva];
        setReservas(reservasNuevo);
        //Trasladar la nueva cita al Storage
        guardarReservasStorage(JSON.stringify(reservasNuevo));

        //Ocultar Formulario.js
        guardarMostrarForm(false);
        //Resetear Formulario.js
        guardarNombre('');
        guardarCantidad('');
        guardarFecha('');
        guardarHora('');    
        guardarSeccion('');

    }

    const mostrarAlerta=()=>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            //Arreglo de Botones
            [{
                text:'OK',                
            },
        ]
        )
    }

    const styles=StyleSheet.create(
        {
            formulario:{
                backgroundColor:'#FFF',
                paddingHorizontal:20,
                paddingVertical:10,
                flex:1,
            },
            label:{
                fontWeigth:'bold',
                fontSize:18,
                marginTop:0,
            },
            input:{
                marginTop:10,
                height:50,
                borderColor:'#e1e1e1',
                borderWidth:1,
                borderStyle:'solid',
            },
            btnSubmit:{
                padding:10,
                backgroundColor:color.BUTTON_COLOR,
                marginVertical:10,
            },
            textoSubmit:{
                color:'#FFF',
                fontWeight:'bold',
                textAlign:'center',
                paddingVertical:8,
            },
            view:{
                marginBottom:15,
            }
        }
        
    )
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
          paddingVertical: 16,
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 0.8,                    
          paddingRight: 30,
          backgroundColor: color.PRIMARY_COLOR,
          color:'white',          
        },
      });

    return(
        <>
        <ScrollView style={styles.formulario}>
            <View style={styles.view}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input} onChangeText={texto=>guardarNombre(texto)} />
            </View>            
            <View style={styles.view}>
                <Text style={styles.label}>Cantidad de Personas:</Text>
                <TextInput style={styles.input} onChangeText={texto=>guardarCantidad(texto)} keyboardType='numeric' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Fecha:</Text>
                <TouchableHighlight  onPress={showDatePicker}>
                    <Text style={picketSelectStyles.inputAndroid}>Seleccionar Fecha</Text>
                </TouchableHighlight>
                <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale='es_ES'                
                headerTextIOS="Elige la Fecha"
                cancelTextIOS='Cancelar'
                confirmTextIOS='Confirmar'
                />
                <Text>{fecha}</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Hora:</Text>
                <TouchableHighlight  onPress={showTimePicker}>
                    <Text style={picketSelectStyles.inputAndroid}>Seleccionar Hora</Text>
                </TouchableHighlight>
                <DateTimePickerModal                
                isVisible={isTimePickerVisible}
                mode='time'
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale='es_ES'
                headerTextIOS="Elige una hora"
                cancelTextIOS='Cancelar'
                confirmTextIOS='Confirmar'
                />
                <Text>{hora}</Text>
            </View>
           <View style={styles.view}> 
                <Text style={styles.label}>Sección:</Text>
                <Picker
                style={picketSelectStyles.inputAndroid}
                selectedValue={seccion}
                onValueChange={(value)=>guardarSeccion(value)}
                >
                    <Picker.Item label='Selecciona la Sección' value={null}/>
                    <Picker.Item label='Fumadores' value={'Fumadores'}/>
                    <Picker.Item label='No Fumadores' value={'No Fumadores'}/>
                </Picker>
            </View>
            <View style={styles.view}>
                <TouchableHighlight onPress={()=>crearReserva()} style={styles.btnSubmit} >
                    <Text style={styles.textoSubmit}>Crear Reserva</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>        
        </>
    );

}

export default Formulario;