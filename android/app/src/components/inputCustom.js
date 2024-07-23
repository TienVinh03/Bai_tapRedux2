import React from "react";
import { StyleSheet,View,TextInput,Text } from "react-native";

const TextInputCustom = (props)=>{
    return(
        <View>
            <Text>{props.lable}</Text>
            <TextInput  {...props}
            style={[props.style,st.khung]}
            placeholderTextColor={props.colorplacehodler||"gray"}
            />
        </View>
    )
}
export default TextInputCustom;
const st = StyleSheet.create({
    khung:{
        borderWidth:1,
        borderColor:'red',
        padding:10
    }
})