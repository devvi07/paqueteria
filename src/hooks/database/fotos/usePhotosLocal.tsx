import { useRealm } from '@realm/react';
import { FotosModel } from '../../../core/models/FotosModel';

export const usePhotosLocal = () => {

  const realm = useRealm();

  const insertPhoto = async (data: []) => {
    try {
      realm.write(() => {
        for (const photo of data)
          realm.create(FotosModel, photo);
      });
      console.log(`[developerMode] photos insertadas correctamente.`);
      return 1;

    } catch (e) {
      console.log('[developerMode] Error al insertar photos -> ', e);
      return 0;
    }
  }

  return { insertPhoto };

};