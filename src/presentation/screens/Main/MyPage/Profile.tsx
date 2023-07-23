import React, { useEffect, useMemo } from 'react';
import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import { ActivityIndicator, ScrollView, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { FilledButton } from '@/presentation/components/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import { Slider } from '@miblanchard/react-native-slider';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import Review from '@/data/model/Profile/ReviewResponse';
import { Link } from '@react-navigation/native';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackHeaderProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfile, setProfileVisibility } from '@/redux/reducers/profileReducer';
import { Level } from '@/data/model/Profile/Skill';
import useGlobalStyles from '@/presentation/styles';
import { calcMonth } from '@/presentation/utils/util';
import { isProfileExist } from './ProfileUtils';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';

const Header = ({ navigation }: StackHeaderProps) => {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <Icon
        name="chevron-left"
        size={25}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
      ></Icon>
      <Link to={'/EditMain'} style={{ color: theme.colors.primary }}>
        수정
      </Link>
    </View>
  );
};

export const portfolioTypeIconName = {
  pdf: 'description',
};

export const sliderColors = ['#FFDB20', '#F06823', '#F04823'];

const Profile = ({ navigation }: ProfileStackParamListProps<'View'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useAppSelector(state => state.loginReducer.user);
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector(state => state.profileReducer.userProfile);
  const pageLoading = profileLoading || userLoading;

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const profileExist = useMemo(() => isProfileExist(profile), [profile]);

  if (profileExist)
    navigation.setOptions({
      header: Header,
    });

  const globalStyles = useGlobalStyles();

  const PortfolioNotExist = () => (
    <View>
      <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold }}>
        {user?.nickname}
      </Text>
      <Text style={{ fontSize: theme.emojiSize.lg, textAlign: 'center' }}>🕺</Text>
      <Text style={styles.textStyle}>아직 프로필이 작성되지 않았어요</Text>
      <Text style={[styles.textStyle, { marginBottom: 30 }]}>프로필을 작성하러 가볼까요?</Text>
      <FilledButton title="만들기" onPress={() => navigation.navigate('EditMain')} />
    </View>
  );
  return pageLoading ? (
    <View style={globalStyles.container}>
      <ActivityIndicator />
    </View>
  ) : profile && !profileError ? (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.2, backgroundColor: '#f5f5f5', marginBottom: '30%' }} />
      <View style={{ flex: 0.8 }}>
        {!profileExist ? (
          <View
            style={{
              backgroundColor: 'white',
              borderTopStartRadius: 18,
              borderTopEndRadius: 18,
              paddingHorizontal: 20,
              paddingVertical: 50,
            }}
          >
            <View style={styles.profileContainer}></View>
            <PortfolioNotExist />
          </View>
        ) : (
          <>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                paddingHorizontal: 20,
                paddingVertical: 50,
              }}
            >
              <View style={styles.profileContainer}></View>
              <PortfolioView
                profile={profile}
                onProfileVisibilityChanged={isPublic => {
                  dispatch(setProfileVisibility(isPublic));
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                alignItems: 'flex-start',
                flexWrap: 'nowrap',
                padding: 20,
                marginTop: 20,
              }}
            >
              <Text h4>학력/경력</Text>
              {profile.educations?.length ?? 0 > 0 ? (
                <IconLabel
                  iconName="school"
                  label={profile.educations?.[profile.educations.length - 1]?.institutionName ?? ''}
                />
              ) : (
                <Text>아직 학교 정보를 입력하지 않은 것 같아요.</Text>
              )}
              {profile.works?.length ?? 0 > 0 ? (
                profile.works
                  ?.map(work => <IconLabel iconName="work" label={work.corporationName} />)
                  .slice(0, 2)
              ) : (
                <Text>아직 경력 정보를 입력하지 않은 것 같아요.</Text>
              )}

              <Text h4>기술스택/직무</Text>
              {profile.position !== 'none' ? (
                <ToggleButton title={KoreanPosition[profile.position ?? Position.None]} />
              ) : (
                <Text>아직 직무 정보를 입력하지 않은 것 같아요.</Text>
              )}
              {profile.skills?.map((skill, idx) => (
                <>
                  <Text>희망 기술스택</Text>
                  <CustomSlider
                    text={skill.skillName}
                    value={Level[skill.level ?? 'low']}
                    onChangeValue={function (value: number | number[]): void {}}
                    minimumTrackTintColor={sliderColors[idx % 3]}
                  />
                </>
              ))}
              <Text h4>포트폴리오</Text>

              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {profile.portfolios?.length ?? 0 > 0 ? (
                  profile.portfolios?.map(portfolio => (
                    <ToggleButton
                      title={portfolio.name}
                      icon={<MaterialIcon name={portfolioTypeIconName['pdf']} />}
                      style={{
                        backgroundColor: '#fff',
                      }}
                    />
                  ))
                ) : (
                  <Text>아직 포트폴리오 정보를 입력하지 않은 것 같아요.</Text>
                )}
              </View>
              <Text h4>이전 프로젝트</Text>
              {profile.completedTeams?.length ?? 0 > 0 ? (
                profile.completedTeams?.map(team => (
                  <Text>
                    프로젝트 '{team.projectName}' -
                    {
                      KoreanPosition[
                        team.teamMembers.find(member => member.userId === user?.userId)?.position ??
                          Position.None
                      ]
                    }
                  </Text>
                ))
              ) : (
                <Text>아직 이전 프로젝트 정보를 입력하지 않은 것 같아요.</Text>
              )}
              <Text h4>리뷰</Text>
              {profile.reviews?.length ?? 0 > 0 ? (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <Text h2 style={{ fontWeight: 'bold', marginEnd: 10 }}>
                      {profile.rating}
                    </Text>
                    <View>
                      <RatingBar ratingScore={profile.rating} />
                      <Text>{profile.reviews?.length ?? 0}개 리뷰</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 25 }}>
                    {profile.reviews?.map(review => (
                      <ReviewItem review={review} />
                    ))}
                    <Link to={''} style={{ color: theme.colors.primary, textAlign: 'right' }}>
                      더보기
                    </Link>
                  </View>
                </>
              ) : (
                <Text>아직 리뷰가 작성되지 않은 것 같아요.</Text>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={globalStyles.container}>
      <Text>{profileError?.message}</Text>
    </View>
  );
};

