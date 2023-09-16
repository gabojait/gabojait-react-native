import { ScreenWidth } from '@rneui/base';
import { CheckBox, Input, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ToggleButton, Chip, CustomSlider, sliderColors } from '../Profile';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SquareIcon } from './EditPortfolio';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Level } from '@/data/model/Profile/Skill';
import { uuidv4 } from '@/presentation/utils/util';
import { Position } from '@/data/model/type/Position';
import {
  CREATE_SKILL,
  createSkill,
  deleteSkill,
  setPosition,
  updateSkill,
} from '@/redux/action/profileActions';

const EditSkillAndPosition = () => {
  const positions = ['Manager', 'Designer', 'Frontend', 'Backend'];
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const dispatch = useAppDispatch();

  const position = data?.position ?? Position.None;
  const skills = data?.skills ?? [];

  const { theme } = useTheme();

  return (
    <ScrollView style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 13 }}>희망 포지션</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 25 }}>
        {positions.map(item => {
          return (
            <View style={{ marginEnd: 15 }}>
              <ToggleButton
                title={item}
                titleStyle={{ fontSize: 18, fontWeight: '300', textAlign: 'center', flex: 1 }}
                style={{
                  borderRadius: 15,
                  padding: 10,
                  width: ScreenWidth * 0.26,
                  marginBottom: 10,
                  backgroundColor: position == item.toUpperCase() ? theme.colors.primary : 'white',
                }}
                onClick={() => {
                  dispatch(setPosition(item.toUpperCase() as Position));
                }}
              />
            </View>
          );
        })}
      </View>
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: '600' }}>기술스택</Text>

      {skills.map((skill, idx) => (
        <SliderItem
          sliderColor={sliderColors[Level[skill.level ?? 'low'] - 1]}
          value={Level[skill.level ?? 'low']}
          title={skill.skillName}
          onTitleChange={title => {
            if (skill.skillId) {
              dispatch(updateSkill(skill.skillId, { ...skill, skillName: title }));
            }
          }}
          isChecked={skill.isExperienced ?? false}
          onCheckboxChange={checked => {
            if (skill.skillId) {
              dispatch(updateSkill(skill.skillId, { ...skill, isExperienced: checked }));
            }
          }}
          onSliderChange={value => {
            if (skill.skillId) {
              dispatch(
                updateSkill(skill.skillId, {
                  ...skill,
                  level: Object.entries(Level).find(
                    ([_, lvl]) => lvl == value,
                  )?.[0] as keyof typeof Level,
                }),
              );
            }
          }}
          onDelete={() => {
            if (skill.skillId) {
              dispatch(deleteSkill(skill.skillId));
            }
          }}
        />
      ))}
      <View style={{ alignItems: 'center' }}>
        <SquareIcon
          name="add"
          onPress={() => {
            // FIXME: 임시로 id를 rough 하게 auto-increment 한 방향으로 설정해두었습니다만,
            // 빠르게 여러번 추가하는 등의 액션에 어떻게 동작할지 모르겠어요.
            dispatch(
              createSkill({
                isExperienced: false,
                level: 'MID',
                skillId: skills.length + 1,
                skillName: '',
              }),
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

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
  title?: string;
  onTitleChange: (title: string) => void;
  isChecked: boolean;
  onCheckboxChange: (checked: boolean) => void;
  value: number;
  onSliderChange: (value: number) => void;
  checkedText?: string;
  unCheckedText?: string;
  sliderColor: string;
  onDelete: () => void;
}) => {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: 30 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Chip
            style={{
              backgroundColor: 'white',
              borderColor: theme.colors.grey2,
              width: ScreenWidth * 0.25,
              padding: 0,
              marginEnd: 8,
            }}
          >
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.light,
                textAlign: 'center',
                flex: 1,
                paddingBottom: 0,
              }}
              value={title}
              onChangeText={onTitleChange}
              renderErrorMessage={false}
            />
          </Chip>
          <SquareIcon name="close" onPress={onDelete} />
        </View>
        <Chip style={{ backgroundColor: 'white', borderColor: theme.colors.disabled }}>
          <CheckBox
            checked={isChecked}
            checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
            uncheckedIcon={
              <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
            }
            onPress={() => onCheckboxChange(!isChecked)}
            containerStyle={{ padding: 0 }}
            textStyle={{ fontWeight: theme.fontWeight.light, color: 'black' }}
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
  );
};

export default EditSkillAndPosition;
