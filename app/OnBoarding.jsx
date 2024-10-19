import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming you use expo-linear-gradient
import { images } from '../constants';
import { useState } from 'react';
const OnBoarding = () => {
    
    const [index, setIndex] = useState(0)
    const onBoardingArr = [
        {
            title: 'Track Your Goal',
            description: 'Don\'t worry if you have trouble determining your goals, We can help you determine your goals and track your goals',
            image: images.onBoarding1
        },
        {
            title: 'Get Burn',
            description: 'Let\'s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever',
            image: images.onBoarding2
        },
        {
            title: 'Eat Well',
            description: 'Let\'s start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun',
            image: images.onBoarding3
        },
        {
            title: 'Improve Sleep Quality',
            description: 'Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning',
            image: images.onBoarding4
        }
    ]

    function handleClick() {
        if(index < onBoardingArr.length-1){
            setIndex((prevIndex) => prevIndex + 1)        
        }
        else{

        }
    }
    return (
        <SafeAreaView className="bg-background items-center justify-around">
            <View className="w-full h-full flex-col justify-around">
                <Image source={onBoardingArr[index].image} resizeMode='cover' className="w-full h-80" />
                
                <View className="px-5">
                    <Text className="text-2xl text-white font-pbold mt-5">{onBoardingArr[index].title}</Text>
                    <Text className="text-white mt-5 font-pextralight">
                        {onBoardingArr[index].description}
                    </Text>
                </View>

                <View className="flex-row items-center justify-end w-full px-5 mt-5">
                    <LinearGradient
                        colors={['#983BCB', '#4023D7']}
                        start={{ x: 0.25, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-20 h-20 rounded-full justify-center items-center"
                    >
                        <TouchableOpacity onPress={handleClick} className="w-full h-full justify-center items-center">
                            <Text className="text-white text-xl font-bold">{'>'}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default OnBoarding;
