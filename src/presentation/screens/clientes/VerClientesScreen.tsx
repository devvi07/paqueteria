import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Header } from '../../components/header/Header';
import { ClientesModel } from '../../../core/models/ClientesModel';
import { useQuery } from '@realm/react';
import { Appbar, Button, Card, Checkbox, FAB, List, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useClientesLocal } from '../../../hooks/database/clientes/useClientesLocal';

const Item = ({ item, index, itemActivo, toggleTarjeta, setItemActivo, width, clasif, updateCliente }: any): React.ReactElement => (
    <Card style={[styles.card, { backgroundColor: item.status === 'Entregado' ? '#ebfbd8' : '#FFF' }]} >

        <Card.Content>

            <View style={{ flexDirection: 'row' }}>

                <View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Envia: </Text>
                        <Text style={styles.value}>{`${item.nombre} ${item.apellidos}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Teléfono: </Text>
                        <Text style={styles.value}>{`${item.tel}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Paquete: </Text>
                        <Text style={styles.value}>{`${item.descripcionPaquete}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Estatus: </Text>
                        <Text style={styles.value}>{`${item.status}`}</Text>
                    </View>

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
                    <View style={{ flex: 1, backgroundColor: '#F6F6F6', borderRadius: 5, paddingTop: 16 }}>

                        <View style={{ marginHorizontal: 16 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Recibe: </Text>
                                <Text style={styles.value}>{`${item.nombreRecibe} ${item.apellidosRecibe}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Teléfono: </Text>
                                <Text style={styles.value}>{`${item.telRecibe}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Dirección: </Text>
                                <Text style={styles.value}>{`${item.direccionRecibe}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.label, { width: width * 0.23 }]}>Municipio/Condado: </Text>
                                <Text style={styles.value}>{`${item.municipioRecibe}`}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
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
                            </View>
                        </View>

                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#004389' }}>
                            {`\nFoto(s) \n`}
                        </Text>

                        <View>
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

                        </View>

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

    const { destino, fecha, clasif } = route.params;
    const { width, height } = useWindowDimensions();
    const CLIENTES_LOCAL = useQuery(ClientesModel);
    const { updateCliente } = useClientesLocal();
    const [itemActivo, setItemActivo] = useState<number | null>(null);
    const [clientes, setClientes] = useState([]);
    const [oClienteAux, setOclienteAux] = useState<any>([]);

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
                    item.status.toLowerCase().includes(text.toLowerCase())
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
        navigation.navigate('AddCliente', { destino: destino, fecha: fecha, clasif: clasif });
    }

    const goToClasificaciones = () => {
        navigation.navigate('Clasificaciones', { destino: destino, fecha: fecha });
    }

    const getClientes = (clasificacion: string) => {
        const filtrados = CLIENTES_LOCAL.filtered('clasificacion == $0', clasificacion);
        return Array.from(filtrados);
    }

    useEffect(() => {
        if (CLIENTES_LOCAL.length > 0) {
            const oClientes: any = getClientes(clasif);
            setClientes(oClientes);
            setOclienteAux(oClientes)
        } else {
            setClientes([]);
        }

    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header />

            {
                clientes.length > 0 ?
                    <View style={{ flex: 1, marginHorizontal: 16 }}>

                        <Appbar.Header style={{ backgroundColor: '#F6F6F6', height: 50, borderRadius: 10 }}>
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
                                <View style={{ marginTop: 14 }}>
                                    <Item
                                        item={item}
                                        index={index}
                                        itemActivo={itemActivo}
                                        toggleTarjeta={toggleTarjeta}
                                        setItemActivo={setItemActivo}
                                        width={width}
                                        clasif={clasif}
                                        updateCliente={updateCliente}
                                    />
                                </View>
                            }
                            keyExtractor={(item: any) => item._id}
                        />
                        <FAB
                            icon="account-plus"
                            style={styles.fab}
                            onPress={goToAddClientes}
                        />
                        <FAB
                            icon="keyboard-backspace"
                            style={styles.fabLeft}
                            onPress={goToClasificaciones}
                        />
                    </View>
                    : <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 200 }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#004389' }}>No existen clientes para esta salida</Text>
                        </View>
                        <FAB
                            icon="account-plus"
                            style={styles.fab}
                            onPress={goToAddClientes}
                        />
                        <FAB
                            icon="keyboard-backspace"
                            style={styles.fabLeft}
                            onPress={goToClasificaciones}
                        />
                    </View>
            }

        </View>
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