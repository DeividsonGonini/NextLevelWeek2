import React, { useDebugValue } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        //Obrigatorio por volta de tudo
        <NavigationContainer>
            {/* navegação em pilha */}
            {/* screenOptions={{ headerShown: false - Torna o Header invisivel*/}
            <Navigator screenOptions={{ headerShown: false }}>
                {/* Cada tela da navegação é uma Screen */}
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                {/* Adicionando a rota por Abas */}
                <Screen name="Study" component={StudyTabs} />

            </Navigator>
        </NavigationContainer>
    )

}

export default AppStack;