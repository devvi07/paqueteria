import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/header/Header';
import { Button, Icon, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { usePhotosLocal } from '../../../hooks/database/fotos/usePhotosLocal';
import { useClientesLocal } from '../../../hooks/database/clientes/useClientesLocal';
import uuid from 'react-native-uuid';
import { ModalAceptarConfirmar } from '../../components/modals/ModalAceptarConfirmar';

export const AddClienteScreen = ({ route, navigation }: any) => {

    const { destino, fecha, clasif } = route.params;
    const [ photos, setPhotos ] = useState<any>([]);
    const [ photosAux, setPhotosAux ] = useState([]);

    const [ name, setName ] = useState('');
    const [ apellidos, setApellidos ] = useState('');
    const [ adress, setAdress ] = useState('');
    const [ municipio, setMunicipio ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ descriptionPackage, setDescriptionPackage ] = useState('');
    const [ photoDescription, setPhotoDescription ] = useState('');
    const [ nombreRecibe, setNombreRecibe ] = useState('');
    const [ apellidosRecibe, setApellidosRecibe ] = useState('');
    const [ direccionRecibe, setDireccionRecibe ] = useState('');
    const [ telRecibe, setTelRecibe ] = useState('');
    const [ municipioRecibe, setMunicipioRecibe ] = useState('');

    const { insertPhoto } = usePhotosLocal();
    const { insertCliente } = useClientesLocal();

    //Modal
    const [visibleModal, setVisibleModal] = useState(false);
    const [message, setMessage] = useState('');
    const [acept, setAcept] = useState(0);
    const showAlert = () => setVisibleModal(true);
    const toggleModal = () => setVisibleModal(false);

    const handleAceptar = () => {
        toggleModal();
        if (acept == 1)
            navigation.navigate('VerClientes', { destino: destino, fecha: fecha, clasif: clasif });
    }

    const addCliente = async() => {
        console.log('Estas son las fotos del cliente -> ',photos);
     
        if(
            name == '' || 
            apellidos == '' || 
            adress == '' || 
            municipio == '' || 
            tel == '' ||
            destino == '' ||
            fecha == '' ||
            descriptionPackage == '' ||
            nombreRecibe == '' ||
            direccionRecibe == '' ||
            telRecibe == '' ||
            municipioRecibe == ''
        ){
            setAcept(0);
            setMessage('¡Todos los campos son obligatorios!');
            showAlert();
            return;
        }

        if(photos.length == 0){
            setAcept(0);
            setMessage('¡Agrega almenos una foto!');
            showAlert();
            return;
        }
        
        const cliente: any = [{
            _id: uuid.v4(),
            nombre: name,
            apellidos: apellidos,
            direccion: adress,
            municipio: municipio,
            tel: tel,
            destino: destino,
            fecha: fecha,
            descripcionPaquete: descriptionPackage,
            fotos: photos,
            nombreRecibe: nombreRecibe,
            apellidosRecibe: apellidosRecibe,
            direccionRecibe: direccionRecibe,
            telRecibe: telRecibe,
            municipioRecibe: municipioRecibe,
            clasificacion: clasif,
            status: 'Pendiente'
        }];
        console.log("🚀 ~ addCliente ~ cliente:", cliente)

        const doCliente = await insertCliente(cliente);
        console.log("🚀 ~ addCliente ~ doCliente:", doCliente);
        if(doCliente == 1){
            setAcept(doCliente);
            setMessage('¡Registro exitoso!');
            showAlert();
        }else{
            setAcept(0);
            setMessage('¡Registro erróneo!');
            showAlert();
        }

    };

    const takePhoto = async() => {

        const result = await launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.7,
            cameraType: 'back'
        });

        if (result.assets && result.assets[0].uri) {
            const image = result.assets[0];

            //FOTOS MODEL
            const regPhoto: any = [{
                _id: uuid.v4(),
                url: image.uri ?? '', //cloud
                uri: image.uri ?? '',
                type: image.type ?? '',
                namePhoto: image.fileName ?? '',
                descripcion: photoDescription
            }];

            setPhotosAux(regPhoto);
            
            if(photos.length>0){
                const oPhoto: any = [];
                oPhoto.push(regPhoto[0]);
                for(let v= 0; v<photos.length; v++){
                    oPhoto.push(photos[v]);
                }

                console.log("🚀 ~ takePhoto ~ oPhoto:", oPhoto)
                setPhotos(oPhoto);

            }else{
                setPhotos(regPhoto);
            }

            setPhotoDescription('');

            /*const data = new FormData();
            data.append('file', {
                uri: uri,
                type: type,
                name: fileName,
            });
            data.append('upload_preset', 'pqt-calva'); // lo configuras en Cloudinary

            const res = await fetch('https://api.cloudinary.com/v1_1/dyfx8jypt/image/upload', {
                method: 'POST',
                body: data,
            });

            const json = await res.json();
            return json.secure_url; // esta es la URL para guardar
            */  
        }
    
    }

    const selectImage = () => {

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Selección cancelada');
            } else if (response.errorMessage) {
                console.log('Error:', response.errorMessage);
            } else if (response.assets && response.assets[0].uri) {
                
                //response.assets[0].uri
                /*setLoading(false);
                setPhoto(response.assets[0].uri);
                saveEvidencia(response.assets[0].base64 ?? '');*/
            }

        });
    };

    useEffect(()=>{
        console.log("🚀 ~ useEffect ~ destino:", destino)
        console.log("🚀 ~ useEffect ~ fecha:", fecha)
    },[]);
        


    return (
        <View style={styles.main}>
            <Header />
            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>Persona que envia</Text>
                    </View>

                    <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                        <TextInput
                            label="Nombre"
                            value={name}
                            onChangeText={text => setName(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Apellidos"
                            value={apellidos}
                            onChangeText={text => setApellidos(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Dirección"
                            value={adress}
                            onChangeText={text => setAdress(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Municipio / Condado"
                            value={municipio}
                            onChangeText={text => setMunicipio(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Teléfono"
                            value={tel}
                            onChangeText={text => setTel(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                            //autoCapitalize='none'
                            keyboardType='phone-pad'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Descripción paquete"
                            value={descriptionPackage}
                            onChangeText={text => setDescriptionPackage(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10  }}>

                            <View style={{ width: '85%' }}>
                                <TextInput
                                    label="Descripción foto"
                                    value={photoDescription}
                                    onChangeText={text => setPhotoDescription(text)}
                                    theme={{ colors: { primary: '#004389' } }}
                                    style={styles.input}
                                    textColor='#000'
                                //autoCapitalize='none'
                                />

                            </View>

                            <View style={{ width: '15%' }}>
                                <TouchableOpacity onPress={takePhoto}>
                                    <Icon
                                        source="camera"
                                        color={'#2f3361'}
                                        size={50}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                    {/*<View style={{ marginTop: 16, backgroundColor: '#e2e2e2', padding: 20, marginHorizontal: 50, borderRadius: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={takePhoto}>
                            <Icon
                                source="camera"
                                color={'#2f3361'}
                                size={80}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={selectImage}>
                        <View style={{ marginTop: 4, alignItems: 'center', marginHorizontal: 16 }}>
                            <Text style={{ color: '#00A2E1', fontWeight: '500', textDecorationLine: 'underline' }}>Adjuntar archivo</Text>
                        </View>
                    </TouchableOpacity>*/}

                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>Persona que recibe</Text>
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Nombre"
                            value={nombreRecibe}
                            onChangeText={text => setNombreRecibe(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Apellidos"
                            value={apellidosRecibe}
                            onChangeText={text => setApellidosRecibe(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Dirección"
                            value={direccionRecibe}
                            onChangeText={text => setDireccionRecibe(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Municipio / Condado"
                            value={municipioRecibe}
                            onChangeText={text => setMunicipioRecibe(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                        //autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                        <TextInput
                            label="Teléfono"
                            value={telRecibe}
                            onChangeText={text => setTelRecibe(text)}
                            theme={{ colors: { primary: '#004389' } }}
                            style={styles.input}
                            textColor='#000'
                            //autoCapitalize='none'
                            keyboardType='phone-pad'
                        />
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 25 }}>
                        <Button
                            mode="contained"
                            onPress={addCliente}
                            buttonColor='#004389'
                            labelStyle={{ color: '#FFF' }}
                            style={{ borderRadius: 7 }}
                        >
                            Registrar
                        </Button>

                        <View style={{ marginTop: 10 }}>
                            <Button
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

                </ScrollView>

            </View>

            <ModalAceptarConfirmar
                title={message}
                visible={visibleModal}
                hideModal={toggleModal}
                aceptarFN={handleAceptar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 16,
        marginTop: 0,
        marginBottom: 20,
        borderRadius: 10
    },
    title: {
        color: '#004389',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    containerTitle: {
        marginTop: 16
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#004389'
    }
});