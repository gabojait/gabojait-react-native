import { CheckBox, Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { sliderColors } from '../Profile';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Skill, { Level } from '@/data/model/Profile/Skill';
import { createSkill, deleteSkill, updateSkill } from '@/redux/action/profileActions';
import { CustomSlider } from '@/presentation/components/CustomSlider';
import { DeleteIcon, SquareIcon } from '@/presentation/components/icon/CustomIcon';
import { WIDTH } from '@/presentation/utils/util';

const EditSkill = () => {
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const dispatch = useAppDispatch();
  const initializeSkillRef = useRef(true);
  const skills = useMemo(() => {
    if (!data?.skills) {
      return [];
    }

    if (initializeSkillRef.current) {
      return initializeSkills();
    }

    return data.skills;
  }, [data?.skills]);
  const temporarySkillId = useRef(data?.skills?.length || 0);

  useEffect(() => {
    console.log('경력 변경 감지');
    skills.map(value => {
      console.log(`{skillId: ${value.skillId}, `);
      console.log(`isExperienced: ${value.isExperienced}, `);
      console.log(`level: ${value.level}, `);
      console.log(`skillId: ${value.skillId}, `);
      console.log(`skillName: ${value.skillName}, `);
      console.log(`updatedAt: ${value.updatedAt}}`);
    });
  }, [skills]);

  function initializeSkills() {
    if (!data?.skills) {
      return [];
    }
    initializeSkillRef.current = false;

    data.skills.forEach((it, idx) => {
      if (it.skillId) {
        dispatch(deleteSkill(it.skillId));
      }
      createOriginalSkill({ ...it, skillId: idx });
    });

    return data.skills.map((it, idx) => ({ ...it, skillId: idx }));
  }

  function createOriginalSkill(skill: Skill) {
    dispatch(createSkill(skill));
  }

  function handleAdd() {
    dispatch(
      createSkill({
        isExperienced: false,
        level: 'MID',
        skillId: temporarySkillId.current++,
        skillName: '',
      }),
    );
  }

  function handleDelete(skill: Skill) {
    console.log('기술스택 지우기');
    if (skill.skillId) {
      dispatch(deleteSkill(skill.skillId));
    }
  }

  return (
    <ScrollView style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>기술스택</Text>
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
            handleDelete(skill);
          }}
        />
      ))}
      <TouchableOpacity
        onPress={() => {
          // FIXME: 임시로 id를 rough 하게 auto-increment 한 방향으로 설정해두었습니다만,
          // 빠르게 여러번 추가하는 등의 액션에 어떻게 동작할지 모르겠어요.
          handleAdd();
        }}
        style={{ alignItems: 'center', paddingTop: 12 }}
      >
        <SquareIcon name="add" size={25} />
      </TouchableOpacity>
      <View style={{ height: 30 }} />
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
    <View style={{ marginTop: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input
            containerStyle={{ width: '60%', marginStart: -10 }}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.grey2,
              height: theme.boxComponentHeight.md,
              minWidth: WIDTH * 0.4,
            }}
            errorStyle={{ display: 'none' }}
            inputStyle={{
              textAlign: 'center',
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.medium,
            }}
            value={title}
            onChangeText={text => onTitleChange(text)}
            rightIcon={
              <View style={{ alignContent: 'flex-start', marginEnd: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    onDelete();
                  }}
                >
                  <DeleteIcon name={''} size={25} />
                </TouchableOpacity>
              </View>
            }
          />
        </View>
        <CheckBox
          checked={isChecked}
          checkedIcon={<MaterialIcon name="check-box" size={25} color={theme.colors.primary} />}
          uncheckedIcon={
            <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
          }
          onPress={() => onCheckboxChange(!isChecked)}
          containerStyle={{ padding: 0, flex: 1 }}
          textStyle={{
            fontSize: theme.fontSize.md,
            fontWeight: theme.fontWeight.light,
            color: 'black',
          }}
          wrapperStyle={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginEnd: -20,
          }}
          title={isChecked ? checkedText : unCheckedText}
        />
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

export default EditSkill;
