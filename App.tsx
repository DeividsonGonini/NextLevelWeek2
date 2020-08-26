import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './src/pages/Landing';

//AppLoading faz com que o app pareça estar carregando mesmo ja tendo carregado, isso para dar tempo de carregar as fontes
import { AppLoading } from 'expo';
//Importando as fontes
import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'
import AppStack from './src/routes/AppStack';

export default function App() {

  //Carregamento das fontes
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}