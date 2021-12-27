import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ToastAndroid,
    Image,
    Animated,
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';

import { dummyData ,icons ,COLORS , images,SIZES } from "../constants";

const Home = ({ navigation }) => {

    const newSeasonScrollX = useRef(new Animated.Value(0)).current;

    const renderHeader = () => {
        return(
            <View style={{flexDirection:"row" ,paddingHorizontal:SIZES.padding, justifyContent:"space-between" , alignItems:'center'}}>
                <TouchableOpacity 
                    style={{alignItems:"center" ,justifyContent:"center" ,width:50 ,height:50}}
                    onPress={()=>{ToastAndroid.show("Profile ",ToastAndroid.SHORT)}}    
                >
                    <Image source={images.profile_photo} style={{width:40 , height:40 , borderRadius:20}} />                    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{alignItems:"center" ,justifyContent:"center" ,width:50 ,height:50}}
                    onPress={()=>{ToastAndroid.show("Screen Mirror ",ToastAndroid.SHORT)}}
                >
                    <Image source={icons.airplay} style={{width:25 , height:25 , tintColor:COLORS.primary}} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderNewSeasonSection = () => {
        return(
            <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={SIZES.width}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop:SIZES.radius,
                }}
                data={dummyData.newSeason}
                keyExtractor={item =>`${item.id}`}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{x:newSeasonScrollX}}},
                ] , {useNativeDriver:false} )} 
                renderItem={({item ,index})=>{
                    return(
                        <TouchableWithoutFeedback onPress={()=>{navigation.navigate('MovieDetail' , {selectedMovie: item})}}>
                            <View style={{width:SIZES.width , alignItems:"center" , justifyContent:"center"}}>
                                <ImageBackground
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{width:SIZES.width * 0.85 , height:SIZES.width * 0.85 ,justifyContent:"flex-end"}}  imageStyle={{borderRadius:40}}                               
                                >
                                    {/* 16:26 Remianing */}
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
        )
    }

    return (
        <SafeAreaView style={{flex:1 , backgroundColor:COLORS.black}}>
            {renderHeader()}
            <ScrollView contentContainerStyle = {{paddingBottom:100}}>
                {renderNewSeasonSection()}
            </ScrollView>
        </SafeAreaView>
        )
}

export default Home;