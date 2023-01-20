import {CardTitle} from '@rneui/base/dist/Card/Card.Title'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
import GroupListCard, {Part} from '../../../../components/GroupListCard'

const List = () => {
  const {theme} = useTheme()
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>홍길동</Text>
      <Text>디자인</Text>
      <Text>별점</Text>
    </View>
  )
}

export default List
