import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PhotoScreen = ({ route, navigation }: any) => {

    const { photo } = route.params;
    const { width, height } = useWindowDimensions();

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <FastImage
                style={{ width: width, height: height }}
                source={{
                    uri: `${photo}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    )
}
