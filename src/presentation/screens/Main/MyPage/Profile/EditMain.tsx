import { Linking, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import { BaseCard } from '@/presentation/components/BaseCard';
import { Input, Text, useTheme } from '@rneui/themed';
import { IconLabel, portfolioTypeIconName, sliderColors } from '../Profile';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import CardWrapper from '@/presentation/components/CardWrapper';
import CustomHeader from '@/presentation/components/CustomHeader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Position } from '@/data/model/type/Position';
import { Level } from '@/data/model/Profile/Skill';
import useGlobalStyles from '@/presentation/styles';
import { useMutation, useQueryClient } from 'react-query';
import { updateDescription, updateProfileInfo } from '@/data/api/profile';
import useModal from '@/presentation/components/modal/useModal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { setDescription } from '@/redux/action/profileActions';
import { ToggleButton } from '@/presentation/components/ToggleButton';
import { CustomSlider } from '@/presentation/components/CustomSlider';
import { ScreenWidth } from '@rneui/base';
import { mapPositionToKorean } from '@/presentation/utils/PositionDropdownUtils';
import { getProfile } from '@/redux/reducers/profileReducer';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';

const useUpdateProfile = (data: ProfileViewDto) => {
  const queryClient = useQueryClient();
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
          skillId: undefined,
        })),
        portfolios: profile.portfolios.map(portfolio => ({
          ...portfolio,
          portfolioId: undefined,
        })),
        educations: profile.educations.map(education => ({
          ...education,
          educationId: undefined,
          startedAt: new Date(education.startedAt).format('yyyy-MM-dd'),
          endedAt: new Date(education.endedAt).format('yyyy-MM-dd'),
        })),
        works: profile.works.map(work => ({
          ...work,
          workId: undefined,
          startedAt: new Date(work.startedAt).format('yyyy-MM-dd'),
          endedAt: new Date(work.endedAt).format('yyyy-MM-dd'),
        })),
      }),
    mutateAsync: () => profileSkillMutation.mutateAsync(profile),
    onSuccess: () => queryClient.invalidateQueries(profileKeys.myProfile),
  };
};

export function EditMainHeader() {
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const { theme } = useTheme();
  const { mutate, isSuccess, isLoading } = useUpdateProfile(data);
  const queryClient = useQueryClient();
  const { mutate: mutateDescription, data: descriptionData } = useMutation(
    profileKeys.myProfile,
    () => updateDescription({ profileDescription: data?.profileDescription || '' }),
    {
      useErrorBoundary: true,
      onSuccess: () => {
        queryClient.invalidateQueries(profileKeys.myProfile);
      },
    },
  );
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
            mutateDescription();
          }}
          style={{ color: theme.colors.primary, fontSize: 20 }}
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
  const currentPosition = profile?.position ?? Position.None;

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(getProfile());
    };
  }, []);

  if (profileError || !profile || profileLoading) {
    return null;
  }

  return (
    <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
      <BaseCard
        title="희망 포지션"
        onPress={() => {
          navigation.navigate('EditPosition');
        }}
        style={{ marginBottom: theme.spacing.xl }}
      >
        <ToggleButton
          title={mapPositionToKorean(currentPosition)}
          titleStyle={{
            fontSize: theme.fontSize.md,
            fontWeight: '300',
            textAlign: 'center',
            flex: 1,
          }}
          style={{
            borderRadius: 12,
            padding: -10,
            width: ScreenWidth * 0.3,
            marginBottom: 10,
            backgroundColor: theme.colors.primary,
            height: theme.boxComponentHeight.md,
          }}
        />
      </BaseCard>
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
        />
      </CardWrapper>
      <BaseCard
        title="포트폴리오"
        style={{ marginBottom: theme.spacing.xl }}
        onPress={() => {
          navigation.navigate('EditPortfolio');
        }}
      >
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 10 }}>
          {profile.portfolios?.length ?? 0 > 0 ? (
            profile.portfolios?.map(portfolio => (
              <ToggleButton
                title={portfolio.portfolioName}
                icon={<MaterialIcon name={portfolioTypeIconName.pdf} size={15} />}
                style={{
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}
                onClick={async () => {
                  if (await Linking.canOpenURL(portfolio.portfolioUrl)) {
                    Linking.openURL(portfolio.portfolioUrl);
                  }
                }}
              />
            ))
          ) : (
            <Text>아직 포트폴리오 정보를 입력하지 않은 것 같아요.</Text>
          )}
        </View>
      </BaseCard>
      <BaseCard
        title="학력/경력"
        style={{ marginBottom: theme.spacing.xl }}
        onPress={() => {
          navigation.navigate('EditSchoolAndWork');
        }}
      >
        <View style={{ marginTop: 10 }}>
          {profile.educations?.length ?? 0 > 0 ? (
            <View style={{ marginBottom: 4 }}>
              <IconLabel
                iconName="school"
                label={profile.educations?.[profile.educations.length - 1]?.institutionName ?? ''}
                size={20}
              />
            </View>
          ) : (
            <Text>아직 학교 정보를 입력하지 않은 것 같아요.</Text>
          )}
          {profile.works?.length ?? 0 > 0 ? (
            profile.works
              ?.map(work => <IconLabel iconName="work" label={work.corporationName} size={20} />)
              .slice(0, 2)
          ) : (
            <Text>아직 경력 정보를 입력하지 않은 것 같아요.</Text>
          )}
        </View>
      </BaseCard>
      <BaseCard
        title="기술스택"
        style={{ marginBottom: theme.spacing.xl }}
        onPress={() => {
          navigation.navigate('EditSkill');
        }}
      >
        <View style={{ alignItems: 'flex-start' }}>
          {profile.skills?.map((skill, idx) => (
            <>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <CustomSlider
                  text={skill.skillName}
                  value={Level[skill.level ?? 'low']}
                  onChangeValue={function (_: number | number[]): void {}}
                  minimumTrackTintColor={sliderColors[Level[skill.level ?? 'low'] - 1]}
                />
              </View>
              <View style={{ height: 10 }} />
            </>
          ))}
        </View>
      </BaseCard>
    </ScrollView>
  );
};

export default EditMain;
