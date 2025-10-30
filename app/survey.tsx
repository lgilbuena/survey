import { Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from "react";
import { Button } from "@react-navigation/elements";
import axios from "axios";
import {useRouter } from 'expo-router';
import Config from './config';
export default function Survey() {
  const [sliderVal,setSliderVal] = useState(0);
  const router = useRouter();
  function handleSliderChange(value: any){

    setSliderVal(value)
  }
  const handleSubmit = async () =>{
    try{
      // replace ipv4 with your ipv4
      router.push('/welcome')
      console.log(Config.IPV4)
      const resp = await axios.post(`http://${Config.IPV4}:5000/api/submit`,{value:sliderVal});
      console.log("success!");
      
    }catch(error){
      console.log(`received ${error}`);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>How are you feeling today?: {sliderVal}</Text>
      <Slider
        style={{
          width: '80%',
          
        }}
        step={1}
        minimumValue={1}
        maximumValue={10}
        onValueChange={handleSliderChange}></Slider>
        <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
}
