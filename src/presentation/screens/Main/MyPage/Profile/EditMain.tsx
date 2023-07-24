import { Linking, ScrollView, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowCard } from '@/presentation/components/BaseCard';
import { Input, Text, useTheme } from '@rneui/themed';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import {
  CustomSlider,
  IconLabel,
  portfolioTypeIconName,
  sliderColors,
  ToggleButton,
} from '../Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import CardWrapper from '@/presentation/components/CardWrapper';
import CustomHeader from '@/presentation/components/CustomHeader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Position } from '@/data/model/type/Position';
import { Level } from '@/data/model/Profile/Skill';
import useGlobalStyles from '@/presentation/styles';
import { useMutation } from 'react-query';
import { updateProfileInfo } from '@/data/api/profile';
import useModal from '@/presentation/components/modal/useModal';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { KoreanPosition } from '@/presentation/model/type/Position';
import { openAppWithUri } from 'react-native-send-intent';
import { setDescription } from '@/redux/action/profileActions';

const useUpdateProfile = () => {
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);

  const profile = {
    educations: data?.educations ?? [],
    skills: data?.skills ?? [],
    portfolios: data?.portfolios ?? [],
    position: data?.position ?? Position.None,
    works: data?.works ?? [],
  };

  const profileSkillMutation = useMutation(updateProfileInfo);

  return {
    ...profileSkillMutation,
    mutate: () =>
      profileSkillMutation.mutate({
        ...profile,
        skills: profile.skills.map(skill => ({
          ...skill,
          skillId: skill.new ? undefined : skill.skillId,
        })),
        portfolios: profile.portfolios.map(portfolio => ({
          ...portfolio,
          portfolioId: portfolio.new ? undefined : portfolio.portfolioId,
        })),
        educations: profile.educations.map(education => ({
          ...education,
          educationId: education.new ? undefined : education.educationId,
          startedAt: new Date(education.startedAt).format('yyyy-MM-dd'),
          endedAt: new Date(education.endedAt).format('yyyy-MM-dd'),
        })),
        works: profile.works.map(work => ({
          ...work,
          workId: work.new ? undefined : work.workId,
          startedAt: new Date(work.startedAt).format('yyyy-MM-dd'),
          endedAt: new Date(work.endedAt).format('yyyy-MM-dd'),
        })),
      }),
    mutateAsync: () => profileSkillMutation.mutateAsync(profile),
  };
};

export function EditMainHeader() {
  const { theme } = useTheme();
  const { mutate, isSuccess, isLoading } = useUpdateProfile();
  const modal = useModal();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      modal?.show({
        content: (
          <OkDialogModalContent
            text="프로필 수정 완료"
            onOkClick={() => {
              modal?.hide();
            }}
          />
        ),
      });
    }
  }, [isSuccess]);

  return (
    <CustomHeader
      align="center"
      title="프로필"
      canGoBack
      rightChildren={
        <Text
          onPress={() => {
            mutate();
          }}
          style={{ color: theme.colors.primary }}
        >
          완료
        </Text>
      }
    />
  );
}

// Todo: 완료 버튼 구현
// Todo: Override React Navigation header
const EditMain = ({ navigation }: ProfileStackParamListProps<'EditMain'>) => {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector(state => state.profileReducer.userProfile);
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const dispatch = useAppDispatch();

  if (profile && !profileLoading && !profileError)
    return (
      <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
        <ArrowCard
          title="기본정보"
          onArrowPress={() => {
            navigation.getParent()?.navigate('UserModifier');
          }}
          style={{ marginBottom: theme.spacing.xl }}
        >
          <></>
        </ArrowCard>
        <CardWrapper style={[globalStyles.card, { marginBottom: theme.spacing.xl, padding: 20 }]}>
          <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold }}>
            자기소개
          </Text>
          <Input
            placeholder="본인이 프로젝트 중 겪었던 문제 극복 상황에 대해 적어도 좋아요:)"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholderTextColor={theme.colors.disabled}
            containerStyle={{ paddingHorizontal: 0 }}
            multiline
            value={profile.profileDescription}
            onChangeText={value => dispatch(setDescription(value))}
            numberOfLines={6}
            inputStyle={{ fontWeight: theme.fontWeight.light }}
          ></Input>
        </CardWrapper>
        <ArrowCard
          title="포트폴리오"
          style={{ marginBottom: theme.spacing.xl }}
          onArrowPress={() => {
            navigation.navigate('EditPortfolio');
          }}
        >
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {profile.portfolios?.map(portfolio => (
              <ToggleButton
                key={portfolio.portfolioId}
                title={portfolio.portfolioName}
                icon={<Icon name={portfolioTypeIconName['pdf']} />}
                style={{
                  backgroundColor: 'FFF',
                }}
                onClick={async () => {
                  if (await Linking.canOpenURL(portfolio.portfolioUrl))
                    Linking.openURL(portfolio.portfolioUrl);
                }}
              />
            ))}
          </View>
        </ArrowCard>
        <ArrowCard
          title="학력/경력"
          style={{ marginBottom: theme.spacing.xl }}
          onArrowPress={() => {
            navigation.navigate('EditSchoolAndWork');
          }}
        >
          {profile.educations?.length ?? 0 > 0 ? (
            <>
              <IconLabel
                iconName="school"
                label={profile.educations?.[profile.educations.length - 1].institutionName}
              />
              {profile.works
                ?.map(work => (
                  <IconLabel key={work.workId} iconName="work" label={work.corporationName} />
                ))
                .slice(0, 2)}
            </>
          ) : null}
        </ArrowCard>
        <ArrowCard
          title="기술스택/직무"
          style={{ marginBottom: theme.spacing.xl }}
          onArrowPress={() => {
            navigation.navigate('EditSkillAndPosition');
          }}
        >
          <View style={{ alignItems: 'flex-start' }}>
            {profile.position && profile.position !== Position.None && (
              <ToggleButton title={KoreanPosition[profile.position]} />
            )}
            {profile.skills?.map((skill, idx) => (
              <>
                <Text>{skill.isExperienced ? '사용' : '희망'} 기술스택</Text>
                <CustomSlider
                  key={skill.skillId}
                  text={skill.skillName}
                  value={Level[skill.level ?? 'low']}
                  minimumTrackTintColor={sliderColors[idx % 3]}
                />
              </>
            ))}
          </View>
        </ArrowCard>
      </ScrollView>
    );
};

export default EditMain;
