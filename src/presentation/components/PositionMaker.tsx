import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { decreaseCount, increaseCount } from '@/redux/reducers/countReducer'
import { useTheme } from '@rneui/themed'
import React, { useState } from 'react'
import { PixelRatio, Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

interface positionProps{
  callback: any
}

export const PositionMaker = ({
  callback
  }: positionProps) => {
    
  const {theme} = useTheme()
  const dispatch = useAppDispatch()
  const {number} = useAppSelector(state => state.countReducer)
  const [position, setPosition] = useState("")
  const data = [
      {key:'1', value:'Frontend'},
      {key:'2', value:'Backend'},
      {key:'3', value:'Designer'},
      {key:'4', value:'ProductManager'}
  ]

  function increase(){
    dispatch(increaseCount())
    callback(number, position)
  }
  function decrease(){
    dispatch(decreaseCount())
    callback(number, position)
  }

    return (
      <View style={{paddingBottom:20}}>
        <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'center', width:'100%'}}>
          <View style={{alignItems:'center'}}>
            <View
              style={{
                borderColor: theme.colors.grey0,
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
                backgroundColor: theme.colors.grey0,
              }}
            />
            <View style={{flexDirection:'row'}}>
              <View style={{width:10, height:21, backgroundColor: theme.colors.grey0, alignItems:'center', marginTop: 10}}>
                <TouchableOpacity  onPress={() => decrease()}>
                  <Text>ㅡ</Text>
                </TouchableOpacity>
              </View>
              <View style={{width:51, height:21, backgroundColor: theme.colors.grey0, alignItems:'center', marginTop: 10}}>
                <Text>{number}</Text>
              </View>
              <View style={{width:10, height:21, backgroundColor: theme.colors.grey0, alignItems:'center', marginTop: 10}}>
                <TouchableOpacity onPress={() => increase()}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SelectList
            placeholder='팀원 직무를 선택해주세요'
            setSelected={(value:string) => setPosition(value)}
            data = {data}
            save="value"
            boxStyles={{backgroundColor: theme.colors.grey0, borderColor: theme.colors.grey0, marginTop:6, marginLeft:10, width: 200}}
            search={false}
            onSelect={() => {
              callback(number, position)
            }}
          />
        </View>
      </View>
    )
}