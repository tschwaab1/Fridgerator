import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { Header } from 'react-native-elements';
import {BarCodeScanner} from 'expo-barcode-scanner';
import QrComponent from '../components/QrComponent';


const QrScreen = ({navigation}) => {

const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [name, setName] = useState("");
const [category, setCategory] = useState("");


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const convertJSON = (response:Response):Promise<any>=>{
        
        if(response.ok){
          return response.json()
        } else {
          throw new Error ('Error QrComponent:'+ response.status )
        }

  }

 const handleBarCodeScanned = async ({data}:any) => {
    setScanned(true)

    try{
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}`)
      const json = await convertJSON(response)
      const categoryName = json.product.categories_hierarchy[0].substring[3];
      const fixedCategory = categoryName.charAt(0).toUpperCase()+categoryName.slice(1);
      
      setName(json.product.product_name)
      setCategory(fixedCategory)
      
    } catch (error){
      console.log(error)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default QrScreen;