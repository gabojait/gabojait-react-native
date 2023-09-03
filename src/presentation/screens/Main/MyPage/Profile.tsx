import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  RefreshControl,
  ScrollView,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
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
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setProfileImage } from '@/redux/action/profileActions';
import { getUser } from '@/redux/action/login';
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
export const ProfileImage = ({
  image,
  setImage,
}: {
  image: Asset | null;
  setImage: (asset: Asset) => void;
}) => {
  const styles = useStyles();
  return !image ? (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
          });
          setImage(result.assets?.[0]!);
          console.log(result.assets?.[0]?.fileName);
        }}
        style={styles.profileTouchArea}
      >
        <MaterialIcon name="camera-alt" size={25} color="#6C6C6C" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.profileContainer}>
      <ImageBackground source={image} borderRadius={8}>
        <TouchableOpacity
          onPress={async () => {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              selectionLimit: 1,
            });
            if ((result.assets?.length ?? 0) === 1) setImage(result.assets?.[0]!);
          }}
          style={styles.profileTouchArea}
        ></TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

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
    return () => {
      dispatch(getProfile());
      dispatch(getUser());
    };
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

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (!pageLoading) setRefreshing(false);
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
      <View style={{ flex: 0.8 }}>
        {!profileExist && !refreshing ? (
          <View
            style={{
              backgroundColor: 'white',
              borderTopStartRadius: 18,
              borderTopEndRadius: 18,
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
                borderRadius: 18,
                paddingHorizontal: 20,
                paddingVertical: 50,
              }}
            >
              <ProfileImage image={image} setImage={image => setImage(image)} />
              <PortfolioView
                profile={profile}
                rightChild={
                  <>
                    <CheckBox
                      checked={profile.isSeekingTeam ?? false}
                      onPress={() => dispatch(setProfileVisibility(!profile.isSeekingTeam))}
                      checkedIcon={
                        <MaterialIcon name="check-box" size={18} color={theme.colors.primary} />
                      }
                      uncheckedIcon={
                        <MaterialIcon
                          name="check-box-outline-blank"
                          size={18}
                          color={theme.colors.grey2}
                        />
                      }
                      containerStyle={{ padding: 0 }}
                      title="팀 초대 허용"
                    />
                  </>
                }
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
              <Text style={{ marginBottom: 11, fontSize: 17 }}>학력/경력</Text>
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

              <Text style={{ marginVertical: 11, marginTop: 30, fontSize: 17 }}>기술스택/직무</Text>
              {profile.position !== Position.None ? (
                <ToggleButton
                  title={KoreanPosition[profile.position ?? Position.None]}
                  titleStyle={{
                    fontSize: 14,
                    fontWeight: '500',
                    margin: 3,
                  }}
                  style={{ borderRadius: 10 }}
                />
              ) : (
                <Text>아직 직무 정보를 입력하지 않은 것 같아요.</Text>
              )}
              <View style={{ height: 20 }}></View>

              {profile.skills?.map((skill, idx) => (
                <>
                  <Text style={{ fontSize: 14 }}>희망 기술스택</Text>
                  <CustomSlider
                    text={skill.skillName}
                    value={Level[skill.level ?? 'low']}
                    onChangeValue={function (value: number | number[]): void {}}
                    minimumTrackTintColor={sliderColors[idx % 3]}
                  />
                  <View style={{ height: 10 }}></View>
                </>
              ))}

              <Text style={{ marginVertical: 10, marginTop: 20, fontSize: 17 }}>포트폴리오</Text>

              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginBottom: 20 }}>
                {profile.portfolios?.length ?? 0 > 0 ? (
                  profile.portfolios?.map(portfolio => (
                    <ToggleButton
                      title={portfolio.portfolioName}
                      icon={<MaterialIcon name={portfolioTypeIconName['pdf']} size={15} />}
                      style={{
                        backgroundColor: '#fff',
                        marginRight: 10,
                      }}
                      onClick={async () => {
                        if (await Linking.canOpenURL(portfolio.portfolioUrl))
                          Linking.openURL(portfolio.portfolioUrl);
                      }}
                    />
                  ))
                ) : (
                  <Text>아직 포트폴리오 정보를 입력하지 않은 것 같아요.</Text>
                )}
              </View>
              <View style={{ height: 1, width: '100%', backgroundColor: '#D9D9D9' }}></View>

              <Text style={{ fontSize: 17, marginVertical: 14 }}>이전 프로젝트</Text>
              {profile.completedTeams?.length ?? 0 > 0 ? (
                profile.completedTeams?.map(team => (
                  <Text style={{ lineHeight: 22, fontSize: 14 }}>
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
                <Text style={{ lineHeight: 22, fontSize: 14 }}>
                  아직 이전 프로젝트 정보를 입력하지 않은 것 같아요.
                </Text>
              )}
              <View
                style={{ height: 1, width: '100%', backgroundColor: '#D9D9D9', marginVertical: 14 }}
              ></View>

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
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={globalStyles.container}>
      <Text>{profileError?.message}</Text>
    </View>
  );
};

export const ReviewItem = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginBottom: 20,
        width: '100%',
      }}
    >
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text
            style={{
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: '700',
              color: 'black',
              paddingEnd: 7,
              paddingTop: 4,
            }}
          >
            {review.reviewerNickname}
          </Text>
          <RatingBar ratingScore={2.5} size={20} />
        </View>
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

export const PortfolioView = ({
  profile,
  rightChild,
}: {
  profile: ProfileViewDto;
  rightChild?: ReactNode;
}) => {
  const { theme } = useTheme();

  const workTime = calcMonth(
    new Date(profile.works?.[profile.works.length - 1]?.endedAt ?? ''),
    new Date(profile.works?.[0]?.startedAt ?? ''),
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: theme.fontSize.lg,
            fontWeight: theme.fontWeight.semibold,
            marginBottom: 12,
          }}
        >
          {profile.nickname}
        </Text>
        {rightChild}
      </View>
      <Text style={{ fontSize: theme.fontSize.md, fontWeight: '300' }}>
        {KoreanPosition[profile.position ?? Position.None]}
      </Text>
      {profile.profileDescription ? (
        <Text style={{ fontSize: theme.fontSize.md, marginVertical: 12 }}>
          {profile.profileDescription}
        </Text>
      ) : (
        <View style={{ height: 24 }}></View>
      )}

      <SolidCard>
        <View>
          <Text
            style={{ fontWeight: theme.fontWeight.light, textAlign: 'center', marginBottom: 8 }}
          >
            팀 매칭
          </Text>
          <Text style={{ fontWeight: theme.fontWeight.bold, textAlign: 'center', fontSize: 17 }}>
            {profile.completedTeams?.length ?? 0}회
          </Text>
        </View>
        <View>
          <Text
            style={{ fontWeight: theme.fontWeight.light, textAlign: 'center', marginBottom: 8 }}
          >
            리뷰
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight:
                profile.reviews?.length ?? 0 > 0 ? theme.fontWeight.medium : theme.fontWeight.bold,
              fontSize: 17,
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
          <Text
            style={{ fontWeight: theme.fontWeight.light, textAlign: 'center', marginBottom: 8 }}
          >
            총 경력
          </Text>
          {
            <Text style={{ fontWeight: theme.fontWeight.bold, textAlign: 'center', fontSize: 17 }}>
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
    paddingVertical: 40,
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
  profileTouchArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
}));

export default Profile;