const ReviewItem = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold, marginEnd: 10 }}
        >
          {review.reviewerId}
        </Text>
        <RatingBar ratingScore={2.5} size={20} />
      </View>
      <Text
        style={{ fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25 }}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {review.post}
      </Text>
      <Text
        style={{ fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25 }}
      >
        {review.createdAt}
      </Text>
    </View>
  );
};

export const ToggleButton = ({
  title,
  titleStyle,
  icon,
  onClick,
  style,
}: {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            padding: 6,
            flexDirection: 'row',
          },
          style,
        ]}
      >
        {icon ? <View style={{ marginEnd: 3 }}>{icon}</View> : null}
        <Text style={titleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Chip = ({
  icon,
  onClick,
  style,
  children,
}: {
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          padding: 2,
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginEnd: 3 }}>{icon}</View> : null}
      {children}
    </View>
  );
};

export const IconLabel = ({ iconName, label }: { iconName: string; label?: string }) => (
  <View style={{ flexDirection: 'row' }}>
    <MaterialIcon name={iconName} />
    <Text>{label}</Text>
  </View>
);

export const CustomSlider = ({
  text,
  value,
  onChangeValue,
  minimumTrackTintColor,
  enabled = false,
  size = 'md',
}: {
  text?: string;
  value: number;
  onChangeValue?: (value: number | number[]) => void;
  minimumTrackTintColor: string;
  enabled?: boolean;
  size?: 'md' | 'lg';
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ width: '100%' }}>
      <Slider
        containerStyle={{
          width: '100%',
          overflow: 'hidden',
          height: theme.sliderSize[size],
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 7,
        }}
        trackClickable={enabled}
        step={1}
        maximumValue={3}
        trackStyle={{
          height: theme.sliderSize[size],
          borderRadius: 7,
          backgroundColor: 'white',
        }}
        trackMarks={[1, 2]}
        renderTrackMarkComponent={() => (
          <View style={{ width: 1, height: theme.sliderSize.md, backgroundColor: 'black' }}></View>
        )}
        value={value}
        onValueChange={onChangeValue}
        thumbStyle={{ backgroundColor: 'transparent', width: 0, borderWidth: 0 }}
        minimumTrackTintColor={minimumTrackTintColor}
      />
      <View
        style={{
          height: '100%',
          position: 'absolute',
          left: 5,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const PortfolioView = ({
  profile,
  onProfileVisibilityChanged,
}: {
  profile: ProfileViewDto;
  onProfileVisibilityChanged: (visibility: boolean) => void;
}) => {
  const { theme } = useTheme();

  const workTime = calcMonth(
    new Date(profile.works?.[profile.works.length - 1]?.endedAt ?? ''),
    new Date(profile.works?.[0]?.startedAt ?? ''),
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold }}>
          {profile.nickname}
        </Text>
        <CheckBox
          checked={profile.isPublic ?? false}
          onPress={() => onProfileVisibilityChanged(!profile.isPublic)}
          checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
          uncheckedIcon={
            <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
          }
          containerStyle={{ padding: 0 }}
          title="팀 초대 허용"
        />
      </View>
      <Text style={{ fontSize: theme.fontSize.md }}>
        {KoreanPosition[profile.position ?? Position.None]}
      </Text>
      <Text style={{ fontSize: theme.fontSize.md }}>{profile.profileDescription}</Text>
      <SolidCard>
        <View>
          <Text style={{ fontWeight: theme.fontWeight.light, textAlign: 'center' }}>팀 매칭</Text>
          <Text style={{ fontWeight: theme.fontWeight.bold, textAlign: 'center' }}>
            {profile.completedTeams?.length ?? 0}회
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: theme.fontWeight.light, textAlign: 'center' }}>리뷰</Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight:
                profile.reviews?.length ?? 0 > 0 ? theme.fontWeight.medium : theme.fontWeight.bold,
            }}
          >
            {profile.reviews?.length ?? 0 > 0 ? (
              <>
                <MaterialIcon name="star" color={theme.colors.primary} />
                {profile.rating}({profile.rating})
              </>
            ) : (
              <Text>없음</Text>
            )}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: theme.fontWeight.light, textAlign: 'center' }}>총 경력</Text>
          {
            <Text style={{ fontWeight: theme.fontWeight.bold, textAlign: 'center' }}>
              {profile.works?.length ?? 0 > 0
                ? workTime == 0
                  ? '1개월 미만'
                  : `${workTime} 개월`
                : '없음'}
            </Text>
          }
        </View>
      </SolidCard>
    </View>
  );
};

const SolidCard = ({ children }: { children?: React.ReactNode }) => {
  const styles = useCardStyles();
  return <View style={styles.container}>{children}</View>;
};

const useCardStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.grey0,
    borderRadius: 20,
    padding: 23,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}));

const useStyles = makeStyles(theme => ({
  textStyle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  profileContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
    top: -(100 - 30),
    left: 20,
  },
}));

export default Profile;
