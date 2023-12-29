import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons'

import Products from '../../pages/Products';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    // <SafeAreaView>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#489a5a',
            tabBarInactiveTintColor: '#bababa',
            headerShown: false,
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen  name="Home" component={Home}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} />
            }}
          />
          <Tab.Screen name="Products" component={Products}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='folder-open' size={size} color={color} />
            }}
          />
          <Tab.Screen name="Login" component={Login}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='log-in' size={size} color={color} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
  );
}