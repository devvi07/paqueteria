import { useQuery, useRealm } from '@realm/react';
import { ClientesModel } from '../../../core/models/ClientesModel';

export const useClientesLocal = () => {

  const realm = useRealm();

  const insertCliente = async (data: []) => {
    try {
      realm.write(() => {
        for (const cliente of data)
          realm.create(ClientesModel, cliente);
      });
      console.log(`[developerMode] clientes insertados correctamente.`);
      return 1;

    } catch (e) {
      console.log('[developerMode] Error al insertar clientes -> ', e);
      return 0;
    }
  }

  const updateCliente = async (data: []) => {
    try {
      realm.write(() => {
        for (const cliente of data)
          realm.create(ClientesModel, cliente, true);
      });
      console.log(`[developerMode] cliente actualizado correctamente.`);
      return 1;

    } catch (e) {
      console.log('[developerMode] Error al actualizar cliente -> ', e);
      return 0;
    }
  }

  return { insertCliente, updateCliente };

}
