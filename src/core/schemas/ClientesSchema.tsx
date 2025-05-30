

const ClientesSchema: Realm.ObjectSchema = {
    name: "Clientes",
    primaryKey: "_id",
    properties: {
        _id: 'string',
        nombre: 'string',
        apellidos: 'string',
        direccion: 'string',
        municipio: 'string',
        tel: 'string',
        destino: 'string',
        fecha: 'string',
        descripcionPaquete: 'string',
        fotos: 'Foto[]',
        nombreRecibe: 'string',
        apellidosRecibe: 'string',
        direccionRecibe: 'string',
        telRecibe: 'string',
        municipioRecibe: 'string',
        clasificacion: 'string',
        status: 'string'
    },
};

export default ClientesSchema;