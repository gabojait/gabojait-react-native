import { useTheme } from '@rneui/themed'
import React, { useState } from 'react'
import { PixelRatio, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Gabojait from '@/presentation/components/icon/Gabojait'

interface positionProps{
  callback: any,
  data: {}[]
}

export const PositionMaker = ({
  callback, data
  }: positionProps) => {
    
  const {theme} = useTheme()
  const [position, setPosition] = useState("")
  const [count, setCount] = useState(0)
  const [select, setSelected] = useState(false)
  const [codename, setCodename] = useState('')
  function increase(){
    setCount(count + 1)
    callback(count + 1, position)
  }
  function decrease(){
    count > 0 ? setCount(count - 1) : {}
    callback(count - 1, position)
  }
  function setImage(position:string){
    setSelected(true)
    if (position == '벡엔드 개발자') setCodename('B')
    if (position == '프론트엔드 개발자') setCodename('F')
    if (position == '디자이너') setCodename('D')
    if (position == 'PM') setCodename('P')
  }
    return (
      <View style={{paddingBottom:20}}>
        <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'center', width:'100%'}}>
          <View style={{alignItems:'center'}}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <View
                style={{
                  borderColor: select? theme.colors.primary:theme.colors.grey0,
                  borderWidth: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
                  width: PixelRatio.getPixelSizeForLayoutSize(20),
                  height: PixelRatio.getPixelSizeForLayoutSize(20),
                  marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
                  backgroundColor: select? theme.colors.primary:theme.colors.grey0,
                }}
              />
              <Text style={{fontSize:30, fontWeight:theme.fontWeight.bold, position:'absolute', color:'black'}}>{codename}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{width:15, height:21, backgroundColor: theme.colors.grey0, alignItems:'center',marginTop: 10}}>
                <TouchableOpacity  onPress={() => increase()}>
                  <Gabojait name='plus' size={13} style={styles.plusIcon} color={theme.colors.grey2}/>
                </TouchableOpacity>
              </View>
              <View style={{width:51, height:21, backgroundColor: theme.colors.grey0, alignItems:'center', marginTop: 10}}>
                <Text style={{color:theme.colors.grey2, fontSize:17}}>{count}</Text>
              </View>
              <View style={{width:15, height:21, backgroundColor: theme.colors.grey0, alignItems:'center', marginTop: 10}}>
                <TouchableOpacity onPress={() => decrease()}>
                <Gabojait name='minus' size={2} style={styles.minusIcon} color={theme.colors.grey2}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SelectList
            placeholder='팀원 직무를 선택해주세요'
            setSelected={(value:string, key:string) => {
              setPosition(value)
            }}
            data = {data}
            save="value"
            boxStyles={{backgroundColor: theme.colors.grey0, borderColor: theme.colors.grey0, marginTop:6, marginLeft:10, width: 200}}
            search={false}
            onSelect={() => {
              setImage(position)
            }}
            dropdownStyles={{backgroundColor: theme.colors.grey0, borderColor: theme.colors.grey0}}
          />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
  plusIcon: {
    flex:1,
     ...Platform.select({
      ios:{
        paddingTop:3
      },
      android: {
        textAlignVertical:'center',
      }
     })
  },
  minusIcon: {
    flex:1,
     ...Platform.select({
      ios:{
        paddingTop:9
      },
      android: {
        textAlignVertical:'center',
      }
     })
  }
});