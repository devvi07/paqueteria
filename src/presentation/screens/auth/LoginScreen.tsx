import React, { useEffect, useState } from 'react'
import { Alert, Image, Keyboard, Text, useWindowDimensions, View } from 'react-native'
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { requestAllPermissions } from '../utils/Utils';

export const LoginScreen = ({ navigation }: any) => {

  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [sessionUser, setSessionUser] = useState(false);
  const [pass, setPass] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const keyBoardListener = () => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }

  const singIn = async () => {

    const name = user.charAt(0).toUpperCase() + user.slice(1);
    const raw = JSON.stringify({
      "nombre": name.trim(),
      "password": pass.trim()
    });

    console.log("🚀 ~ singIn ~ raw:", raw);

    if (user.length === 0 || pass.length === 0) {
      Alert.alert('¡Alerta!', 'Todos los campos son obligatorios')
      return;
    }

    getAcceso(raw);

  }

  const getAcceso = async (raw: any) => {
    try {

      setLoading(false);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      await fetch("https://pqt-calva-ws.onrender.com/api/usuario/login", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      }).then(async (response) => {

        const codigo = response.status;
        const data = await response.json();
        return { codigo, data };

      }).then(async (result) => {

        console.log(result);
        if (result) {
          if (result.codigo === 401) {
            setLoading(true);
            Alert.alert('¡Alerta!', result.data.mensaje);
            return;
          }

          if (result.codigo == 200) {
            navigation.navigate('VerClientes');
          } else {
            setLoading(true);
            Alert.alert('Error', '¡Ocurrio un error al iniciar sesión!\nIntentar más tarde.');
          }

        } else {
          setLoading(true);
          Alert.alert('Error', '¡Ocurrio un error al iniciar sesión!\nIntentar más tarde.');
        }
      }).catch((error) => {
        setLoading(true);
        console.error(error);
        Alert.alert('Error', '¡Ocurrio un error al iniciar sesión!\nIntentar más tarde.');
      });

    } catch (e) {
      console.log(`Error en login ${e}`)
      return null;
    }
  }

  const permission = async () => {
    await requestAllPermissions();
  }

  useEffect(() => {
    keyBoardListener();
    permission();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      {
        loading ?
          <>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image source={require("../../../assets/img/logo.png")}
                style={{
                  width: 300,
                  height: keyboardVisible ? 200 : 300,
                  resizeMode: "contain"
                }}
              />
            </View>

            <View style={{ marginHorizontal: 20, }}>
              <TextInput
                label="Usuario"
                value={user}
                onChangeText={text => setUser(text)}
                theme={{ colors: { primary: '#004389' } }}
                style={{ borderRadius: 7, backgroundColor: '#FFF', borderColor: '#004389' }}
                textColor='#000'
                autoCapitalize='none'
              />
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <TextInput
                label="Contraseña"
                value={pass}
                onChangeText={text => setPass(text)}
                theme={{ colors: { primary: '#004389' } }}
                style={{ borderRadius: 7, backgroundColor: '#FFF', borderColor: '#004389' }}
                textColor='#000'
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? 'eye-off' : 'eye'}
                    color={'#004389'}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                }
                onSubmitEditing={singIn}
                autoCapitalize='none'
              />
            </View>

            <View style={{ marginTop: 40, marginHorizontal: 20 }}>
              <Button
                mode="contained"
                onPress={singIn}
                buttonColor='#004389'
                labelStyle={{ color: '#FFF' }}
                style={{ borderRadius: 7 }}
              >
                Entrar
              </Button>
            </View>
          </> :
          <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
            <ActivityIndicator animating={true} color={'#004389'} size={50} />
          </View>
      }
    </View>
  )
}
