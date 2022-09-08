import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, Picker} from 'react-native';
import Constants from 'expo-constants';
//import  {Picker} from '@react-native-picker/picker'
import { useLinkProps } from '@react-navigation/native';


interface propsPicker {
    name: string,
    options: string[],
    selectedValue: string,
    refresh: boolean,
    action: (value:string) => void
}
const PickerComponent = (props:propsPicker) => {

    const [item, setItem] = useState(props.selectedValue);
    
      useEffect(() => {

            setItem(props.selectedValue)

        }, [item, props.refresh, props.action]);
   
    return(     <>
                <Text style={{margin:10}}>Here Please select {props.name}</Text>
                <Picker
                style={{margin:10}}
                    selectedValue={item}
                    onValueChange={(itemValue, itemIndex)=>{ setItem(itemValue); props.action(itemValue); console.log("PickerComponen.tsx: itemValue:"+itemValue)}}> 
                    {props.options.map((item, index) => {
                        return (< Picker.Item label={item} value={item.toLowerCase()} key={index} />);
                        })}   
                </Picker>
</>




    );

};


export default PickerComponent;