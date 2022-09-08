import React, { useEffect, useState } from 'react';
import {Button, View, Text, StyleSheet, FlatList} from 'react-native';
import PickerComponent from './FormComponents/PickerComponent';
import TextinputComponent from './FormComponents/TextinputComponent'
import {editFood} from '../api/FoodApi'

const EditComponent = ({route, navigation}) => {

    let item = route.params;

    const [category, setCategory] = useState<string>(item['cat'])
    const [location, setLocation] = useState<string>(item['loc'])
    const [confection, setConfection] = useState<string>(item['conf'])
    const [name, setName] =useState<string>(item['name'])
    const [date, setDate] = useState<string>(item['date'])
    const [created, setCreated] = useState<string>(item['created'])
    const [oldname, setOldname] = useState<string>(item['name'])
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
    
        console.log("Updateing USEEFFECT] vlues!")
        setOldname(item['name'])
        console.log("Now Oldname should be NewName:"+item['name'])
        setCategory(item['cat'])
        setLocation(item['loc'])
        setConfection(item['conf'])
        setName(item['name'])
        setDate(item['date'])
        setCreated(item['created'])

        setRefresh(false)

  }, [refresh, route, navigation]);

interface itemValues{
        name:string,
        oldname: string,
        category: string,
        location: string,
        confection: string,
        date: string,
        created: string
}
    interface PickerVal {
                    category:string[],
                    location:string[],
                    confection:string[]
    }

    const PickerValues:PickerVal = {
                            category: ["Select Category","Fruit","Veggie","Dairy","Meat","Liquid"],
                            location: ["Select a Location", "Fridge", "Freezer", "Pantry", "Drawer"],
                            confection: ["Select a Confection","Fresh","Canned","Frozen","Plastic", "Paper"]
    }

    const updateItem = (props:itemValues) => {


         editFood(props)
         setOldname(props.name)

         item['name'] = props.name;
         item['category'] = props.category;
         item['location'] = props.location;
         item['confection'] = props.confection;
         item['date'] = props.date;
         item['created'] = props.created;
         item['oldname'] = props.oldname;

         setRefresh(true)
    }

    return ( 


                    <View>
                            
                    <TextinputComponent refresh={refresh} title={"Name(*Mandatory)"} name={name} action={setName}/>

                    <PickerComponent refresh={refresh} name="Category" selectedValue={category} options={PickerValues["category"]} action={setCategory} />
                    
                    <PickerComponent refresh={refresh} name="Location" selectedValue={location} options={PickerValues["location"]} action={setLocation} />
                    
                    <PickerComponent refresh={refresh} name="Confection" selectedValue={confection} options={PickerValues["confection"]} action={setConfection} />

                    <TextinputComponent refresh={refresh} title="Expiry Date(Format: DD-MM-YYYY):" name={date} action={setDate}/>
                    
                    <Button title="Save" onPress={() => {updateItem({name, oldname, category, location, confection, date, created})}} />

                    <Button title="Go Back" onPress={() => {navigation.navigate('FoodList'),setRefresh(true) }} />
                    
                    <Button title="Reload" onPress={() => {setRefresh(true)}} />
                    
                    </View>
    );
};


export default EditComponent;