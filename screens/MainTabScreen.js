import React from 'react'

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Details"
            component={DetailsStackScreen}
            options={{
                tabBarLabel: 'Details',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarColor: '#d02860',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
)

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'Home',
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#009387"
                        onPress={() => navigation.openDrawer()}
                    // style={{ marginLeft: 15 }}
                    ></Icon.Button>
                )
            }}
        />
    </HomeStack.Navigator>
)

const DetailsStackScreen = ({ navigation }) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#1f65ff"
                        onPress={() => navigation.openDrawer()}
                    // style={{ marginLeft: 15 }}
                    ></Icon.Button>
                )
            }} />
    </DetailsStack.Navigator>
)

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#694fad'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#694fad"
                        onPress={() => navigation.openDrawer()}
                    // style={{ marginLeft: 15 }}
                    ></Icon.Button>
                )
            }} />
    </ProfileStack.Navigator>
)

const ExploreStackScreen = ({ navigation }) => (
    <ExploreStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#d02860'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name="Explore" component={ExploreScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#d02860"
                        onPress={() => navigation.openDrawer()}
                    // style={{ marginLeft: 15 }}
                    ></Icon.Button>
                )
            }} />
    </ExploreStack.Navigator>
)