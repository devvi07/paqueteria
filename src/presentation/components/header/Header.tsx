import React from 'react';
import { Image, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export const Header = () => {
    return (
        <Appbar.Header style={{ backgroundColor: '#FFF' }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Image source={require("../../../assets/img/logo.png")}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain"
                    }}
                />
            </View>
        </Appbar.Header>
    )
}
