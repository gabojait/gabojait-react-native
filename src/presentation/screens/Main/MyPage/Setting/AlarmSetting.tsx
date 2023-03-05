import { CustomSwitch } from '@/presentation/components/CustomSwitch'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { Text, View } from 'react-native'

const AlarmSetting = ({navigation}:MainStackScreenProps<'AlarmSetting'>) => {
    const {theme} = useTheme()
    
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>공지사항 알림</Text>
                <CustomSwitch/>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>팀 빌딩 전 알림</Text>
                <CustomSwitch/>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>팀 완성 후 알림</Text>
                <CustomSwitch/>
            </View>
        </View>
    )
}

export default AlarmSetting