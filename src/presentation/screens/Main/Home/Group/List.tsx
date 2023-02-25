import CustomModal from '@/presentation/components/modalContent/CustomModal'
import FloatingButton from '@/presentation/components/FloatingButton'
import { GroupStackParamList } from '@/presentation/navigation/types'
import { StackScreenProps } from '@react-navigation/stack'
import {useTheme} from '@rneui/themed'
import React, { useState } from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
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
  const [modalOpened, setModalOpened] = useState(true)
  
  return (
    <View style={{flex: 1, flexGrow:1, backgroundColor: 'white', justifyContent:'flex-end', position:'relative'}}>
      <FlatList
        keyExtractor={item => item.toString()}
        data={arr}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <GroupListCard
            title="가보자잇"
            parts={item}
          />
        </TouchableOpacity>}
      />
      <View style={{position:'absolute',flex:1, flexDirection:'column-reverse',justifyContent:'flex-start', alignItems:'flex-end', width: '95%', backgroundColor:theme.colors.disabled}}>
        <FloatingButton title='팀 생성' onPress={() => navigation.navigate('Editor')}/>
      </View>
      <CustomModal 
        title={'팀 찾기 모드로 변경하시겠어요?'}
        upperButtonText={'변경하기'} 
        lowerButtonText={'나중에하기'} 
        modalVisible={modalOpened} 
        onModalVisibityChanged={visibility => setModalOpened(visibility)}
        callback={() => {}}
        neverSeeAgainButton={true}
      >
        <Text style={{fontSize:theme.fontSize.sm, alignItems:'center'}}>
          팀 찾기 모드로 변경하면
        </Text>
        <Text style={{fontSize:theme.fontSize.sm, alignItems:'center'}}>
          원하는 팀을 찾아서 함께할 수 있습니다!
        </Text>
      </CustomModal>
    </View>
  )
}

export default List
