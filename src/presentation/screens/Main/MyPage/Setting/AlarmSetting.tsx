import {CustomSwitch} from '@/presentation/components/CustomSwitch'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AsyncStorageKey} from "@/lib/asyncStorageKey";

const AlarmSetting = ({navigation}: MainStackScreenProps<'AlarmSetting'>) => {
    const {theme} = useTheme()

    useEffect(() => {
         AsyncStorage.getItem(AsyncStorageKey.alertEnabled).then(res => {

         })

    }, [])

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 25,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: theme.colors.disabled
            }}>
                <Text style={{
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.semibold,
                    color: 'black',
                    textAlignVertical: 'center'
                }}>모든 알림</Text>

                <CustomSwitch onChange={toggleSwitch} value={isEnabled}/>
            </View>
        </View>
    )
}

export default AlarmSetting