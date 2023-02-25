import React from 'react'
import { View } from 'react-native'
import GabojaitIcon from '@/presentation/components/icon/Gabojait'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'
import { useTheme } from '@rneui/themed'

interface RatingProps{
    ratingScore: Float
  }

export const RatingBar = ({ratingScore}: RatingProps) => {
    ratingScore = ratingScore > 5? 5: ratingScore
    const starFilled = Math.floor(ratingScore)
    const starHalf = Math.round(ratingScore - starFilled)
    const starEmpty = 5 - starFilled - starHalf

    let starFilledArray = new Array()
    let starHalfArray = new Array()
    let starEmptyArray = new Array()

    for (let i=0; i<starFilled; i++){ starFilledArray.push('0') }
    for (let i=0; i<starHalf; i++){ starHalfArray.push('0') }
    for (let i=0; i<starEmpty; i++){ starEmptyArray.push('0') }

    const {theme} = useTheme()

    return (
        <View style={{flexDirection:'row'}}>
            {
                starFilledArray.map(() => { return(<GabojaitIcon name="star-filled" size={25} color={theme.colors.primary}/>) })
            }
            {
                starHalfArray.map(() => { return(<GabojaitIcon name="star-half" size={26} color={theme.colors.primary}/>) })
            }
            {
                starEmptyArray.map(() => { return(<GabojaitIcon name="star-empty" size={20} style={{paddingTop: 1}}/>) })
            }
        </View>
    )
}