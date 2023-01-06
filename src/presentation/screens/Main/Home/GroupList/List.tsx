import {CardTitle} from '@rneui/base/dist/Card/Card.Title'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
import GroupListCard, {Part} from '../../../../components/GroupListCard'

const List = () => {
  const {theme} = useTheme()
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GroupListCard title="가보자잇" parts={[new Part('design', '디자인', ['KimWash']),new Part('frontend', '프론트엔드', ['KimWash'])]} />
    </View>
  )
}

export default List
