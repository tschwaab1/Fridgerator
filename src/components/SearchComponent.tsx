import React, {useState,useEffect} from 'react';
import {Button, View, ScrollView, Text, StyleSheet, FlatList, Listitem} from 'react-native';
import { Header, Card, Icon } from 'react-native-elements';
import {getFoodListBy, deleteDoc} from '../api/FoodApi'
//import  {Picker} from '@react-native-picker/picker'
import PickerComponent from './FormComponents/PickerComponent'
import { LogBox } from 'react-native'



const SearchComponent = ({navigation, route} ) => {




    const [search, setSearch]   = useState<string>('none')
    const [data, setData]       = useState<Object>({data: []})
    const [refresh, setRefresh] = useState<boolean>(false)
    const [length, setLength]   = useState<number>(0)
    const [lastUpdate, setLastUpdate] = useState<string>('')

     useEffect(() => {

            setRefresh(false)
            setData({data: []})

             const reload = async () => {
                    await getFoodListBy(search).then(rawData => setData({data: rawData}))
                    console.log("ReloAD HAS BEEN EXECTURES")
             }
             
             const updateTime =  () => {

                let date = new Date();

                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

                if(seconds <= 9){
                    seconds = "0"+seconds;
                }

                setLastUpdate(hours+":"+minutes+":"+seconds)
             }

            reload()
            setLength(Object.keys(data.data).length)
            updateTime()

     },[refresh, search]); 

        interface PickerVal {
            actions:string[]
        }

        const PickerValues:PickerVal = {actions: ["Choose your Search Criteria","Recently added(descending)","Expire Soon","Missing data","Category: Fruit",
                                                  "Category: Veggie","Category: Dairy","Category: Meat","Category: Liquid","Location: Fridge","Location: Freezer",
                                                  "Location: Pantry","Location: Drawer","Confection: Fresh","Confection: Canned","Confection: Frozen","Confection: Plastic","Confection: Paper"]
                                      }


            const hadder = () => {
                return ( 
                    <>
                    <Header
                      placement="center"
                      centerComponent={{ text: 'Super Foodlist', style: { color: '#fff' } }}
                      rightComponent={{ icon: 'list', color: '#fff' }}
                      />

                    <Button title="Refresh" onPress={() => {myfunc()}}></Button>

                    <PickerComponent refresh={refresh} name="Search Term" selectedValue={search} options={PickerValues["actions"]} action={setSearch}/>
                  </>
                     )
            }

            const fodder = () => {
                 return (<Text style={{textAlign:"center", marginBottom:5, marginTop: 5, fontSize:18, color: "#7a7a7a"}}>Total Ingridents: {length} {'\n'} Last update: {lastUpdate}</Text>)
            }

    const myfunc = () => {

        setRefresh(true)

    }


    const openEdit = async (name: String, oldname: string, date: Date, cat: String, loc: String, conf: String, created: Date) => {
        
        let obj = {
            name: name,
            oldname: name,
            loc: loc,
            conf: conf,
            cat: cat,
            date: date,
            created: created,
        }

        navigation.navigate('Edit', obj) //- ----> Goto EditScreen

        obj = {
            name: "",
            oldname: "",
            loc: "",
            conf: "",
            cat: "",
            date: new Date(),
            created: new Date(),
        }

        setRefresh(true)
    }
    
    const deleteItem = (name:string) => {
        try {
        deleteDoc(name)
        }
        catch (error){
            console.log(error)
            console.log("docWithName:"+ name+" deleted?")
        }
    }

return (

<FlatList
        keyExtractor={data  => data.created.seconds.toString()}
        data={data.data}
        extraData={refresh}
        ListHeaderComponent={hadder}
        ListFooterComponent={fodder} 
        renderItem={( {item} ) => {
            return( 
                <View>
                    <Card>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Divider/>

                        <Text style={{marginBottom: 10}}>
                             ExpDate: {item.date} | Category: {item.cat} | Location: {item.loc} | Confection Type: {item.conf} | createdAt: {new Date(item.created.seconds * 1000).toISOString().substr(8,2)}-{new Date(item.created.seconds * 1000).toISOString().substr(5,2)}-{new Date(item.created.seconds * 1000).toISOString().substr(0,4)}
                        </Text>
                        <Button
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={() => (openEdit(item.name, item.name, item.date, item.cat, item.loc, item.conf, item.created.seconds))}
                                title='Edit' />
                        <Button
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={()=> (deleteItem(item.name))}
                                title='Delete' />
                    </Card>
                </View>
                    )
        }} 
        />
)

}

export default SearchComponent;