import Realm from "realm";
import ClientesSchema from "../schemas/ClientesSchema";
import SalidasSchema from "../schemas/SalidasSchema";
import FotosSchema from "../schemas/FotosSchema";

if (Realm.defaultPath) {
  try {
    
    const existingRealm = new Realm({ 
      schema: [
        ClientesSchema,
        SalidasSchema,
        FotosSchema
      ], 
      schemaVersion: 1 
    });

    existingRealm.close();
    Realm.deleteFile({ path: Realm.defaultPath });

  } catch (error) {
    console.log("developerMode Error cerrando Realm:", error);
  }
}

const realm = new Realm({
  schema: [
    ClientesSchema,
    SalidasSchema,
    FotosSchema
  ],
  schemaVersion: 1
});

export default realm;