import React,{useState} from 'react';
import { Text,StyleSheet,View,TextInput,Button,TouchableHighlight,Alert,ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import color from '../src/utils/color';

const Formulario=({citas,setCitas, guardarMostrarForm, guardarCitasStorage})=>{
    //Variables para el formulario

    const [paciente, guardarPaciente]=useState('');
    const [propietario, guardarPropietario]=useState('');
    const [telefono, guardarTelefono]=useState('');
    const [fecha, guardarFecha]=useState('');
    const [hora, guardarHora]=useState('');
    const [sintomas, guardarSintomas]=useState('');

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

    const crearNuevaCita =() =>{
        //Validar
        if(paciente.trim()==='' ||
           propietario.trim()==='' ||
           telefono.trim()==='' ||
           fecha.trim()==='' ||
           hora.trim()===''||
           sintomas.trim()===''
        )
        {   
            mostrarAlerta();         
            return
        }else
        {
            
        }

        const cita={ paciente,propietario,telefono,fecha,hora,sintomas};
        cita.id=shortid.generate();
        console.log(cita)

        //Actualizar citas
        const citasNuevo=[...citas,cita];
        setCitas(citasNuevo);
        //Trasladar la nueva cita al Storage
        guardarCitasStorage(JSON.stringify(citasNuevo));

        //Ocultar Formulario.js
        guardarMostrarForm(false);
        //Resetear Formulario.js
        guardarSintomas('');
        guardarPaciente('');
        guardarPropietario('');
        guardarFecha('');
        guardarHora('');
        guardarTelefono('');

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
                marginTop:20,
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
            }
        }
        
    )

    return(
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente</Text>
                <TextInput style={styles.input} onChangeText={texto=>guardarPaciente(texto)} />
            </View>
            <View>
                <Text style={styles.label}>Dueño</Text>
                <TextInput style={styles.input} onChangeText={texto=>guardarPropietario(texto)} />
            </View>
            <View>
                <Text style={styles.label}>Telefono Contacto:</Text>
                <TextInput style={styles.input} onChangeText={texto=>guardarTelefono(texto)} keyboardType='numeric' />
            </View>
            <View>
                <Text style={styles.label}>Fecha:</Text>
                <Button title='Seleccionar Fecha' onPress={showDatePicker} />
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
            <View>
                <Text style={styles.label}>Hora:</Text>
                <Button title='Seleccionar Hora' onPress={showTimePicker}/>
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
            <View>
                <Text style={styles.label}>Sintomas</Text>
                <TextInput 
                multiline
                style={styles.input}
                onChangeText={texto =>guardarSintomas(texto)} />                
            </View>
            <View>
                <TouchableHighlight onPress={()=>crearNuevaCita()} style={styles.btnSubmit} >
                    <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>        
        </>
    );

}

export default Formulario;