import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Header } from '../../components/header/Header';
import { ClientesModel } from '../../../core/models/ClientesModel';
import { useQuery } from '@realm/react';
import { ActivityIndicator, Appbar, Button, Card, Checkbox, FAB, List, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useClientesLocal } from '../../../hooks/database/clientes/useClientesLocal';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomBarNav } from '../../components/bottomBarNav/BottomBarNav';
import { useIsFocused } from '@react-navigation/native';
import { disableBack } from '../utils/Utils';

const Item = ({ item, index, itemActivo, toggleTarjeta, setItemActivo, width, /*clasif,*/ updateCliente, navigation }: any): React.ReactElement => (
    <Card style={[styles.card, { backgroundColor: item.status === 'Entregado' ? '#ebfbd8' : '#FFF' }]} >

        <Card.Content>

            <View style={{ flexDirection: 'row' }}>

                <View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Número: </Text>
                        <Text style={styles.value}>{`${item.numero}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Envia: </Text>
                        <Text style={styles.value}>{`${item.nombre}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Dirección: </Text>
                        <Text style={styles.value}>{`${item.direccion}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Teléfono: </Text>
                        <Text style={styles.value}>{`${item.tel}`}</Text>
                    </View>

                    {/*<View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Paquete: </Text>
                        <Text style={styles.value}>{`${item.descripcionPaquete}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Estatus: </Text>
                        <Text style={styles.value}>{`${item.status}`}</Text>
                    </View>*/}

                </View>

            </View>

            <View style={{ left: width * 0.77, top: -50 }} >
                <TextInput.Icon
                    icon={itemActivo === index ? 'chevron-up-circle' : 'chevron-right-circle'}
                    size={27}
                    color={itemActivo === index ? '#004389' : '#707070'}
                    onPress={() => {
                        toggleTarjeta(index);
                    }}
                />
            </View>

            {
                (itemActivo === index) &&
                <View style={{ paddingTop: 10 }} >
                    <View style={{ flex: 1, backgroundColor: '#F6F6F6', borderRadius: 5, paddingTop: 16, paddingBottom: 16 }}>

                        <View style={{ marginHorizontal: 16 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Recibe: </Text>
                                <Text style={styles.value}>{`${item.nombreRecibe}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Teléfono: </Text>
                                <Text style={styles.value}>{`${item.telRecibe}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Dirección: </Text>
                                <Text style={styles.value}>{`${item.direccionRecibe}`}</Text>
                            </View>

                            <View style={{ marginTop: 15, marginHorizontal: 40 }}>
                                <Button 
                                    icon="gift" 
                                    mode="contained" 
                                    onPress={() => {
                                        navigation.navigate('AddPaquete', { item: item });
                                    }}
                                    style={{ borderRadius: 10 }}
                                    buttonColor='#004389'
                                    textColor='#FFF'
                                >
                                    Agregar paquete
                                </Button>
                            </View>

                            {/*<View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Municipio/Condado: </Text>
                                <Text style={styles.value}>{`${item.municipioRecibe}`}</Text>
                            </View>*/}

                            {/*<View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.2 }]}>Entregado: </Text>
                                <View style={{ top: -7 }}>
                                    <Checkbox
                                        status={item.status == 'Entregado' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            console.log('Marcar como entregado');
                                            const oPhotos = [];

                                            for (const photo of item.fotos) {
                                                oPhotos.push({
                                                    _id: photo._id,
                                                    url: photo.url,
                                                    uri: photo.uri,
                                                    type: photo.type,
                                                    namePhoto: photo.namePhoto,
                                                    descripcion: photo.descripcion,
                                                })
                                            }

                                            const oCliente: any = [{
                                                _id: item._id,
                                                nombre: item.nombre,
                                                apellidos: item.apellidos,
                                                direccion: item.direccion,
                                                municipio: item.municipio,
                                                tel: item.tel,
                                                destino: item.destino,
                                                fecha: item.fecha,
                                                descripcionPaquete: item.descripcionPaquete,
                                                fotos: oPhotos,
                                                nombreRecibe: item.nombreRecibe,
                                                apellidosRecibe: item.apellidosRecibe,
                                                direccionRecibe: item.direccionRecibe,
                                                telRecibe: item.telRecibe,
                                                municipioRecibe: item.municipioRecibe,
                                                clasificacion: clasif,
                                                status: 'Entregado'
                                            }];
                                            console.log("🚀 ~ oCliente:", oCliente)
                                            const doUpdate = updateCliente(oCliente);
                                            setItemActivo(null);
                                            console.log("🚀 ~ onPress={async ~ doUpdate:", doUpdate);
                                        }}
                                        disabled={item.status == 'Entregado'}
                                        color='#004389'
                                    />
                                </View>
                            </View>*/}

                        </View>

                        {/*<Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#004389' }}>
                            {`\nFoto(s) \n`}
                        </Text>*/}

                        {/*<View>
                            {
                                item.fotos.map((val: any, index: number) => (
                                    <View key={index.toString()} style={{ alignItems: 'center', marginBottom: 20 }}>
                                        <TouchableOpacity>
                                            <FastImage
                                                style={{ width: 250, height: 200, borderRadius: 10 }}
                                                source={{
                                                    uri: `${val.uri}`,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            <Text style={{ color: '#004389', fontWeight: '700', fontSize: 16, textAlign: 'center' }}>{val.descripcion}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))

                            }

                        </View>*/}

                    </View>
                </View>
            }

        </Card.Content>

    </Card>
);

export default React.memo(Item, (prevProps, nextProps) => {
    return (
        prevProps.item === nextProps.item &&
        prevProps.index === nextProps.index &&
        prevProps.itemActivo === nextProps.itemActivo
    );
});

export const VerClientesScreen = ({ route, navigation }: any) => {

    const isFocused = useIsFocused();
    const isAndroid15 = Platform.OS === 'android' && Platform.Version >= 34;
    console.log("🚀 ~ VerClientesScreen ~ isAndroid15:", isAndroid15)

    //const { destino, fecha, clasif } = route.params;
    const { width, height } = useWindowDimensions();
    const CLIENTES_LOCAL = useQuery(ClientesModel);
    const { updateCliente } = useClientesLocal();
    const [itemActivo, setItemActivo] = useState<number | null>(null);
    const [clientes, setClientes] = useState([]);
    const [oClienteAux, setOclienteAux] = useState<any>([]);

    const [loading, setLoading] = useState(false);

    const [modoBusqueda, setModoBusqueda] = useState(false);
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const _handleSearch = () => setModoBusqueda(true);

    const _handleCloseSearch = () => {
        setModoBusqueda(false);
        setTextoBusqueda('');
        setClientes(oClienteAux); // Limpia el filtro al cerrar
    };

    const _onChangeText = (text: string) => {
        setTextoBusqueda(text);
        onSearchCte(text);
    };

    const onSearchCte = (text: string) => {

        if (text.length > 0) {

            const result = oClienteAux.filter((item: any) => {

                if (
                    item.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    //item.status.toLowerCase().includes(text.toLowerCase()) ||
                    item.numero.toLowerCase().includes(text.toLowerCase())
                ) {
                    return item;
                }

            });

            setClientes(result);

        } else {
            setClientes(oClienteAux);
        }
    };

    const toggleTarjeta = (index: number) => setItemActivo(prev => (prev === index ? null : index));

    const goToAddClientes = () => {
        //navigation.navigate('AddCliente', { destino: destino, fecha: fecha, clasif: clasif });
        navigation.navigate('AddCliente');
    }

    const goToClasificaciones = () => {
        navigation.navigate('Clasificaciones');
        //navigation.navigate('Clasificaciones', { destino: destino, fecha: fecha });
    }

    /*const getClientes = (clasificacion: string) => {
        const filtrados = CLIENTES_LOCAL.filtered('clasificacion == $0', clasificacion);
        return Array.from(filtrados);
    }*/

    const getClientes = async () => {
        console.log("🚀 ~ getClientes ~ getClientes:")
        fetch("https://pqt-calva-ws.onrender.com/api/cliente", {
            method: "GET",
            redirect: "follow"
        }).then(async (response) => {
            const codigo = response.status;
            const data = await response.json();
            return { codigo, data };
        }).then((result) => {
            console.log(result)
            if (result.codigo == 200) {
                console.log("🚀 ~ getClientes ~ result.data:", result.data)
                setClientes(result.data);
                setOclienteAux(result.data);
                setLoading(true);
            }

        }).catch((error) => {
            console.error(error)
        });
    };

    useEffect(() => {
        disableBack();
        getClientes();
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header />

                {
                    loading ?
                    <>
                    {
                        clientes.length > 0 ?
                        <View style={{ flex: 1, marginHorizontal: 16 }}>

                            <Appbar.Header
                                style={{
                                    backgroundColor: '#F6F6F6',
                                    height: 50,
                                    borderRadius: 10,
                                }}
                                statusBarHeight={0}
                            >
                                {modoBusqueda ? (
                                <>
                                <Appbar.Action icon="close" color='#004389' onPress={_handleCloseSearch} />
                                    <TextInput
                                        placeholder="Buscar cliente"
                                        placeholderTextColor={"#004389"}
                                        value={textoBusqueda}
                                        onChangeText={_onChangeText}
                                        style={{ flex: 1, backgroundColor: 'transparent' }}
                                        underlineColor="transparent"
                                        activeUnderlineColor="#004389"
                                        autoFocus
                                        textColor='#000'
                                        onSubmitEditing={() => {
                                            console.log('activo la busqueda');
                                        }}
                                    />
                                </>
                                ) : (
                                <>
                                <Appbar.Content
                                    title="            Buscar cliente"
                                    titleStyle={{
                                        fontSize: 17,
                                        textAlign: 'center',
                                        color: '#004389'
                                    }}
                                    style={{ backgroundColor: '#F6F6F6' }}
                                />
                                    <Appbar.Action icon="magnify" color='#004389' onPress={_handleSearch} />
                                </>
                                )}
                            </Appbar.Header>

                            <FlatList
                                data={clientes}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginTop: 10 }}>
                                        <Item
                                            item={item}
                                            index={index}
                                            itemActivo={itemActivo}
                                            toggleTarjeta={toggleTarjeta}
                                            setItemActivo={setItemActivo}
                                            width={width}
                                            //clasif={clasif}
                                            updateCliente={updateCliente}
                                            navigation={navigation}
                                        />
                                    </View>
                                }
                                keyExtractor={(item: any) => item._id}
                                style={{ flex: 1, marginBottom: 100 }}
                            />

                        </View>:
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 250 }}>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#004389' }}>No existen clientes registrados.</Text>
                            </View>
                        </View>
                    }

                    <BottomBarNav navigation={navigation} />
                    </> :
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                        <ActivityIndicator animating={true} color={'#004389'} size={50} />
                    </View>
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#4CAF50',

    },
    fabLeft: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        backgroundColor: '#004389',
    },
    label: {
        fontSize: 15,
        color: "#333",
    },
    value: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#4B4B4B",
    },
    card: {
        backgroundColor: '#FFF',
        elevation: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        padding: 4,
        shadowColor: 'transparent'
    }
});