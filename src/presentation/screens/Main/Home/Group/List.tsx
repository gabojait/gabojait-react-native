import FloatingButton from '@/presentation/components/FloatingButton'
import { GroupStackParamList } from '@/presentation/navigation/types'
import { StackScreenProps } from '@react-navigation/stack'
import {CardTitle} from '@rneui/base/dist/Card/Card.Title'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {FlatList, PixelRatio, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import GroupListCard, {Part} from '../../../../components/GroupListCard'

export type GroupStackParamListProps = StackScreenProps<GroupStackParamList, 'List'>

const List = ({navigation}:GroupStackParamListProps) => {
  const {theme} = useTheme() 
  const arr = [
  [new Part('design', 'D', ['KimWash']),
  new Part('p????', 'P', ['KimWash']),
  new Part('frontend', 'F', ['KimWash']),
  new Part('backend', 'B', ['KimWash'])],
]
  function moveToNext(){
    console.log("navigate!")
    navigation.navigate('Detail')
  }
  
  return (
    <View style={{flex: 1, flexGrow:1, backgroundColor: 'white', justifyContent:'flex-end', position:'relative'}}>
      <FlatList
        keyExtractor={item => item.toString()}
        data={arr}
        renderItem={({item}) => 
          <GroupListCard
            title="가보자잇"
            parts={item}
          />}
      />
      <View style={{position:'absolute',flex:1, flexDirection:'column-reverse',justifyContent:'flex-start', alignItems:'flex-end', width: '95%', backgroundColor:theme.colors.disabled}}>
        <FloatingButton title='팀 생성' onPress={() => moveToNext()}/>
      </View>
    </View>
  )
}

export default List
