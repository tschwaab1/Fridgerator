import React, { useState, useEffect } from "react";
import {StyleSheet, Button} from "react-native";
import PickerComponent from '../components/FormComponents/PickerComponent';
import TextinputComponent from '../components/FormComponents/TextinputComponent'
import { addFood, deleteDoc} from '../api/FoodApi';

const AddComponent = ({navigation}) => {
  
  const PickerValues = {
    category: ["Select Category","Fruit","Veggie","Dairy","Meat","Liquid"],
    location: ["Select a Location", "Fridge", "Freezer", "Pantry", "Drawer"],
    confection: ["Select a Confection","Fresh","Canned","Frozen","Plastic", "Paper"]
}

  const [name, setName] = useState("");
  const [category, setCategory]   = useState("");
  const [location, setLocation]   = useState("");
  const [confection, setConfection] = useState("");
  const [date, setDate] = useState('26-05-2021');
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState({ 
                                  name: "",
                                  cat: "",
                                  loc: "",
                                  conf: "",
                                  date: ""
                          });

  useEffect(() => {
    setData({ name: name,
        cat: category,
        loc: location,
        conf: confection,
        date: date,
    });
    console.log("UseEffect ran")

  }, [name,category,location,confection,date]); // Only re-run the effect if count changes



  const updateMe = () =>
  {
    setData({ name: name,
        cat: category,
        loc: location,
        conf: confection,
        date: date,
    })
  }

  const checkiTexti = () =>  {
        
        updateMe()
      
        //Check for the Name TextInput
      if (!name.trim()) {
           alert("Please Enter Name, it's Mandatory");
          return;

      }

      addFood(data)


      setName("")
      setCategory("")
      setLocation("")
      setConfection("")
      setDate("26-05-2021")

      setRefresh(true)

        }

    return(   <>
                <TextinputComponent refresh={refresh} title={"Name(*Mandatory)"} name={name} action={setName} />
                
                <PickerComponent refresh={refresh} name="Category" selectedValue={category} options={PickerValues["category"]} action={setCategory} />
                    
                <PickerComponent refresh={refresh} name="Location" selectedValue={location} options={PickerValues["location"]} action={setLocation} />
                    
                <PickerComponent refresh={refresh} name="Confection" selectedValue={confection} options={PickerValues["confection"]} action={setConfection} />

                <TextinputComponent refresh={refresh} title="Expiry Date(Format: DD-MM-YYYY):" name={date} action={setDate}/>

                <Button onPress={checkiTexti} title="Save" />

              </>



  )
}

const styles = StyleSheet.create({
  inputTxt: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  datePickerStyle: {
    borderWidth: 1,
    height: 40,
    width: "auto",
    marginTop: 5,
    margin: 12,
    
  },
  inputLabel: {
    height: 40,
    margin: 12,
    borderWidth: 0,
  },
  text: {
    fontSize: 30,
    textAlign: "center" 
    
  },
  container: {
      flexDirection: "column",
      flex: 1,
    padding: 20,
    },
    headerTwo: {
       flex: 1, 
       backgroundColor: "darkorange"
    },
    headerTwoTxt: {
      textAlign: "center",
      borderWidth: 0,
    },
    containerTwo: {
     flexDirection: "row",
     flex: 8
    },
    inputArea: { 
      flex: 4
    }
});

export default AddComponent;

