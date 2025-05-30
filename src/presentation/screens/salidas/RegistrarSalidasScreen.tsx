import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Icon, List, TextInput } from 'react-native-paper';
import { Header } from '../../components/header/Header';
import { useSalidasLocal } from '../../../hooks/database/salidas/useSalidasLocal';
import { Calendar } from 'react-native-calendars';
import { ModalAceptarConfirmar } from '../../components/modals/ModalAceptarConfirmar';

export const RegistrarSalidasScreen = ({ route, navigation }: any) => {

    const { insertSalida } = useSalidasLocal();
    const [ showSelect, setShowSelect ] = useState(false);
    const [ txtSelect, setTxtSelect ] = useState('Selecciona destino');
    const [ txtSelectFecha, setTxtSelectFecha ] = useState('Selecciona fecha');
    const [ showSelectFecha, setShowSelectFecha ] = useState(false);

    
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ acept, setAcept ] = useState(0);
    const showAlert = () => setVisibleModal(true);
    const toggleModal = () => setVisibleModal(false);
    
    const handleAceptar = () => {
        toggleModal();
        if(acept==1)
            navigation.navigate('Home');
    }
    
    const CAT_SALIDAS = [
        { id: 1, descripcion: 'Nueva York'},
        { id: 2, descripcion: 'Denver'},
        { id: 3, descripcion: 'Los Angeles'},
        { id: 4, descripcion: 'San Diego'},
        { id: 5, descripcion: 'México'}
    ];

    const toggleSelect = () => setShowSelect(!showSelect);
    const toggleSelectFecha = () => setShowSelectFecha(!showSelectFecha);

    const addSalida = async () => {

        if(txtSelect == 'Selecciona destino' || txtSelectFecha == 'Selecciona fecha'){
            setAcept(0);
            setMessage('¡Selecciona destino/fecha!');
            showAlert();
            return;
        }


        const salida: any = [{
            _id: Date.now().toString(),
            destino:txtSelect,
            fecha: txtSelectFecha,
            status: 'Pendiente'
        }];

        const doSalida = await insertSalida(salida);
        console.log("🚀 ~ addSalida ~ doSalida:", doSalida)
        if(doSalida == 1){
            setAcept(doSalida);
            setMessage('¡Registro exitoso!');
            showAlert();
        }else{
            setAcept(0);
            setMessage('¡Registro erróneo!');
            showAlert();
            return;
        }
    };

    const renderOption = ({ id, descripcion }: any) => (
        <List.Item
            onPress={() =>{
                setTxtSelect(descripcion); 
                toggleSelect();
            }}
            key={id}
            title={() => (<Text>  {descripcion}</Text>)}
            style={{ backgroundColor: '#FFF' }}
            rippleColor="rgba(0, 0, 0, 0.1)"
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFF' }}>
            <Header />

            <View 
                style={{ 
                    marginHorizontal: 20, 
                    marginTop: 20, backgroundColor: '#F6F6F6', borderRadius: 10, padding: 16, flex: 1, marginBottom: 20 }}>
                <Text style={{ textAlign: 'center', color: '#004389', fontSize: 16, fontWeight: '600' }}>Registrar salida</Text>

                <View style={{ marginTop: 16 }}>

                    <Button
                        mode="contained"
                        onPress={toggleSelect}
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ flex: 1, textAlign: 'left' }}
                        icon={() => <Icon source="chevron-down" size={25} color={'#232322'} />}
                        style={{ height: 48, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}
                        textColor='#232322'
                    >
                        {txtSelect}
                    </Button>
                    { showSelect &&  CAT_SALIDAS.map(renderOption) }
                </View>

                <View style={{ marginTop: 16 }}>
                    <Button
                        mode="contained"
                        onPress={toggleSelectFecha}
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ flex: 1, textAlign: 'left' }}
                        icon={() => <Icon source="chevron-down" size={25} color={'#232322'} />}
                        style={{ height: 48, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}
                        textColor='#232322'
                    >
                        {txtSelectFecha}
                    </Button>

                    {
                        showSelectFecha &&
                        <Calendar
                            onDayPress={day => {
                                console.log('selected day', day);
                                console.log('day.month', day.month);
                                const dia = day.day < 10 ? `0${day.day}` : day.day;
                                const month = day.month < 10 ? `0${day.month}` : day.month;
                                const fecha = `${dia}/${month}/${day.year}`;
                                console.log('fecha: ' + fecha);
                                setTxtSelectFecha(fecha);
                                setShowSelectFecha(false);

                                /*console.log('getCurrentDateDDMMYYYY', getCurrentDateDDMMYYYY());
                                setFechaConsulta(fecha);
                                setShowCalendar(false);
                                getPagosByCobrador(fecha);*/
                            }}
                        />
                    }

                    
                </View>

                <View style={{ marginHorizontal: 20, bottom: 40, position: 'absolute', width: '100%' }}>
                    <Button
                        mode="contained"
                        onPress={addSalida}
                        buttonColor='#004389'
                        labelStyle={{ color: '#FFF' }}
                        style={{ borderRadius: 7 }}
                    >
                        Registrar
                    </Button>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            mode="contained"
                            onPress={() => { navigation.goBack(); }}
                            buttonColor='#C62828'
                            labelStyle={{ color: '#FFF' }}
                            style={{ borderRadius: 7 }}
                        >
                            Cancelar
                        </Button>
                    </View>

                </View>

            </View>

            <ModalAceptarConfirmar
                title={message}
                visible={visibleModal}
                hideModal={toggleModal}
                aceptarFN={handleAceptar}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    inputs: {
        height: 48,
        backgroundColor: '#FFF',
        borderColor: '#D6D6D6',
        borderRadius: 7,
    },
    txtDay: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700'
    }
});