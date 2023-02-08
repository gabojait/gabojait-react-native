import { FilledButton } from '@/presentation/components/Button'
import { CustomInput } from '@/presentation/components/CustomInput'
import { PositionMaker } from '@/presentation/components/PositionMaker'
import { GroupStackParamList } from '@/presentation/navigation/types'
import color from '@/presentation/res/styles/color'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, useTheme, makeStyles } from '@rneui/themed'
import React, { useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import CustomModal from '@/presentation/components/CustomModal'

export type GroupStackProps = StackScreenProps<GroupStackParamList, 'Editor'>

const Editor = ({navigation, route}: GroupStackProps) => {
  const {theme} = useTheme()
  const styles = useStyles({navigation, route})
  const [array, setArray] = useState([{idex:'0'}])
  const [positionMakerCount, setPositionMakerCount] = useState(1)
  const [modalOpened, setModalOpened] = useState(false)

  function addPositionMaker() {
    let newArray = [...array, {idex: (positionMakerCount + 1).toString()}]
    setArray(newArray)
    setPositionMakerCount(positionMakerCount + 1)
    console.log(positionMakerCount)
  }
  
  return (
    <>
      <FlatList
        ListHeaderComponent={<>
          <View style={styles.item}>
            <Text style={styles.text}>프로젝트 이름</Text>
            <View style={[styles.inputBox, {borderRadius:15}]}>
              <TextInput style={[styles.input, {height: 50}]} multiline={false} maxLength={30} placeholder='개발용: 최대 30자'/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>프로젝트 설명</Text>
            <View style={[styles.inputBox, {borderRadius:20}]}>
              <TextInput style={[styles.input, {height: 160}]} multiline={true} maxLength={500} placeholder='개발용: 최대 500자'/>
            </View>
          </View>
          <Text style={styles.text}>원하는 팀원</Text>
        </>}

        keyExtractor={item => item.idex}
        data={array}
        renderItem={ () => <PositionMaker callback={()=> {/*number, position 바인딩하면 됨*/}}/>}
        contentContainerStyle={{backgroundColor: theme.colors.white, paddingHorizontal:20}}

        ListFooterComponent={<>
          <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {addPositionMaker()}} disabled={positionMakerCount > 3? true: false}>
            <CustomIcon name="plus-square" size={25}/>
          </TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.text}>바라는 점</Text>
            <View style={[styles.inputBox, {borderRadius:20}]}>
              <TextInput style={[styles.input, {height: 95}]} multiline={true} maxLength={200} placeholder='개발용: 최대 200자'/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>오픈채팅 링크</Text>
            <View style={[styles.inputBox, {borderRadius:20}]}>
              <TextInput style={[styles.input, {height: 50}]} multiline={true} maxLength={200} placeholder='개발용: 최대 200자'/>
            </View>
          </View>

          <View style={{paddingHorizontal: 30}}>
            <FilledButton title={'완료'} disabled={false} onPress={() => navigation.popToTop()}/>
            <FilledButton title={'삭제하기'} buttonStyle={{backgroundColor:theme.colors.grey0}} onPress={() => setModalOpened(true)}/>
          </View>
        </>}
      />
      <CustomModal 
        title={'글을 삭제하시겠습니까?'}
        upperButtonText={'삭제하기'} 
        lowerButtonText={'돌아가기'} 
        modalVisible={modalOpened} 
        onModalVisibityChanged={visibility => setModalOpened(visibility)}
        callback={() => navigation.popToTop()}
      >
        <Text style={{fontSize:theme.fontSize.sm, alignItems:'center'}}>
          글을 삭제하면
        </Text>
        <Text style={{fontSize:theme.fontSize.sm, alignItems:'center'}}>
          다시 되돌릴 수 없습니다 :()
        </Text>
      </CustomModal>
    </>    
  )
}
const useStyles = makeStyles((theme, props: GroupStackProps) => ({
  view: {
    backgroundColor: color.white,
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize:theme.fontSize.sm,
    fontWeight:theme.fontWeight.bold,
    paddingBottom: 10
  },
  input:{
    flex: 10,
    paddingVertical:5
  },
  inputBox:{
    flex:1,
    width:'100%',
    flexDirection:'row',
    borderWidth: 1.3,
    borderColor: theme.colors.disabled,
    shadowOpacity: theme.shadow.opacity,
    shadowOffset: theme.shadow.shadowOffset,
    elevation: theme.shadow.elevation,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    marginBottom: 20
  },
}))
export default Editor