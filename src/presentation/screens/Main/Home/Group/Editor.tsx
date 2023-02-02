import { FilledButton } from '@/presentation/components/Button'
import { CustomInput } from '@/presentation/components/CustomInput'
import { PositionMaker } from '@/presentation/components/PositionMaker'
import { GroupStackParamList } from '@/presentation/navigation/types'
import color from '@/presentation/res/styles/color'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, useTheme, makeStyles } from '@rneui/themed'
import React, { useState } from 'react'
import { FlatList, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'

export type GroupStackProps = StackScreenProps<GroupStackParamList, 'Editor'>

const Editor = ({navigation, route}: GroupStackProps) => {
  const {theme} = useTheme()
  const styles = useStyles({navigation, route})
  const [array, setArray] = useState([{idex:'0'}])
  const [addCount, setAddCount] = useState(1)
  const addPositionMaker = () => {
    let newArray = [...array, {idex: (addCount + 1).toString()}]
    setArray(newArray)
    setAddCount(addCount + 1)
    console.log(addCount)
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
          <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {addPositionMaker()}} disabled={addCount > 3? true: false}>
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
            <FilledButton title={'완료'} disabled={false} />
            <FilledButton title={'삭제하기'} buttonStyle={{backgroundColor:theme.colors.grey0}}/>
          </View>
        </>}
      />
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