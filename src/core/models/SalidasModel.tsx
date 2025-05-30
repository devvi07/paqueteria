import Realm from "realm";

export class SalidasModel extends Realm.Object<SalidasModel> {
    _id!: string;
    destino!: string;
    fecha!: string;
    status!: string;

    static schema: Realm.ObjectSchema = {
        name: 'Salidas',
        primaryKey: '_id',
        properties: {
            _id: 'string',
            destino: 'string',
            fecha: 'string',
            status: 'string'
        },
    };
}