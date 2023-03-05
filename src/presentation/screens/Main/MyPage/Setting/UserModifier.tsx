import { CustomSwitch } from '@/presentation/components/CustomSwitch'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { Text, View } from 'react-native'

const UserModifier = ({navigation}:MainStackScreenProps<'UserModifier'>) => {
    const {theme} = useTheme()
    
    return(
        <View style={{backgroundColor:'white', flex:1}}>
        </View>
    )
}

export default UserModifier