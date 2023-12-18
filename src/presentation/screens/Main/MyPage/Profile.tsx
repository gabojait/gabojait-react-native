import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { FilledButton } from '@/presentation/components/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import { Link } from '@react-navigation/native';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import { StackHeaderProps } from '@react-navigation/stack';
import { getProfile } from '@/redux/reducers/profileReducer';
import { Level } from '@/data/model/Profile/Skill';
import useGlobalStyles from '@/presentation/styles';
import { calcMonth, mapToSeekingTeamKey } from '@/presentation/utils/util';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';
import { Asset } from 'react-native-image-picker';
import { setProfileImage } from '@/redux/action/profileActions';
import { getUser } from '@/redux/action/login';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { useQueryClient } from 'react-query';
import { ToggleButton } from '@/presentation/components/ToggleButton';
import { CustomSlider } from '@/presentation/components/CustomSlider';
import { ProfileImage } from '@/presentation/components/ProfileImage';
import { ProfileReviewItem } from '@/presentation/components/ProfileReviewItem';
import { isProfileExist, isSkillExists } from '@/presentation/utils/ProfileUtils';
import { ProjectIcon } from '@/presentation/components/icon/CustomIcon';

const Header = ({ navigation }: StackHeaderProps) => {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <CustomIcon
        name="arrow-back"
        size={30}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
      />
      <Link to={'/EditMain'} style={{ fontSize: 20, color: theme.colors.primary }}>
        수정
      </Link>
    </View>
  );
};

export const portfolioTypeIconName = {
  pdf: 'description',
  link: 'link',
};

export const sliderColors = ['#FFDB20', '#F06823', '#F04823'];

