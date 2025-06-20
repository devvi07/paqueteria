import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const BottomBarNav = ({ navigation }: any) => {

    const registrarSalida = () => navigation.navigate('NvaSalida');
    const logOut = () => navigation.navigate('Login');
    const goToHome = () => navigation.navigate('Home');
    const goToClientesRegister = () => navigation.navigate('ClientesRegister');
    
    return (
        <View style={[ styles.container, { /*bottom: insets.bottom*/ } ]}>
            <View style={[styles.innerContainer, { gap: 70 }]}>

                <TouchableOpacity onPress={ goToClientesRegister }>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="account-multiple-plus"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Clientes</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={ registrarSalida }>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="airplane-plus"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Crear salida</Text>
                    </View>
                </TouchableOpacity>

                {/*<TouchableOpacity>
                    <View style={{ alignItems: 'center', padding: 7 }}>
                        <Icon
                            source="cloud-sync"
                            color={'#004389'}
                            size={40}
                        />
                        <Text style={{ color: '#004389', fontWeight: '700' }}>Sincronizar</Text>
                    </View>
                </TouchableOpacity>*/}

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