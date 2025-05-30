import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';

export const ModalAceptarConfirmar = ({ title, visible, hideModal, aceptarFN }: any) => {

    const containerStyle = {
        backgroundColor: '#F6F6F6',
        paddingTop: 24,
        paddingRight: 24,
        paddingLeft: 24,
        borderRadius: 28,
        shadowColor: 'transparent'
    };

    return (
        <Modal
            visible={visible}
            contentContainerStyle={containerStyle}
            style={{ marginHorizontal: 50 }}
        >

            <View style={{}}>

                <Text
                    style={{
                        color: '#1D1B20',
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center'
                    }}
                >
                    { title }
                </Text>

                <View style={{ marginTop: 22 }}>

                    <View style={{ paddingTop: 24, paddingBottom: 24, /*paddingRight: 24, paddingLeft: 8*/ }}>

                        <View style={{ /*flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 24, left: 24*/ }}>
                            
                            {/*<TouchableOpacity onPress={() => { aceptarFN() }}>
                                <Text style={{ fontSize: 16, fontWeight: '700', fontFamily: 'Roboto' }}>Cancelar</Text>
                            </TouchableOpacity>*/}

                            <TouchableOpacity onPress={() => { aceptarFN() }}>
                                <Text style={{ fontSize: 16, fontWeight: '700', fontFamily: 'Roboto', textAlign: 'center' }}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </View>

        </Modal>
    )
}
