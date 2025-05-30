import { useRealm } from '@realm/react';
import { SalidasModel } from '../../../core/models/SalidasModel';

export const useSalidasLocal = () => {

  const realm = useRealm();

  const insertSalida = async (data: []) => {
    try {
      realm.write(() => {
        for (const salida of data)
          realm.create(SalidasModel, salida);
      });
      console.log(`[developerMode] salidas insertadas correctamente.`);
      return 1;

    } catch (e) {
      console.log('[developerMode] Error al insertar salidas -> ', e);
      return 0;
    }
  }

  return { insertSalida };

};