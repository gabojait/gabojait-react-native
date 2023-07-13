import {useTheme} from '@rneui/themed'
import React, {Key, useEffect, useState} from 'react'
import {Animated, ScrollView, TouchableOpacity, View} from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import PositionCountDto from '@/data/model/Team/PostionCountDto'
import PositionDropdownContent from '../model/PositionDropdownContent'
import {Position} from '@/data/model/type/Position'
import {PositionTextName} from '../model/PositionTextName'
import PositionRecruiting from '../model/PositionRecruitng'
import {PositionDropdown} from './PositionDropdown'

export interface StateProp {
  disabled: boolean
  positionDropdownArray: PositionDropdownProps[]
}

interface PositionDropdownProps {
  index: number
  hide: boolean
  positionData: PositionRecruiting
}
interface PositionDropdownEditorProps {
  onTeamMemberRecruitChanged: (data: PositionCountDto[]) => void
  currentTeamMembers: PositionRecruiting[]
}

export const PositionDropdownEditor = ({
  onTeamMemberRecruitChanged,
  currentTeamMembers,
}: PositionDropdownEditorProps) => {
  const [animatedValue, setAnimatedValue] = useState(() => new Animated.Value(0))
  const [state, setState] = useState<StateProp>({
    disabled: false,
    //positionDropdownArray: initializePositionDropdownArray(currentTeamMembers) || [],
    positionDropdownArray: [],
  })
  const [index, setIndex] = useState(0)
  const {theme} = useTheme()
  const animationValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-59, 0],
  })
  const [teamMemberRecruit, setTeamMemberRecruit] = useState<PositionCountDto[]>([])
  const [positionState, setPositionState] = useState<PositionDropdownContent[]>([
    {key: Position.backend, value: PositionTextName.backend, disabled: false},
    {key: Position.frontend, value: PositionTextName.frontend, disabled: false},
    {key: Position.designer, value: PositionTextName.designer, disabled: false},
    {key: Position.manager, value: PositionTextName.manager, disabled: false},
  ])

  // useEffect(() => {
  //   console.log(state.positionDropdownArray)
  //   initializeDropdownView()
  // }, [state.positionDropdownArray])

  function initializePositionDropdownArray(array: PositionRecruiting[]) {
    const positionDropdownArray: PositionDropdownProps[] = array.map((item, index) => {
      return {index: index, hide: false, positionData: item}
    })
    return positionDropdownArray
  }

  function addTeamMemberRecruit(selectedData: PositionCountDto) {
    const isPositionExist = teamMemberRecruit.some(item => item.position == selectedData.position)
    if (isPositionExist) {
      const updatedTeamMembers = teamMemberRecruit.map(item => {
        if (item.position == selectedData.position) {
          return selectedData
        }
        return item
      })
      setTeamMemberRecruit(updatedTeamMembers)
    } else if (selectedData.position != 'none') {
      setTeamMemberRecruit(prevState => [...prevState, selectedData])
    }
  }

  function updatePositionDropdownArray(selectedData: PositionCountDto, index: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == index) {
        return {index: item.index, hide: item.hide, positionData: selectedData}
      }
      return item
    })
    //setState(prevState => ({disabled: prevState.disabled, positionDropdownArray: updatedArray}))
  }

  function handlePositionDisabled(value: Position) {
    const updatedArray = positionState.map(item => {
      if (item.value == value) {
        return {key: item.key, value: item.value, disabled: true}
      }
      return item
    })
    setPositionState(updatedArray)
  }

  function addView(item: PositionRecruiting) {
    animatedValue.setValue(0)
    const newlyAddedValue: PositionDropdownProps = {
      index: index,
      hide: false,
      positionData: {
        position: item.position,
        currentCnt: item.currentCnt,
        recruitCnt: item.recruitCnt,
      },
    }
    setState(prevState => ({
      disabled: true,
      positionDropdownArray: [...prevState.positionDropdownArray, newlyAddedValue],
    }))
    Animated.timing(animatedValue, {toValue: 1, duration: 500, useNativeDriver: true}).start(() => {
      setIndex(index + 1)
      setState(prevState => ({
        disabled: false,
        positionDropdownArray: [...prevState.positionDropdownArray],
      }))
    })
  }

  function initializeDropdownView() {
    currentTeamMembers.map(item => {
      addView(item)
    })
  }

  useEffect(() => {
    initializeDropdownView()
  }, [])

  let newArray = state.positionDropdownArray.map(
    (item: {hide: any}, idx: Key | null | undefined) => {
      return (
        <Animated.View
          key={idx}
          style={[
            {
              opacity: animatedValue,
              transform: [{translateY: animationValue}],
              backgroundColor: 'white',
            },
            item.hide ? {width: 0, height: 0} : {},
          ]}>
          <PositionDropdown
            onCloseClick={() => {
              //함부로 지워선 안됨 해당 포지션의 currentCnt와 비교후 제거해야 함
              //제거할 수 없다는 문구도 넣어야 할 듯
            }}
            onSelectPosition={(data: PositionCountDto) => {
              //updatePositionDropdownArray(data, idx)
              addTeamMemberRecruit(data)
            }}
            onDropdownSelected={(value: Position) => handlePositionDisabled(value)}
            dropdownData={positionState}
          />
        </Animated.View>
      )
    },
  )

  return (
    <View>
      <ScrollView style={{backgroundColor: 'white'}}>{newArray}</ScrollView>
      <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
        <CustomIcon name="plus-square" size={25} color={theme.colors.grey1} />
      </TouchableOpacity>
    </View>
  )
}
