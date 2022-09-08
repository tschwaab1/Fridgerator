import * as React from 'react';
import { Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import AddScreen from './screens/AddScreen';
import SearchScreen from './screens/SearchScreen';
import EditScreen from './screens/EditScreen'
import QrScreen from './screens/QrScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
		        <Tab.Navigator
            screenOptions={({ route }) => ({
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },            
              tabBarButton: [
                "Edit"
              ].includes(route.name)
                ? () => {
                    return null;
                  }
                : undefined,
              })}
              initialRouteName="Home"
                tabBarOptions={{
                activeTintColor: '#e91e63',
              }}
              >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'TEST',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="FoodList"
            component={ListScreen}
            options={{
            tabBarLabel: 'Food List',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="text-box-search-outline" color={color} size={size} />
            ),
          }}
        />
          <Tab.Screen
            name="Edit"
            component={EditScreen}
            options={{
            tabBarLabel: 'Edit',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="text-box-search-outline" color={color} size={size} />
            ),
          }}
        />
          <Tab.Screen
            name="QR"
            component={QrScreen}
            options={{
            tabBarLabel: 'QR-San',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="nfc-search-variant" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}