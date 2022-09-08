import React from 'react';
import {Button, View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import { Header } from 'react-native-elements';
import ListComponent from '../components/ListComponent';
import HomeScreen from '../screens/HomeScreen'
import EditScreen from '../screens/EditScreen'

const ListScreen = ({navigation, route}) => {


    return ( 
        <ScrollView>
              <ListComponent route={route} navigation={navigation}/>
        </ScrollView>
    );
};


export default ListScreen;