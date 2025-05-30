import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const BottomBarNav = ({ navigation }: any) => {

    const addCliente = () => {

    }

    const registrarSalida = () => navigation.navigate('RegistrarSalida');
    const logOut = () => navigation.navigate('Login');

    const goToHome = () => navigation.navigate('Home');

    return (
        <View style={styles.container}>
            <View style={[styles.innerContainer, { gap: 50 }]}>

                <TouchableOpacity onPress={ registrarSalida }>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="airplane-plus"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Agregar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="cloud-sync"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Sincronizar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={ logOut }>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="logout"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Salir</Text>
                    </View>
                </TouchableOpacity>


            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent'
    },
    innerContainer: {
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10
    },
});