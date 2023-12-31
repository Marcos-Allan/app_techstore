import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons'

import People from './pages/People';
import Products from './pages/Products';
import Edit from './pages/Edit';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2a72ef',
            tabBarInactiveTintColor: '#bababa',
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              backgroundColor: '#ebf0f2'
            }
          }}
        >
          <Tab.Screen  name="Products" component={Products}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='shirt' size={size} color={color} />
            }}
          />
          <Tab.Screen name="People" component={People}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='people' size={size} color={color} />
            }}
          />
          <Tab.Screen name="Edit" component={Edit}
            options={{
              tabBarIcon: ({ size, color }) => <Ionicons name='log-in' size={size} color={color} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}