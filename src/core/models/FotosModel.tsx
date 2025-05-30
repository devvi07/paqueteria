import Realm from "realm";

export class FotosModel extends Realm.Object<FotosModel> {
    _id!: string;
    url!: string;
    uri!: string;
    type!: string;
    namePhoto!: string;
    descripcion!: string;

    static schema: Realm.ObjectSchema = {
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
}