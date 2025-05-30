import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { StackNavigator } from './src/presentation/screens/routes/StackNavigator';
import { ClientesModel } from './src/core/models/ClientesModel';
import { RealmProvider } from '@realm/react';
import { SalidasModel } from './src/core/models/SalidasModel';
import { FotosModel } from './src/core/models/FotosModel';

const App = () => {
  return (
    <RealmProvider schema={[ ClientesModel, SalidasModel, FotosModel]} >
      <PaperProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </RealmProvider>
  )
}

export default App;