import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'

import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper'

import MainTabScreen from './screens/MainTabScreen';
import DrawerContent from './screens/DrawerContent';
import SettingsScreen from './screens/SettingsScreen';
import SupportScreen from './screens/SupportScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/Context'

import RootStackScreen from './screens/RootStackScreen'

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true)
  // const [userToken, setUserToken] = React.useState(null)

  const [isDarkTheme, setIsDarkTheme] = React.useState(false)

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETREIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    // signIn: async (userName, password) => {
    //   let userToken = null;
    //   if (userName == 'user' && password == 'pass') {
    //     userToken = 'qwerty'
    //     try {
    //       await AsyncStorage.setItem('userToken', userToken)
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    //   dispatch({ type: 'LOGIN', id: userName, token: userToken })
    // },
    signIn: async (foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken)
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: (userName, password) => {
      let userToken = 'qwerty';
      dispatch({ type: 'REGISTER', id: userName, token: userToken })
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme)
    }
  }), [])

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RETREIEVE_TOKEN', isLoading: false, token: userToken })
    }, 1000);
  }, [])

  if (loginState.isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
    )
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SettingScreen" component={SettingsScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="BookmarksScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
          ) :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

})

export default App;
