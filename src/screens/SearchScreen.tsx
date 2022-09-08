import React from 'react';
import {Button, View, Text, StyleSheet, FlatList} from 'react-native';
import { Header } from 'react-native-elements';
import SearchComponent from '../components/SearchComponent';

const SearchScreen = ({navigation , route}) => {

    return ( 
     //style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
     <View>
         
         <SearchComponent navigation={navigation} route={route} />
 
        </View>
    );
};


export default SearchScreen;