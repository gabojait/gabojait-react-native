import GroupListCard, { Part } from '@/presentation/components/TeamBanner'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

const OfferPage = ({navigation}:MainStackScreenProps<'OfferPage'>) => {
    const arr = [
        [new Part('design', 'D', ['KimWash']),
        new Part('p????', 'P', ['KimWash']),
        new Part('frontend', 'F', ['KimWash']),
        new Part('backend', 'B', ['KimWash'])],
        ]
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <FlatList
            showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                data={arr}
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => navigation.navigate('GroupDetail')}>
                    <GroupListCard
                        title="가보자잇"
                        parts={item}
                    />
                    </TouchableOpacity>
                    }
            />
        </View>
    )
}

export default OfferPage