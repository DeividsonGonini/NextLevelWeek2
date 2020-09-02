import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// importando os icones
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {

    return (
        <Navigator
            tabBarOptions={{
                style: {
                    // Sombra no Android - Igual ao box Shadow
                    elevation: 0,
                    // Sombra no IOS - Igual ao box Shadow
                    shadowOpacity: 0,
                    height: 64,
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                // cor de fundo da aba quando NÃO está selecionada
                inactiveBackgroundColor: '#fafafc',
                // cor de fundo da aba quando está selecionada
                activeBackgroundColor: '#ebebf5',
                // cor da fonte quando NÃO está selecionada
                inactiveTintColor: '#c1bccc',
                // cor da fonte quando está selecionada
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
                        )
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                        )
                    }
                }}
            />

        </Navigator>
    );
}

export default StudyTabs;