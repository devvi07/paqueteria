const FotosSchema: Realm.ObjectSchema = {
    name: 'Fotos',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        url: 'string', //cloud
        uri: 'string',
        type: 'string',
        namePhoto: 'string',
        descripcion: 'string?',
    },
};

export default FotosSchema;