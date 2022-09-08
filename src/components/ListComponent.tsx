import React, {useState,useEffect} from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import { Header, Card, Icon } from 'react-native-elements';
import {getFoodList, deleteDoc} from '../api/FoodApi'
import { LogBox } from 'react-native'

const ListComponent = ({navigation, route}) => {

    interface item{
        name: String,
        loc: String,
        conf: String,
        cat: String,
        date: Date,
        created: Date,
    }

    const [data, setData]       = useState({data: []})
    const [refresh, setRefresh] = useState(false)
    const [length, setLength]   = useState(0)
    const [lastUpdate, setLastUpdate] = useState('')
    const [itemu, setItem] = useState<item>()



     useEffect(() => {

        setRefresh(false)
       
             const reload = async () => {
                    await getFoodList().then(rawData => setData({data: rawData}))
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
             
     }

        
        , 
        [refresh]); 

            const hadder = () => {
                return ( 
                  <>
                    <Header
                        placement="center"
                        centerComponent={{ text: 'Super Foodlist', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'list', color: '#fff' }}
                    />
                    <Button title="Refresh" onPress={() => {myfunc()}}></Button>
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


        setItem(obj)

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
        keyExtractor={data  => data.name.toString()}
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
                             ExpDate: {item.date} | Category: {item.cat} | Location: {item.loc} | Confection Type: {item.conf} | AddedAt: {new Date(item.created.seconds * 1000).toISOString().substr(8,2)}-{new Date(item.created.seconds * 1000).toISOString().substr(5,2)}-{new Date(item.created.seconds * 1000).toISOString().substr(0,4)}
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


export default ListComponent;