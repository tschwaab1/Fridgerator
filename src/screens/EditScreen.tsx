import React, { useState } from 'react';
import {View} from 'react-native';
import { Header } from 'react-native-elements';
import EditComponent from '../components/EditComponent'


const EditScreen = ({route, navigation}) => {

    let item = route.params;

    return ( 
                    <View>
                            <Header
                                placement="center"
                                centerComponent={{ text: 'Edit: '+item['name'], style: { color: '#fff' } }}
                                rightComponent={{ icon: 'list', color: '#fff' }}
                              />
                    
                            <EditComponent route={route} navigation={navigation}/>

                    
                    </View>
    );
};


export default EditScreen;