import React, { useEffect, useState } from 'react'
import { Image, Keyboard, Text, useWindowDimensions, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
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

  const singIn = async() => {
    //await requestAllPermissions();
    navigation.navigate('Home');
  }

  const permission = async() => {
    await requestAllPermissions();
  }

  useEffect(() => {
    keyBoardListener();
    permission();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={require("../../../assets/img/logo.png")}
          style={{ 
            width: 300, 
            height: keyboardVisible ? 200 :300, 
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
          //onSubmitEditing={singIn}
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

    </View>
  )
}
