import Realm from "realm";

export class ClientesModel extends Realm.Object<ClientesModel> {
    _id!: string;
    nombre!: string;
    apellidos!: string;
    direccion!: string;
    municipio!: string;
    tel!: string;
    destino!: string;
    fecha!: string;
    descripcionPaquete!: string;
    fotos!: [];
    nombreRecibe!: string;
    apellidosRecibe!: string;
    direccionRecibe!: string;
    telRecibe!: string;
    municipioRecibe!: string;
    clasificacion!: string;
    status!: string;
  
    static schema: Realm.ObjectSchema = {
      name: 'Clientes',
      primaryKey: '_id',
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
        fotos: 'Fotos[]',
        nombreRecibe: 'string',
        apellidosRecibe: 'string',
        direccionRecibe: 'string',
        telRecibe: 'string',
        municipioRecibe: 'string',
        clasificacion: 'string',
        status: 'string'
      },
    };
  }