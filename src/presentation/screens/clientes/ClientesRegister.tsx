import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/header/Header';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { ModalAceptarConfirmar } from '../../components/modals/ModalAceptarConfirmar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const ClientesRegister = ({ route, navigation }: any) => {

    const insets = useSafeAreaInsets();

    const [ loading, setLoading ] = useState(true);

    const [numero, setNumero] = useState('');
    const [nombre, setNombre] = useState('');
    const [nombreRecibe, setNombreRecibe] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccionRecibe, setDireccionRecibe] = useState('');
    const [tel, setTel] = useState('');
    const [telRecibe, setTelRecibe] = useState('');
    const [zona, setZona] = useState('');

    const [visibleModal, setVisibleModal] = useState(false);
    const [message, setMessage] = useState('');
    const [acept, setAcept] = useState(0);
    const showAlert = () => setVisibleModal(true);
    const toggleModal = () => setVisibleModal(false);

    const createCliente = async (cliente: any) => {
        setLoading(false);
        console.log("🚀 ~ createCliente ~ cliente:", cliente)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("https://pqt-calva-ws.onrender.com/api/cliente", {
            method: "POST",
            headers: myHeaders,
            body: cliente,
            redirect: "follow"
        }).then(async (response) => {
            const codigo = response.status;
            const texto = await response.text();
            return { codigo, texto };
        }).then((result) => {
            console.log(result);
            if (result.codigo == 201) {
                setAcept(1);
                setMessage('¡Cliente registrado exitosamente!');
                setLoading(true);
                showAlert();
            }
        }).catch((error) => {
            console.error(error)
        });

    }

    const handleAceptar = () => {
        toggleModal();
        if (acept == 1) {
            console.log('¡Cliente agregado correctamente!');
            resetCliente();
            navigation.navigate('VerClientes');
        }

    }

    const resetCliente = () => {
        setNumero('');
        setZona('');
        setNombre('');
        setDireccion('');
        setTel('');
        setNombreRecibe('');
        setDireccionRecibe('');
        setTelRecibe('');
    }

    const addCliente = () => {

        console.log('addCliente');

        if (
            numero.length == 0 ||
            zona.length == 0 ||
            nombre.length == 0 ||
            direccion.length == 0 ||
            tel.length == 0 ||
            nombreRecibe.length == 0 ||
            direccionRecibe.length == 0 ||
            telRecibe.length == 0

        ) {
            setMessage('¡Todos los campos son necesarios!');
            showAlert();
            return;
        }

        const cliente = JSON.stringify({
            "numero": numero.trim(),
            "zona": zona.trim(),
            "nombre": nombre.trim(),
            "direccion": direccion.trim(),
            "tel": tel.trim(),
            "nombreRecibe": nombreRecibe.trim(),
            "direccionRecibe": direccionRecibe.trim(),
            "telRecibe": telRecibe.trim(),
            "descPaquete": 'NA',
            "clasificacion": 'NA',
            "destino": 'NA',
            "fotos": '',
            "status": 'NA'
        });

        createCliente(cliente);

    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}} edges={['top', 'bottom']}>

            <View style={[ styles.main ]}>
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

                        <View style={[ styles.container ]}>
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>Registro de clientes</Text>
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

                            <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 25 }}>
                                <Button
                                    icon="account-check"
                                    mode="contained"
                                    onPress={addCliente}
                                    buttonColor='#004389'
                                    labelStyle={{ color: '#FFF' }}
                                    style={{ borderRadius: 7 }}
                                >
                                    Registrar
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

                </KeyboardAvoidingView>
                :<View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
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