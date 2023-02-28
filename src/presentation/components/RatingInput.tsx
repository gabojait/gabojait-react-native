import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import GabojaitIcon from '@/presentation/components/icon/Gabojait'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import { useTheme } from '@rneui/themed'

interface RatingInputProps{
    ratingScore: ()=>void,
    size?: number
}
interface StarStateProps{
    state:'star-filled'|'star-empty'|'star-half'
}
interface StarColorProps{
    color: '#1CDF71' | 'black'
}
interface StarSizeProps{
    size: number
}
interface StarPaddingTopProps{
    paddingTop: number
}
interface RatingInputModel{
    stateArray: Array<StarStateProps>,
    ratingScore: number,
    colorArray: Array<StarColorProps>,
    sizeArray: Array<StarSizeProps>,
    paddingTopArray: Array<StarPaddingTopProps>
}
export const RatingInput = ({ratingScore, size=26}: RatingInputProps) => {
    const {theme} = useTheme()
    const stateArray = Array<StarStateProps>({state:'star-empty'},{state:'star-empty'},{state:'star-empty'},{state:'star-empty'},{state:'star-empty'})
    const colorArray = Array<StarColorProps>({color: 'black'},{color: 'black'},{color: 'black'},{color: 'black'},{color: 'black'})
    //star-empty, star-filled, star-half 모두 같은 사이즈여도 아이콘 자체사이즈가 들쑥날쑥함. 3가지 상대적인 크기를 맞춰줘야 함
    const sizeArray = Array<StarSizeProps>({size: size-1},{size: size-1},{size: size-1},{size: size-1},{size: size-1})
    const paddingTopArray = Array({paddingTop: 3},{paddingTop: 3},{paddingTop: 3},{paddingTop: 3},{paddingTop: 3})
    const [ratingState, setRatingState] = useState<RatingInputModel>(
        {
            stateArray: stateArray,
            ratingScore: 0,
            colorArray: colorArray,
            sizeArray: sizeArray,
            paddingTopArray: paddingTopArray
        }
    )

    const setRatingBar = (ratingScore: Float) => {
        console.log(ratingScore)
        let starFilled = Math.floor(ratingScore)
        let starHalf = Math.ceil(ratingScore - starFilled)
        let starEmpty = 5 - starFilled - starHalf
        
        var i = 0
        for (var k = 0; k < starFilled; k++){
            stateArray[i].state = 'star-filled'
            colorArray[i].color = '#1CDF71'
            sizeArray[i].size = size + 4
            paddingTopArray[i].paddingTop = 0
            i += 1
        }
        for (let k = 0; k < starHalf; k++){
            stateArray[i].state = 'star-half'
            colorArray[i].color = '#1CDF71'
            sizeArray[i].size = size + 7
            paddingTopArray[i].paddingTop = 0
            i += 1
        }
        for (let m = 0; m < starEmpty; m++){
            stateArray[i].state = 'star-empty'
            colorArray[i].color = 'black'
            sizeArray[i].size = size - 1
            paddingTopArray[i].paddingTop = 3
            i += 1
        }

        for (let i=0; i<5; i++){
            console.log(ratingState.stateArray[i])
        }
        setRatingState( prevState => ({...prevState, stateArray: stateArray}) )
        setRatingState( prevState => ({...prevState, colorArray: colorArray}) )
        setRatingState( prevState => ({...prevState, sizeArray: sizeArray}) )
        setRatingState( prevState => ({...prevState, paddingTopArray: paddingTopArray}) )
    }

    return (
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => setRatingBar(1)}>
                <GabojaitIcon name={ratingState.stateArray[0].state} size={ratingState.sizeArray[0].size} color={ratingState.colorArray[0].color} style={{paddingTop:ratingState.paddingTopArray[0].paddingTop, paddingHorizontal:1.5}}/>
                <TouchableOpacity onPress={()=> setRatingBar(0.5)} style={{height:30, width:17, position:'absolute'}}/>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => setRatingBar(2)}>
                <GabojaitIcon name={ratingState.stateArray[1].state} size={ratingState.sizeArray[1].size} color={ratingState.colorArray[1].color} style={{paddingTop:ratingState.paddingTopArray[1].paddingTop, paddingHorizontal:1.5}}/>
                <TouchableOpacity onPress={() => setRatingBar(1.5)} style={{height:30, width:17, position:'absolute'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRatingBar(3)}>
                <GabojaitIcon name={ratingState.stateArray[2].state} size={ratingState.sizeArray[2].size} color={ratingState.colorArray[2].color} style={{paddingTop:ratingState.paddingTopArray[2].paddingTop, paddingHorizontal:1.5}}/>
                <TouchableOpacity onPress={() => setRatingBar(2.5)} style={{height:30, width:17, position:'absolute'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRatingBar(4)}>
                <GabojaitIcon name={ratingState.stateArray[3].state} size={ratingState.sizeArray[3].size} color={ratingState.colorArray[3].color} style={{paddingTop:ratingState.paddingTopArray[3].paddingTop, paddingHorizontal:1.5}}/>
                <TouchableOpacity onPress={() => setRatingBar(3.5)} style={{height:30, width:17, position:'absolute'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRatingBar(5)}>
                <GabojaitIcon name={ratingState.stateArray[4].state} size={ratingState.sizeArray[4].size} color={ratingState.colorArray[4].color} style={{paddingTop:ratingState.paddingTopArray[4].paddingTop, paddingHorizontal:1.5}}/>
                <TouchableOpacity onPress={()=> setRatingBar(4.5)} style={{height:30, width:17, position:'absolute'}}/>
            </TouchableOpacity>
        </View>
    )
}