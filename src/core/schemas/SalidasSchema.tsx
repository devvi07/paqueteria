

const SalidasSchema: Realm.ObjectSchema = {
    name: 'Salidas',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        destino: 'string',
        fecha: 'string',
        status: 'string'
    },
};

export default SalidasSchema;