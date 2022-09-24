import React,{useState, useEffect} from 'react';
import { Text, StyleSheet,View,FlatList,TouchableWithoutFeedback, Keyboard, Platform, TouchableHighlight } from 'react-native';
import Cita from './src/components/Cita'
import Formulario from './src/components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from './src/utils/color';

const App=()=>{
  //Definir el state de citas
  const [reservas,setReservas]=useState([]);
  const [mostrarForm,guardarMostrarForm]=useState(false)
  useEffect(()=>{
    const obtenerReservaStorage =async() =>{
      try{
        const reservasStorage= await AsyncStorage.getItem('reservas');
        if(reservasStorage)
        {
          setReservas(JSON.parse(reservasStorage))
        }
      }catch (error)
        {
          console.log(error);
        }
      }
        obtenerReservaStorage();
    },[]);

    const eliminarPaciente=id=>{

      const reservasFiltradas=reservas.filter(reserva=>reserva.id!==id);
      setReservas(reservasFiltradas);
      guardarReservasStorage(JSON.stringify(reservasFiltradas));
    }

    const mostrarFormulario =()=>{
      guardarMostrarForm(!mostrarForm);
    }

    //Para ocultar el teclado
    const cerrarTeclado=()=>{
      Keyboard.dismiss();
    }
    //Guardar las reservas en el Storage
    const guardarReservasStorage =async(reservaJSON)=>{
      try{
        await AsyncStorage.setItem('reservas',reservaJSON);
      }
      catch(error){
        console.log(error);
      }
    }
    const styles=StyleSheet.create({
      contenedor:{
        backgroundColor:Colors.PRIMARY_COLOR,
        flex:1
      },
      titulo:{
        color:'#FFF',
        marginTop:Platform.OS==='ios' ? 40:30,        
        marginBottom:20,
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
      },
      contenido:{
        flex:1,
        //*
        marginHorizontal:'2.5%',
      },
      listado:{
        flex:1,
      },
      btnMostrarForm:{
        padding:10,
        backgroundColor:Colors.BUTTON_COLOR,
        marginVertical:10,
      },
      textoMostrarForm:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center',
      }
    });

    return(
      <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Administrador de Reservas de un Restaurante</Text>          
          <View>
            <TouchableHighlight onPress={()=>mostrarFormulario()} style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Reserva':'Crear Reserva'}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
              <Text style={styles.titulo}>Crear Reserva del Restaurante</Text>
              <Formulario 
                reservas={reservas}
                setReservas={setReservas}
                guardarMostrarForm={guardarMostrarForm}
                guardarReservasStorage={guardarReservasStorage}
              />
              </>
            ): (
              <>
              <Text style={styles.titulo}>{reservas.length>0 ? 'Administrar tus Reservas' :'No hay reservas, añade una'}</Text>
              <FlatList 
                style={styles.listado}
                data={reservas}
                renderItem={({item})=> <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                keyExtractor={cita=>cita.id}
              />
              </>   
            )}  
          </View>

        </View>
        
      </TouchableWithoutFeedback>
    )



  }

export default App;

