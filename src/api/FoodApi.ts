import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase  from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCR7dCT2T_S7YWQs2bVpRbxpy8sk6zq1io",
  authDomain: "myfirstapp-f5bb9.firebaseapp.com",
  databaseURL: "https://myfirstapp-f5bb9.firebaseio.com",
  projectId: "myfirstapp-f5bb9",
  storageBucket: "myfirstapp-f5bb9.appspot.com",
  messagingSenderId: "805027926589",
  appId: "1:805027926589:web:91b1bc49fbc4cc461ad054"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}


interface itemValues{
  name:string,
  oldname: string,
  category: string,
  location: string,
  confection: string,
  date: string,
  created: string
}

export const addFood = (props) => {
  

  const db = firebase.firestore()

    if (props.name) {

      db.collection('food')
        .add({
          name: props.name,
          cat: props.cat,
          loc: props.loc,
          conf: props.conf,
          date: props.date,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            //console.log("Success!")
        })
        .catch((error) => {
            console.log("Ne, Error hier: "+error);
        }); 
    }

}


export const editFood = async (props:itemValues) => {

  const db = firebase.firestore()

    if (props.name) {

        const id = await getIDbyName(props.oldname)



      db
      .collection('food')
      .doc(""+id)
      .update({
        name: props.name,
        loc: props.location,
        conf: props.confection,
        cat: props.category,
        date: props.date,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('User updated?');
        console.log(props.name)
      });
    }


}
// First send data to Food API
// Second take old name and look up id by name
// Third prepare obj for update
// Fourth send firebase request

export const getIDbyName = async (name:string) => {

  let id: String[] = []
  const db = firebase.firestore()
  const food = db.collection('food');
  const snapshot = await food.where('name', '==', name).get();  

      if (snapshot.empty) {
          console.log('No matching documents.');
      }  

  snapshot.forEach(doc => {

      console.log(doc.id);
      id.push(doc.id);
  });


      //alert("hello idg:"+id.length)


      if(id.length === 0){
        id[0] = "Error: Not found"
      }else if(id.length > 1){
        id[0] = "Error: More than one result"
      }


      let result:String = id[0]

      return result
}

/////////////////////////////////////////////////////

export const deleteDoc =  async (name:string) =>{

  try{

    const id = await getIDbyName(name)

    const db = firebase.firestore();
    const res = await db.collection('food').doc(""+id).delete();
      alert("Sucessfully Delted: "+name)
  }
  catch(error){

    alert(error)

  }

}
////////////////////////////////////////////////////

///////////////////////////////////////////////////

export const getFoodList = async () => {

const data = [];

  var snapshot = await firebase.firestore().collection("food").get()

  snapshot.forEach((doc) => {   
        data.push(doc.data())
  });

  return data;

}

///////////////////////////////////////////////

export const getFoodListBy = async (cat) => {

  let data = [];

  console.log("FoodAPI: ")
  console.log(cat)

  let searchType = ""
  let operator = "=="
  switch(cat){
      case 'category: fruit':
        cat= "fruit"
        searchType = "cat"
        operator = '=='
        break;

      case 'category: veggie':
        cat= "veggie"
        searchType = "cat"
        operator = '=='
        break;
      case 'category: dairy':
        cat= "dairy"
        searchType = "cat"
        operator = '=='
        break;
      case 'category: meat':
        cat= "meat"
        searchType = "cat"
        operator = '=='
        break;
      case 'category: liquid':
        cat= "liquid"
        searchType = "cat"
        operator = '=='

          break;

      case 'location: fridge':
        cat="fridge"
        searchType = "loc"
        operator = '=='

        break;
      case 'location: freezer':
        cat="freezer"
        searchType = "loc"
        operator = '=='

        break;
      case 'location: pantry':
        cat="pantry"
        searchType = "loc"
        operator = '=='

        break;
      case 'location: drawer':
          cat="drawer"
          searchType = "loc"
          operator = '=='

          break;

      case 'confection: fresh':
        cat ="fresh"
        searchType = "conf"
        operator = '=='

        break;
      case 'confection: canned':
        cat ="canned"
        searchType = "conf"
        operator = '=='

        break;
      case 'confection: frozen':
        cat ="frozen"
        searchType = "conf"
        operator = '=='

        break;
      case 'confection: plastic':
        cat ="plastic"
        searchType = "conf"
        operator = '=='

        break;
      case 'confection: paper':
        cat ="paper"
        searchType = "conf"
        operator = '=='

          break;
      case 'missing data':

          searchType = "nodata"
          operator = '=='

          break;
      case 'recently added(descending)':
          searchType = "recent"
          operator = '>='

          console.log("Here we are at recently:")
            break;
      case 'expire soon':
          searchType = "expire"
          operator = "<="

      break;

    default:
      searchType="error"
      operator = '=='
      console.log("something went wrong")

  }

  if(searchType === "nodata"){

    //get all food with missing data

    var snapshot = await firebase.firestore().collection("food").where('cat', '==','').get()

    snapshot.forEach((doc) => {   
      data.push(doc.data())
});


    var snapshot2 = await firebase.firestore().collection("food").where('conf', '==','').get()
  
    snapshot2.forEach((doc) => {   
        data.push(doc.data())
      });
      
    var snapshot3 = await firebase.firestore().collection("food").where('cat', '==','').get()
  
    snapshot3.forEach((doc) => {   
        data.push(doc.data())
        });

          //filter double objects
          const newArrayList = [];
          data.forEach(obj => {
            if (!newArrayList.some(name => name.name === obj.name)) {
              newArrayList.push({...obj});
            }
          });
       
         data =  newArrayList
        
            //console.log(data)
  } else if(searchType === "recent") {

    console.log("Test Recent here")

    var snapshot = await firebase.firestore().collection("food").orderBy('created','desc').get()

    snapshot.forEach((doc) => {   
          data.push(doc.data())
      });


  }
  else if(searchType === "expire") {

    //console.log("Test expire here")

    var snapshot = await firebase.firestore().collection("food").get()

    snapshot.forEach((doc) => {   
          data.push(doc.data())
      });

      /**
       * 
       * Attention BIG ISSUE with local nodeJS / expo and on snack.exppo !!!!
       * 
       * Format needed on local enviroment for new date("YYYY-MM-DD")
       * 
       * Format needed on snack.expo for new Date("MM-DD-YYYY")
       * 
       * German Format saved in firestore DD-MM-YYYY xD
       * 
       */

      data.sort(function compare (a,b) {
        // getting DD-MM-YYYY
           let dateADay = a.date.substr(0,2)
           let dateAMonth = a.date.substr(3,2)
           let dateAYear = a.date.substr(6,4)
       /// need MM-DD-YYYY
        // getting DD-MM-YYYY
           let dateBDay = b.date.substr(0,2)
           let dateBMonth = b.date.substr(3,2)
           let dateBYear = b.date.substr(6,4)
       /// need MM-DD-YYYY
           let dateA = new Date(dateAYear+"-"+dateAMonth+"-"+dateADay)
           let dateB = new Date(dateBYear+"-"+dateBMonth+"-"+dateBDay)
       
           return dateA - dateB
       });
  }
  else {
      let snapshot = await firebase.firestore().collection("food").where(searchType, operator,cat).get()

          snapshot.forEach((doc) => {   
        data.push(doc.data())
        });
//console.log("Type is:"+searchType)

  }

    return data;
  
  }

