import {ScreenWidth} from '@rneui/base'
import {CheckBox, Input, Text, useTheme} from '@rneui/themed'
import React, {useState} from 'react'
import {ScrollView, View} from 'react-native'
import {ToggleButton, Chip, CustomSlider, sliderColors} from '../Profile'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {SquareIcon} from './EditPortfolio'
import {useAppSelector} from '@/redux/hooks'
import {Level} from '@/data/model/Profile/Skill'
import {uuidv4} from '@/presentation/utils/util'

const EditSkillAndPosition = () => {
  const positions = ['PM', 'Designer', 'Frontend', 'Backend']
  const {data, loading, error} = useAppSelector(state => state.profileReducer.userProfile)
  const orgSkills = data?.skills ?? []
  const [position, setPosition] = useState(data?.position)
  const [skills, setSkills] = useState(orgSkills)

  const {theme} = useTheme()

  return (
    <ScrollView style={{padding: 20, backgroundColor: 'white', flex: 1}}>
      <Text h4>희망 포지션</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {positions.map(item => {
          return (
            <View style={{marginEnd: 15}}>
              <ToggleButton
                title={item}
                titleStyle={{fontSize: 18, fontWeight: '300', textAlign: 'center', flex: 1}}
                style={{
                  borderRadius: 15,
                  padding: 10,
                  width: ScreenWidth * 0.26,
                  marginBottom: 10,
                  backgroundColor: position == item ? theme.colors.primary : 'white',
                }}
                onClick={() => {
                  setPosition(item)
                }}
              />
            </View>
          )
        })}
      </View>
      <Text h4>기술스택</Text>

      {skills.map((skill, idx) => (
        <SliderItem
          sliderColor={sliderColors[idx % 3]}
          value={Level[skill.level]}
          title={skill.skillName}
          onTitleChange={title =>
            setSkills(prevState => {
              const idx = prevState.findIndex(item => item.skillId == skill.skillId)
              prevState[idx].skillName = title
              return [...prevState]
            })
          }
          isChecked={skill.isExperienced}
          onCheckboxChange={checked =>
            setSkills(prevState => {
              const idx = prevState.findIndex(item => item.skillId == skill.skillId)
              prevState[idx].isExperienced = checked
              return [...prevState]
            })
          }
          onSliderChange={value => {
            setSkills(prevState => {
              const idx = prevState.findIndex(item => item.skillId == skill.skillId)
              prevState[idx].level = Object.entries(Level).find(
                ([_, lvl]) => lvl == value,
              )?.[0] as keyof typeof Level
              return [...prevState]
            })
          }}
          onDelete={() =>
            setSkills(prevState => {
              const idx = prevState.findIndex(item => item.skillId == skill.skillId)
              prevState.splice(idx, 1)
              return [...prevState]
            })
          }
        />
      ))}
      <View style={{alignItems: 'center'}}>
        <SquareIcon
          name="add"
          onPress={() => {
            setSkills(prevState => [
              ...prevState,
              {
                isExperienced: false,
                level: 'MID',
                schemaVersion: 'string',
                skillId: uuidv4(),
                skillName: '',
              },
            ])
          }}
        />
      </View>
    </ScrollView>
  )
}

const SliderItem = ({
  title,
  onTitleChange,
  isChecked,
  onCheckboxChange,
  value,
  onSliderChange,
  checkedText = '경험 있음',
  unCheckedText = '경험 없음',
  sliderColor,
  onDelete,
}: {
  title: string
  onTitleChange: (title: string) => void
  isChecked: boolean
  onCheckboxChange: (checked: boolean) => void
  value: number
  onSliderChange: (value: number) => void
  checkedText?: string
  unCheckedText?: string
  sliderColor: string
  onDelete: () => void
}) => {
  const {theme} = useTheme()

  return (
    <View style={{marginBottom: 30}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Chip
            style={{
              backgroundColor: 'white',
              borderColor: theme.colors.grey2,
              width: ScreenWidth * 0.25,
              padding: 0,
              marginEnd: 8,
            }}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              style={{
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.light,
                textAlign: 'center',
                flex: 1,
                paddingBottom: 0,
              }}
              value={title}
              onChangeText={onTitleChange}
              renderErrorMessage={false}></Input>
          </Chip>
          <SquareIcon name="close" onPress={onDelete} />
        </View>
        <Chip style={{backgroundColor: 'white', borderColor: theme.colors.disabled}}>
          <CheckBox
            checked={isChecked}
            checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
            uncheckedIcon={
              <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
            }
            onPress={() => onCheckboxChange(!isChecked)}
            containerStyle={{padding: 0}}
            textStyle={{fontWeight: theme.fontWeight.light, color: 'black'}}
            title={isChecked ? checkedText : unCheckedText}
          />
        </Chip>
      </View>
      <CustomSlider
        enabled
        size="lg"
        value={value}
        onChangeValue={value => onSliderChange(value as number)}
        minimumTrackTintColor={sliderColor}
      />
    </View>
  )
}

export default EditSkillAndPosition
