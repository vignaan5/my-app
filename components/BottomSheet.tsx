import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import  Animated, { useAnimatedStyle, useSharedValue, withTiming }  from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {height: SCREEN_HEIGHT}=Dimensions.get('window'); 



const Stack = createNativeStackNavigator();


function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }


const BottomSheet = () => {
    const translateY = useSharedValue(0)
     const context = useSharedValue({y:0});

    useEffect(()=>{translateY.value= withTiming(-SCREEN_HEIGHT/3)},[]);

    const rBottomSheetStyle = useAnimatedStyle(()=>
    {return {transform:[{translateY:translateY.value}]}});

    const gesture=Gesture.Pan().onStart(()=>{context.value={y:translateY.value}}).onUpdate((event)=>
    {
              translateY.value=event.translationY+context.value.y;
              translateY.value=Math.max(translateY.value,-SCREEN_HEIGHT);

    });

  return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomsheetcontainer,rBottomSheetStyle]}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
bottomsheetcontainer:
{
  height:SCREEN_HEIGHT,
  width:'100%',
  backgroundColor:'white',
  position:'absolute',
  top:SCREEN_HEIGHT,
  borderRadius:25,
},

})