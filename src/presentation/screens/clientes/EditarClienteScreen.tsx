import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/header/Header';
import { ModalAceptarConfirmar } from '../../components/modals/ModalAceptarConfirmar';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

export const EditarClienteScreen = ({ route, navigation }: any) => {

    const { item } = route.params;

    const [ loading, setLoading ] = useState(true);
    const [ numero, setNumero ] = useState(item.numero);
    const [ zona, setZona ] = useState(item.zona);
    const [ nombre, setNombre ] = useState(item.nombre);
    const [ direccion, setDireccion ] = useState(item.direccion);
    const [ tel, setTel ] = useState(item.tel);
    const [ nombreRecibe, setNombreRecibe ] = useState(item.nombreRecibe);
    const [ direccionRecibe, setDireccionRecibe ] = useState(item.direccionRecibe);
    const [ telRecibe, setTelRecibe ] = useState(item.telRecibe);

    const [visibleModal, setVisibleModal] = useState(false);
    const [message, setMessage] = useState('');
    const [acept, setAcept] = useState(0);
    const showAlert = () => setVisibleModal(true);
    const toggleModal = () => setVisibleModal(false);

    const handleAceptar = () => {
        toggleModal();
        if (acept == 1) {
            console.log('¡Cliente actualizado correctamente!');
            navigation.navigate('VerClientes');
        }

    }

    const updateCliente = async() => {
        const cliente = { 
            "numero": numero.trim(),
            "zona": zona.trim(),
            "nombre": nombre.trim(),
            "direccion": direccion.trim(),
            "tel": tel.trim(),
            "nombreRecibe": nombreRecibe.trim(),
            "direccionRecibe": direccionRecibe.trim(),
            "telRecibe": telRecibe.trim(),
        };

        setLoading(false);
        const response = await fetch(`https://pqt-calva-ws.onrender.com/api/cliente/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        console.log("🚀 ~ addPaquete ~ data:", data)
        if(data){
            setAcept(1);
            setLoading(true);
            setMessage('¡Cliente actualizado correctamente!');
            showAlert();
        }
    }

    const invierteCliente = async() => {

        const cliente = { 
            "numero": numero.trim(),
            "zona": zona.trim(),
            "nombre": nombreRecibe.trim(),
            "direccion": direccionRecibe.trim(),
            "tel": telRecibe.trim(),
            "nombreRecibe": nombre.trim(),
            "direccionRecibe": direccion.trim(),
            "telRecibe": tel.trim(),
        };

        setLoading(false);
        const response = await fetch(`https://pqt-calva-ws.onrender.com/api/cliente/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        console.log("🚀 ~ addPaquete ~ data:", data);
        setLoading(true);
        if(data){
            setAcept(1);
            setLoading(true);
            setMessage('¡Cliente actualizado correctamente!');    
            showAlert();
        }
    }

    useEffect(()=>{
        console.log('CLIENTE A EDITAR -> ', item);
    },[]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header />

                {
                    loading ?
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // ajusta según tu header
                    >

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >

                            <View style={[styles.container]}>
                                
                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>Editar cliente</Text>
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16, flexDirection: 'row', gap: 40, justifyContent: 'center' }}>
                                        
                                    <View style={{ width: '45%' }}>
                                        <TextInput
                                            label="Número"
                                            value={numero}
                                            onChangeText={text => setNumero(text)}
                                            theme={{ colors: { primary: '#004389' } }}
                                            style={styles.input}
                                            textColor='#000'
                                            keyboardType='numeric'
                                        />
                                    </View>

                                    <View style={{ width: '45%' }}>
                                        <TextInput
                                            label="Zona"
                                            value={zona}
                                            onChangeText={text => setZona(text)}
                                            theme={{ colors: { primary: '#004389' } }}
                                            style={styles.input}
                                            textColor='#000'
                                            keyboardType='numeric'
                                        />
                                    </View>
                                </View>

                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>Persona que envia</Text>
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Nombre"
                                        value={nombre}
                                        onChangeText={text => setNombre(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Dirección"
                                        value={direccion}
                                        onChangeText={text => setDireccion(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Teléfono"
                                        value={tel}
                                        onChangeText={text => setTel(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                        keyboardType='phone-pad'
                                    />
                                </View>

                                {/** PERSONA QUE RECIBE*/}
                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>Persona que recibe</Text>
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Nombre"
                                        value={nombreRecibe}
                                        onChangeText={text => setNombreRecibe(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Dirección"
                                        value={direccionRecibe}
                                        onChangeText={text => setDireccionRecibe(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Teléfono"
                                        value={telRecibe}
                                        onChangeText={text => setTelRecibe(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                        keyboardType='phone-pad'
                                    />
                                </View>

                                <View style={{ marginHorizontal: 20, marginTop: 25 }}>
                                    <Button
                                        icon="account-switch"
                                        mode="contained"
                                        onPress={invierteCliente}
                                        buttonColor='#FF6600'
                                        labelStyle={{ color: '#FFF' }}
                                        style={{ borderRadius: 7 }}
                                    >
                                        Invertir personas
                                    </Button>
                                </View>

                                <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 25 }}>

                                    <Button
                                        icon="update"
                                        mode="contained"
                                        onPress={updateCliente}
                                        buttonColor='#004389'
                                        labelStyle={{ color: '#FFF' }}
                                        style={{ borderRadius: 7 }}
                                    >
                                        Actualizar
                                    </Button>

                                    <View style={{ marginTop: 10 }}>
                                        <Button
                                            icon="account-cancel"
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

                        </ScrollView>

                    </KeyboardAvoidingView>:
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                        <ActivityIndicator animating={true} color={'#004389'} size={50} />
                    </View>
                }
                
                <ModalAceptarConfirmar
                    title={message}
                    visible={visibleModal}
                    hideModal={toggleModal}
                    aceptarFN={handleAceptar}
                />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 16,
        marginTop: 10,
        //marginBottom: 10,
        borderRadius: 10
    },
    title: {
        color: '#004389',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    containerTitle: {
        marginTop: 16
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#004389'
    }
});