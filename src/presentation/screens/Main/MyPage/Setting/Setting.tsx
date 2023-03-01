import Gabojait from '@/presentation/components/icon/Gabojait'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Setting = ({navigation}:MainStackScreenProps<'Setting'>) => {
    const {theme} = useTheme()
    
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('UserModifier')}
                style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}
            >
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>회원 정보 수정</Text>
                <Gabojait name='arrow-next' size={30} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('AlarmSetting')}
                style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}
            >
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>알림 설정</Text>
                <Gabojait name='arrow-next' size={30} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Etc')}
                style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}
                >
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:'black', textAlignVertical:'center'}}>기타</Text>
                <Gabojait name='arrow-next' size={30} color={theme.colors.primary} />
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:25, paddingHorizontal:20, borderTopWidth:1, borderTopColor: theme.colors.disabled}}>
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:theme.colors.grey3, textAlignVertical:'center'}}>버전</Text>
                <Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.semibold, color:theme.colors.grey3, textAlignVertical:'center'}}>1.0.0.</Text>
            </View>
        </View>
    )
}

export default Setting