import React, {useEffect, useState} from 'react';
import { Text, TextInput} from 'react-native';



interface propsTextinput {
    name: string,
    title:string,
    refresh: boolean,
    action: (value:string) => void
}


const inputComponent = (props:propsTextinput) => {

    
    const [item, setItem] = useState(props.name);

     useEffect(() => {
        
        setItem(props.name)

       }, [item, props.refresh, props.name]);

   
    return( <>
                <Text style={{margin:10}}>{props.title}:</Text>
                <TextInput
                    style={{borderWidth: 1, margin:10}}
                    onChangeText={(item) => {setItem(item); props.action(item)}}
                    value={item}
                /> 
            </>
    );
};

export default inputComponent;