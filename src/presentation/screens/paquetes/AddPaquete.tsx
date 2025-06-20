import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/header/Header';
import { ActivityIndicator, Button, Card, Icon, IconButton, List, TextInput } from 'react-native-paper';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import { ModalAceptarConfirmar } from '../../components/modals/ModalAceptarConfirmar';

export const AddPaquete = ({ route, navigation }: any) => {

    const { item } = route.params;

    const [ loading, setLoading ] = useState(true);
    const [ descPaquete, setDescPaquete ] = useState('');
    const [ showSelect, setShowSelect ] = useState(false);
    const [ showSelectDestino, setShowSelectDestino ] = useState(false);
    const [ txtSelect, setTxtSelect ] = useState('Clasificación');
    const [ txtSelectDestino, setTxtSelectDestino ] = useState('Destino');
    const [ photos, setPhotos ] = useState([]);
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ statusOK, setStatusOK ] = useState(0);

    const showAlert = () => setVisibleModal(true);
    const toggleModal = () => setVisibleModal(false);

    const handleAceptar = () => {
        toggleModal();
        if (statusOK == 200)
            navigation.navigate('VerClientes');
    }

    const toggleSelect = () => setShowSelect(!showSelect);
    const toggleSelectDestino = () => setShowSelectDestino(!showSelectDestino);

    const CAT_CLASIFICACION = [
        { id: 1, descripcion: 'Frio'},
        { id: 2, descripcion: 'Seco'},
        { id: 3, descripcion: 'Medicamento'},
        { id: 4, descripcion: 'Prohibido'}
    ];

    const CAT_DESTINOS = [
        { id: 1, descripcion: 'Nueva York'},
        { id: 2, descripcion: 'Denver'},
        { id: 3, descripcion: 'Los Angeles'},
        { id: 4, descripcion: 'San Diego'},
        { id: 5, descripcion: 'México'}
    ];

    const addPaquete = async() => {
        console.log("🚀 ~ addProducto ~ photos:", photos);
        console.log("🚀 ~ addProducto ~ txtSelect:", txtSelect);
        console.log("🚀 ~ addProducto ~ txtSelectDestino:", txtSelectDestino);

        if(descPaquete.length == 0 || txtSelect == 'Clasificación' || txtSelectDestino == 'Destino'){
            setMessage('¡Todos los campos son necesarios!');
            showAlert();
            return;
        }

        let sPhotos = '';
        for (let i = 0; i < photos.length; i++) {
            sPhotos += photos[i];
            if (i < photos.length - 1) {
                sPhotos += ',';
            }
        }

        const cliente = { 
            "descPaquete": descPaquete, 
            "clasificacion": txtSelect, 
            "destino": txtSelectDestino, 
            "fotos": sPhotos, 
            "status": "Pendiente" 
        };

        setLoading(false);
        const response = await fetch(`https://pqt-calva-ws.onrender.com/api/cliente/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        console.log("🚀 ~ addPaquete ~ data:", data)
        if(data){
            if(data.status == 'Pendiente'){
                setStatusOK(200);
                setMessage('¡El paquete se agregó correctamente!');
                showAlert();
            }
        }
        setLoading(true);

    };

    const takePhoto = async() => {

        setLoading(false);
        const result = await launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.7,
            cameraType: 'back'
        });

        if (result.assets && result.assets[0].uri) {
            const image = result.assets[0];
            
            //FOTOS MODEL
            /*const regPhoto: any = [{
                _id: uuid.v4(),
                url: image.uri ?? '', //cloud
                uri: image.uri ?? '',
                type: image.type ?? '',
                namePhoto: image.fileName ?? '',
                descripcion: photoDescription
            }];*/

            //setPhotosAux(regPhoto);
            
            /*if(photos.length>0){
                const oPhoto: any = [];
                oPhoto.push(regPhoto[0]);
                for(let v= 0; v<photos.length; v++){
                    oPhoto.push(photos[v]);
                }

                console.log("🚀 ~ takePhoto ~ oPhoto:", oPhoto)
                setPhotos(oPhoto);

            }else{
                setPhotos(regPhoto);
            }*/

            //setPhotoDescription('');

            const data = new FormData();
            data.append('file', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            
            data.append('upload_preset', 'pqt-calva'); // lo configuras en Cloudinary

            const res = await fetch('https://api.cloudinary.com/v1_1/dyfx8jypt/image/upload', {
                method: 'POST',
                body: data,
            });

            const json = await res.json();
            
            console.log("🚀 ~ takePhoto ~ json:", json);
            console.log("🚀 ~ takePhoto ~ json-url:", json.secure_url);

            const photoUri: any = [];
            photoUri.push(json.secure_url);

            if(photos.length>0){
                for(const photo of photos){
                    photoUri.push(photo);
                }
                setPhotos(photoUri);
            }else{
                setPhotos(photoUri);
            }
            
            setLoading(true);
            //return json.secure_url; // esta es la URL para guardar
              
        }
    
    }

    useEffect(()=>{
        //console.log('ITEM PARA TRATAMIENTO -> ', item);
    },[]);

    const renderOptionDestino = ({ id, descripcion }: any) => (
        <List.Item
            onPress={() =>{
                setTxtSelectDestino(descripcion); 
                toggleSelectDestino();
            }}
            key={id}
            title={() => (<Text>  {descripcion}</Text>)}
            style={{ backgroundColor: '#FFF' }}
            rippleColor="rgba(0, 0, 0, 0.1)"
        />
    );

    const renderOption = ({ id, descripcion }: any) => (
        <List.Item
            onPress={() =>{
                setTxtSelect(descripcion); 
                toggleSelect();
            }}
            key={id}
            title={() => (<Text>  {descripcion}</Text>)}
            style={{ backgroundColor: '#FFF' }}
            rippleColor="rgba(0, 0, 0, 0.1)"
        />
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFFF' }}>
                <Header />

                {
                    loading ?
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // ajusta según tu header
                    >

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={ styles.container }>

                                <View style={{ marginTop: 16 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#004389' }}>Agregar paquete</Text>
                                </View>

                                <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Descripción del paquete"
                                        value={descPaquete}
                                        onChangeText={text => setDescPaquete(text)}
                                        theme={{ colors: { primary: '#004389' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                                    <Button
                                        mode="contained"
                                        onPress={toggleSelect}
                                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                                        labelStyle={{ flex: 1, textAlign: 'left' }}
                                        icon={() => <Icon source="chevron-down" size={25} color={'#232322'} />}
                                        style={{ height: 48, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}
                                        textColor='#232322'
                                    >
                                        {txtSelect}
                                    </Button>
                                    {showSelect && CAT_CLASIFICACION.map(renderOption)}
                                </View>

                                <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                                    <Button
                                        mode="contained"
                                        onPress={toggleSelectDestino}
                                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                                        labelStyle={{ flex: 1, textAlign: 'left' }}
                                        icon={() => <Icon source="chevron-down" size={25} color={'#232322'} />}
                                        style={{ height: 48, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}
                                        textColor='#232322'
                                    >
                                        {txtSelectDestino}
                                    </Button>
                                    {showSelectDestino && CAT_DESTINOS.map(renderOptionDestino)}
                                </View>

                                <View style={{ marginHorizontal: 40 }}>
                                    <Card style={{ margin: 16 }} onPress={ takePhoto }>

                                        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: photos.length>0 ? '#20da86' :'#eee' }}>
                                            <IconButton icon="camera" size={80} style={{ backgroundColor: '#fFFF' }} />
                                        </View>
                                        <Card.Title
                                            title="Tomar foto"
                                            titleStyle={{ textAlign: 'center', color: '#000', fontWeight: '700' }}
                                            style={{
                                                backgroundColor: '#F6F6F6',
                                                borderBottomEndRadius: 7,
                                                borderBottomLeftRadius: 7
                                            }}
                                        />

                                    </Card>
                                    {
                                        photos.length>0 &&
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 15, color:'#004389', fontWeight: '600' }}>{`Fotos adjuntas: ${photos.length}`} </Text>
                                        </View>
                                    }
                                </View>

                                <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16 }}>
                                    <Button
                                        icon="gift-open"
                                        mode="contained"
                                        onPress={addPaquete}
                                        buttonColor='#004389'
                                        labelStyle={{ color: '#FFF' }}
                                        style={{ borderRadius: 7 }}
                                    >
                                        Registrar
                                    </Button>

                                    <View style={{ marginTop: 10 }}>
                                        <Button
                                            icon="gift-off"
                                            mode="contained"
                                            onPress={() => { navigation.goBack(); }}
                                            buttonColor='#C62828'
                                            labelStyle={{ color: '#FFF' }}
                                            style={{ borderRadius: 7 }}
                                        >
                                            Cancelar
                                        </Button>
                                    </View>

                                </View>

                            </View>

                        </ScrollView>

                    </KeyboardAvoidingView>:
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                        <ActivityIndicator animating={true} color={'#004389'} size={50} />
                    </View>
                }
                
                <ModalAceptarConfirmar
                    title={message}
                    visible={visibleModal}
                    hideModal={toggleModal}
                    aceptarFN={handleAceptar}
                />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 16, 
        marginHorizontal: 20, 
        backgroundColor: '#F6F6F6', 
        flex: 1, 
        borderRadius: 10,
        marginBottom: 16
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#004389'
    }
});