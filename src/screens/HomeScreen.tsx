import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Header } from 'react-native-elements';

const HomeScreen = ({navigation}) => {



  return ( 
  
      <View>

        <Header
            placement="center"
            centerComponent={{ text: 'Home', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />


            <Text style={styles.text}>Fridgerator TSX</Text>
            <Text style={{textAlign: "left"}}></Text>
            <Button 
              onPress={() => navigation.navigate('Add')}
              title="Add a Food"
              />
      </View>
  );
};


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center" 
    
  }
});

export default HomeScreen;

