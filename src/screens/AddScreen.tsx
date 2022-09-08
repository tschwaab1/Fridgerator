import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Header } from 'react-native-elements';
import AddComponent from '../components/AddComponent'


const AddScreen = ({navigation}) => {
  
    console.log("Testing navigation: \n "+navigation)

    return(
      <View style={styles.container}>
            <Header
              placement="center"
              centerComponent={{ text: 'Add a Food', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />

        <View style={styles.containerTwo}>
            <View style={styles.inputArea}>

                <AddComponent navigation={navigation} />
            </View>
        </View>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
      flexDirection: "column",
      flex: 1,
    padding: 20,
    },
    containerTwo: {
     flexDirection: "row",
     flex: 8
    },
    inputArea: { 
      flex: 4
    }
});

export default AddScreen;

