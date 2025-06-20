import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../auth/LoginScreen';
import { HomeScreen } from '../home/HomeScreen';
import { RegistrarSalidasScreen } from '../salidas/RegistrarSalidasScreen';
import { AddClienteScreen } from '../clientes/AddClienteScreen';
import { VerClientesScreen } from '../clientes/VerClientesScreen';
import { ClasificacionesScreen } from '../clasificaciones/ClasificacionesScreen';
import { ClientesRegister } from '../clientes/ClientesRegister';
import { AddPaquete } from '../paquetes/AddPaquete';
import { EditarClienteScreen } from '../clientes/EditarClienteScreen';
import { PhotoScreen } from '../paquetes/PhotoScreen';
import { NvaSalidaScreen } from '../paquetes/NvaSalidaScreen';

const Stack = createStackNavigator();
export const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RegistrarSalida"
            component={RegistrarSalidasScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AddCliente"
            component={AddClienteScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="VerClientes"
            component={VerClientesScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Clasificaciones"
            component={ClasificacionesScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ClientesRegister"
            component={ClientesRegister}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AddPaquete"
            component={AddPaquete}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="EditarCliente"
            component={EditarClienteScreen}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="PhotoScreen"
            component={PhotoScreen}
            options={{ 
                headerShown: true,
                title:'Fotografía',
                headerStyle:{
                    backgroundColor: '#FFF',
                },
                headerTintColor: '#004389',
                //headerTitleAlign: 'center',
            }}
        />
        
        <Stack.Screen
            name="NvaSalida"
            component={NvaSalidaScreen}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
  )
}
