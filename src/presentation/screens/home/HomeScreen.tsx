import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { ActivityIndicator, Card } from 'react-native-paper'
import { BottomBarNav } from '../../components/bottomBarNav/BottomBarNav';
import { Header } from '../../components/header/Header';
import { useQuery } from '@realm/react';
import { SalidasModel } from '../../../core/models/SalidasModel';

export const HomeScreen = ({ route, navigation }: any) => {

    const SALIDAS_LOCAL = useQuery(SalidasModel);
    const [loading, setLoading] = useState(false);
    const { width, height } = useWindowDimensions();
    const [ salidas, setSalidas ] = useState([]);

    const goToClientes = (destino: string, fecha: string) => {
        //navigation.navigate('VerClientes',{ destino: destino, fecha: fecha });
        navigation.navigate('Clasificaciones',{ destino: destino, fecha: fecha });
    };

    const getSalidas = async() => {
        fetch("https://pqt-calva-ws.onrender.com/api/salidas",{
            method: "GET",
            redirect: "follow"
        }).then(async(response) => {
            const codigo = response.status;
            const data = await response.json();
            return { codigo, data };
        }).then((result) => {
            console.log(result)
            if(result.codigo == 200){
                setSalidas(result.data);
                setLoading(true);
            }
        }).catch((error) => {
            console.error(error)
        });
    };

    useEffect(() => {
        getSalidas();
    }, []);

    const Item = ({ item, index }: { item: any; index: number }): React.ReactElement => (
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
            <Card style={styles.card} onPress={()=>{ goToClientes(item.destino, item.fecha) }} >
                <Card.Content>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Destino: </Text>
                        <Text style={styles.value}>{`${item.destino}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Fecha: </Text>
                        <Text style={styles.value}>{`${item.fecha}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, { width: width * 0.23 }]}>Estatus: </Text>
                        <Text style={styles.value}>{`${item.status}`}</Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFF' }}>

            <Header />

            {
                loading ?
                <>
                {
                    salidas.length > 0 ?
                    <FlatList
                        data={salidas}
                        renderItem={({ item, index }) => <Item item={item} index={index} />}
                        keyExtractor={(item: any) => item._id}
                    /> :
                    <View style={{ marginTop: 200 }}>
                        <Text
                            style={{
                                color: '#004389',
                                fontWeight: '800',
                                textAlign: 'center',
                                fontSize: 16
                            }}
                        >
                            No existen salidas registradas.
                        </Text>
                    </View>
                }
                </>:
                <View style={{ alignContent: 'center', marginTop: 150 }}>
                    <ActivityIndicator animating={true} color={'#004389'} size={50} />
                </View>
            }

            <BottomBarNav navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
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
        elevation: 3,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#DEDEDE',
        padding: 6
    }
});