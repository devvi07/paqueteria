import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const NvaSalidaScreen = ({ route, navigation }: any) => {

    const setNvaSalida = async() => {

        const cliente = { 
            "descPaquete": "NA",
            "destino": "NA",
            "fotos": "",
            "status": "NA",
        };

        console.log('https://pqt-calva-ws.onrender.com/api/cliente/nvaSalida')
        const response = await fetch(`https://pqt-calva-ws.onrender.com/api/cliente/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        console.log("🚀 ~ setNvaSalida ~ data:", data)
        
        if(data){
            navigation.navigate('VerClientes');
        }
    };

    useEffect(()=>{
        setNvaSalida();
    },[]);


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} color={'#004389'} size={50} />
            <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: 'center', color: '#004389', fontSize: 16, fontWeight: '600' }}>Creando una nueva salida ...</Text>
            </View>
        </View>
    )
}
