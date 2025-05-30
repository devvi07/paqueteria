import React from 'react';
import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Card, FAB, Icon } from 'react-native-paper';
import { Header } from '../../components/header/Header';
import { BottomBarNav } from '../../components/bottomBarNav/BottomBarNav';

export const ClasificacionesScreen = ({ route, navigation }: any) => {

    const { destino, fecha } = route.params;
    const { width, height } = useWindowDimensions();

    const CAT_CLASIFICACIONES = [
        { id: 1, descripcion: 'FRIO', left: 80, img: require(`../../../assets/img/hielera.jpg`)},
        { id: 2, descripcion: 'SECO', left: 80, img: require(`../../../assets/img/cBasica.jpg`)},
        { id: 3, descripcion: 'MEDICAMENTO', left: 50, img: require(`../../../assets/img/pastillas.jpg`)},
        { id: 4, descripcion: 'PROHIBIDO', left: 50, img: require(`../../../assets/img/prohibido.png`)}
    ];

    const goToClientes = (clasif: string) => {
        navigation.navigate('VerClientes',{ destino: destino, fecha: fecha, clasif: clasif });
    }

    const Item = ({ item, index }: { item: any; index: number }): React.ReactElement => (
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <Card style={styles.card} onPress={()=>{ goToClientes(item.descripcion) }} >
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ }}>
                            <Image
                                source={item.img}
                                style={{ width: 90, height: 90, borderRadius: 5 }}
                            />
                        </View>

                        <View style={{ left: item.left }}>
                            <Text style={styles.value}>{`${item.descripcion}`}</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header />
            <View style={{ padding: 8, backgroundColor: '#F6F6F6' }}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#004389' }}>Clasificación</Text>
            </View>
            <FlatList
                data={CAT_CLASIFICACIONES}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
                keyExtractor={(item: any) => item.id}
            />
            <FAB
                icon="keyboard-backspace"
                style={styles.fab}
                onPress={()=>{
                    navigation.navigate('Home');
                }}
            />
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
        fontSize: 17,
        color: "#004389",
    },
    card: {
        backgroundColor: '#FFF',
        elevation: 3,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#DEDEDE',
        padding: 2
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#004389'
    },
});