const Profile = ({ navigation }: ProfileStackParamListProps<'View'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const globalStyles = useGlobalStyles();
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
    return () => {
      dispatch(getProfile());
      dispatch(getUser());
    };
  }, []);

  const profileExist = useMemo(() => isProfileExist(profile), [profile]);

  if (profileExist) {
    navigation.setOptions({
      header: Header,
    });
  }

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

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (!pageLoading) {
      setRefreshing(false);
    }
  }, [pageLoading]);

  const [image, setImage] = useState<Asset | null>(null);

  useEffect(() => {
    setImage({
      uri: profile?.imageUrl,
    });
  }, [profile?.imageUrl]);

  useEffect(() => {
    if (image && image.fileName) {
      const formData = new FormData();
      formData.append('image', {
        name: image?.fileName,
        uri: image?.uri,
      });
      dispatch(setProfileImage(formData));
    }
  }, [image]);

  useEffect(() => {
    const refetch_key = mapToSeekingTeamKey[profile?.position ?? Position.None];
    queryClient.invalidateQueries(refetch_key);
  }, [profile?.isSeekingTeam]);

  return pageLoading && !refreshing ? (
    <View style={globalStyles.container}>
      <ActivityIndicator />
    </View>
  ) : (profile && !profileError) || refreshing ? (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            dispatch(getProfile());
          }}
        />
      }
    >
      <View style={{ flex: 0.2, backgroundColor: '#f5f5f5', marginBottom: '30%' }} />
      {!profileExist && !refreshing ? (
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 18,
            borderRightColor: 18,
            paddingHorizontal: 20,
            paddingVertical: 50,
          }}
        >
          <ProfileImage image={image} setImage={image => setImage(image)} />
          <PortfolioNotExist />
        </View>
      ) : profileExist && profile ? (
        <>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              paddingHorizontal: 20,
              paddingTop: 50,
              paddingBottom: 20,
            }}
          >
            <ProfileImage image={image} setImage={image => setImage(image)} />
            <PortfolioView profile={profile} />
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                alignItems: 'flex-start',
                flexWrap: 'nowrap',
                paddingTop: 15,
              }}
            >
              <Text style={{ marginBottom: 11, marginTop: 30, fontSize: 17 }}>학력/경력</Text>
              {profile.educations?.length ?? 0 > 0 ? (
                <View style={{ marginBottom: 4 }}>
                  <IconLabel
                    iconName="school"
                    label={
                      profile.educations?.[profile.educations.length - 1]?.institutionName ?? ''
                    }
                    size={20}
                  />
                </View>
              ) : (
                <Text>아직 학교 정보를 입력하지 않은 것 같아요.</Text>
              )}
              {profile.works?.length ?? 0 > 0 ? (
                profile.works
                  ?.map(work => (
                    <IconLabel iconName="work" label={work.corporationName} size={20} />
                  ))
                  .slice(0, 2)
              ) : (
                <Text>아직 경력 정보를 입력하지 않은 것 같아요.</Text>
              )}

              <Text style={{ marginTop: 30, fontSize: 17 }}>기술스택/직무</Text>
              {isSkillExists(profile) ? (
                profile.skills?.map((skill, idx) => (
                  <View style={{ marginTop: 12 }}>
                    <CustomSlider
                      text={skill.skillName}
                      value={Level[skill.level ?? 'low']}
                      onChangeValue={function (value: number | number[]): void {}}
                      minimumTrackTintColor={sliderColors[idx % 3]}
                    />
                  </View>
                ))
              ) : (
                <Text style={{ marginTop: 12 }}>아직 기술스택 정보를 입력하지 않은 것 같아요.</Text>
              )}
              <Text style={{ marginBottom: 10, marginTop: 30, fontSize: 17 }}>포트폴리오</Text>
              <ScrollView
                horizontal={true}
                style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 0 }}
              >
                {profile.portfolios?.length ?? 0 > 0 ? (
                  profile.portfolios?.map(portfolio => (
                    <ToggleButton
                      title={portfolio.portfolioName}
                      icon={
                        <MaterialIcon
                          name={portfolioTypeIconName.link}
                          size={theme.fontSize.lg}
                          style={{ paddingTop: 0 }}
                        />
                      }
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
              </ScrollView>
              <Text style={{ fontSize: 17, marginBottom: 10, marginTop: 30 }}>이전 프로젝트</Text>
              <ScrollView horizontal={true} style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {profile.completedTeams?.length ?? 0 > 0 ? (
                  profile.completedTeams?.map(team => (
                    <ToggleButton
                      title={team.projectName}
                      icon={<ProjectIcon name="" size={theme.fontSize.md} />}
                      style={{
                        backgroundColor: '#fff',
                        marginRight: 10,
                        justifyContent: 'flex-start',
                      }}
                      onClick={async () => {}}
                    />
                  ))
                ) : (
                  <Text style={{ lineHeight: 22, fontSize: 14 }}>
                    아직 이전 프로젝트 정보를 입력하지 않은 것 같아요.
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'flex-start',
              marginTop: 20,
              padding: 20,
            }}
          >
            <Text h4 style={{ marginBottom: 11, fontWeight: theme.fontWeight.medium }}>
              리뷰
            </Text>
            {profile.reviews?.length ?? 0 > 0 ? (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <Text h2 style={{ fontWeight: 'bold', marginEnd: 10 }}>
                    {profile.rating.toFixed(1)}
                  </Text>
                  <View>
                    <RatingBar ratingScore={profile.rating} />
                    <Text style={{ color: theme.colors.grey2 }}>
                      {profile.reviews?.length ?? 0}개 리뷰
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 25 }}>
                  {profile.reviews?.slice(0, 3).map(review => (
                    <ProfileReviewItem review={review} />
                  ))}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.getParent()?.navigate('MainNavigation', {
                        screen: 'MoreReview',
                        params: { userId: 2 },
                      });
                    }}
                  >
                    <Text style={{ color: theme.colors.primary, textAlign: 'right' }}>더보기</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text>아직 리뷰가 작성되지 않은 것 같아요.</Text>
            )}
          </View>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  ) : (
    <View style={globalStyles.container}>
      <Text>{profileError?.message}</Text>
    </View>
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

export const IconLabel = ({
  iconName,
  size,
  label,
}: {
  iconName: string;
  size?: number;
  label?: string;
}) => (
  <View style={{ flexDirection: 'row' }}>
    <MaterialIcon name={iconName} size={size} style={{ marginRight: 5 }} />
    <Text>{label}</Text>
  </View>
);

export const PortfolioView = ({
  profile,
  rightChild,
}: {
  profile: ProfileViewDto;
  rightChild?: ReactNode;
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const workTime = calcMonth(
    new Date(profile.works?.[profile.works.length - 1]?.endedAt ?? ''),
    new Date(profile.works?.[0]?.startedAt ?? ''),
  );

  function isReviewExists(data: ProfileViewDto) {
    if (data.reviews?.length ?? 0 > 0) {
      return true;
    }
    return false;
  }

  function isWorkExists(data: ProfileViewDto) {
    if (data.works?.length ?? 0 > 0) {
      return true;
    }
    return false;
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text
            style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.bold,
              marginBottom: 12,
            }}
          >
            {profile.nickname}
          </Text>
          <ToggleButton
            title={KoreanPosition[profile.position ?? Position.None]}
            titleStyle={styles.profileText3}
            style={{
              paddingHorizontal: 18,
              justifyContent: 'center',
              borderRadius: 18,
              height: 40,
            }}
            onClick={() => {}}
          />
        </View>
        {rightChild}
      </View>

      {profile.profileDescription ? (
        <Text style={{ fontSize: theme.fontSize.sm, marginVertical: 12 }}>
          {profile.profileDescription}
        </Text>
      ) : (
        <View style={{ height: 24 }} />
      )}

      <SolidCard>
        <View>
          <Text
            style={{ fontWeight: theme.fontWeight.light, textAlign: 'center', marginBottom: 8 }}
          >
            팀 매칭
          </Text>
          <Text style={styles.profileText1}>{profile.completedTeams?.length ?? 0}회</Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: theme.fontWeight.light,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            리뷰
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {isReviewExists(profile) ? (
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcon name="star" color={theme.colors.primary} size={22} />
                <Text style={styles.profileText1}>{profile.rating?.toFixed(1)}</Text>
                <Text style={styles.profileText2}>(5)</Text>
              </View>
            ) : (
              <Text style={styles.profileText1}>없음</Text>
            )}
          </View>
        </View>
        <View>
          <Text
            style={{ fontWeight: theme.fontWeight.light, textAlign: 'center', marginBottom: 8 }}
          >
            총 경력
          </Text>
          {
            <Text style={styles.profileText1}>
              {isWorkExists(profile) ? (workTime == 0 ? '1개월 미만' : `${workTime} 개월`) : '없음'}
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
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const useStyles = makeStyles(theme => ({
  profileText1: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
  },
  profileText2: {
    fontSize: theme.fontSize.sm,
  },
  profileText3: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.light,
  },
  textStyle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
}));

export default Profile;
