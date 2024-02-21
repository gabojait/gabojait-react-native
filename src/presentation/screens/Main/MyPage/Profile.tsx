import React, { ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import { ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FilledButton } from '@/presentation/components/Button';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import { Link } from '@react-navigation/native';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import { StackHeaderProps } from '@react-navigation/stack';
import { Level } from '@/data/model/Profile/Skill';
import { calcMonth, mapToSeekingTeamKey } from '@/presentation/utils/util';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';
import { Asset } from 'react-native-image-picker';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
  UseQueryResult,
} from 'react-query';
import { ToggleButton } from '@/presentation/components/ToggleButton';
import { CustomSlider } from '@/presentation/components/CustomSlider';
import { ProfileReviewItem } from '@/presentation/components/ProfileReviewItem';
import { isProfileExist, isSkillExists } from '@/presentation/utils/ProfileUtils';
import { ProjectIcon } from '@/presentation/components/icon/CustomIcon';
import { Loading } from '@/presentation/screens/Loading';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getMyProfile, setProfileImage, setUserSeekingTeam } from '@/data/api/profile';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { ProfileImage } from '@/presentation/components/ProfileImage';
import Portfolio from '@/data/model/Profile/Portfolio';

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
const Profile = ({ navigation, route }: ProfileStackParamListProps<'View'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <ProfileComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

class useQueryResult<T> {}

const ProfileComponent = ({ navigation, route }: ProfileStackParamListProps<'View'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const {
    data: profile,
    isLoading,
    error: profileError,
  }: UseQueryResult<ProfileViewResponse> = useQuery([profileKeys.myProfile], () => getMyProfile(), {
    useErrorBoundary: true,
  });
  const { mutate: mutateProfileImage, data: profileImage } = useMutation(
    (args: FormData) => setProfileImage(args),
    {
      useErrorBoundary: true,
      retry: 0,
      onSuccess: () => {
        queryClient.invalidateQueries([profileKeys.myProfile]);
      },
      onError: (error: Error) => {
        console.log(`이미지 업로드 실패:${error}`);
      },
    },
  );
  const { mutate: mutateIsSeekingTeam, data } = useMutation(
    (args: boolean) => setUserSeekingTeam(args),
    {
      useErrorBoundary: true,
      retry: 0,
      onSuccess: () => {
        queryClient.invalidateQueries([profileKeys.myProfile]);
      },
      onError: (error: Error) => {
        console.log(`팀 찾기여부 업로드 실패:${error}`);
      },
    },
  );
  const profileExist = useMemo(() => isProfileExist(profile), [profile]);
  const [image, setImage] = useState<Asset | null>(null);
  if (profileExist) {
    navigation.setOptions({
      header: Header,
    });
  }

  const PortfolioNotExist = () => (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text
        style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          marginBottom: 12,
        }}
      >
        {profile?.nickname}
      </Text>
      <Text style={{ fontSize: theme.emojiSize.lg, textAlign: 'center' }}>🕺</Text>
      <Text style={styles.textStyle}>아직 프로필이 작성되지 않았어요</Text>
      <Text style={[styles.textStyle, { marginBottom: 30 }]}>프로필을 작성하러 가볼까요?</Text>
      <FilledButton title="만들기" onPress={() => navigation.navigate('EditMain')} />
    </View>
  );

  useEffect(() => {
    setImage({
      uri: profile?.imageUrl,
    });
  }, [profile?.imageUrl]);

  useEffect(() => {
    const refetch_key = mapToSeekingTeamKey[profile?.position ?? Position.None];
    queryClient.invalidateQueries(refetch_key);
  }, [profile?.isSeekingTeam]);

  function isEmptyProfile() {
    if (!profileExist) {
      return true;
    } else {
      return false;
    }
  }

  function updateImage(newImage: DocumentPickerResponse) {
    const formData = new FormData();
    formData.append('image', {
      name: newImage?.name,
      type: newImage?.type,
      uri: newImage?.uri,
    });
    mutateProfileImage(formData);
  }

  function updateIsSeekingTeam(isSeekingTeam: boolean) {
    mutateIsSeekingTeam(isSeekingTeam);
  }

  function openLinkPage(portfolio: Portfolio) {
    console.log(`url:${portfolio.portfolioUrl}`);
    if (portfolio.media == 'LINK') {
      navigation.getParent()?.navigate('MainNavigation', {
        screen: 'WebViewPage',
        params: { uri: portfolio.portfolioUrl },
      });
    }
  }

  if (!profile) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 0.2, marginBottom: '30%', position: 'absolute' }} />
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 35,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <View style={{ flex: 1, height: 40 }} />
          <View
            style={{ flex: 1, backgroundColor: 'white', height: 40, borderTopLeftRadius: 18 }}
          />
        </View>
        <ProfileImage
          imageUrl={profile.imageUrl}
          onChangeImage={newImage => updateImage(newImage)}
          isAvailableToChangeImage={true}
        />
        <View style={{ flex: 0.9 }}>
          <View style={{ flex: 1, height: 40 }} />
          <View
            style={{ flex: 1, backgroundColor: 'white', height: 40, borderTopRightRadius: 18 }}
          />
        </View>
      </View>
      {isEmptyProfile() ? (
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}
        >
          <PortfolioNotExist />
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingTop: -70,
              paddingBottom: 20,
            }}
          >
            <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
              <PortfolioView
                profile={profile}
                onCheckBoxPressed={isSeekingTeam => updateIsSeekingTeam(isSeekingTeam)}
              />
            </View>
            <Text style={{ marginBottom: 11, marginTop: 30, fontSize: 17 }}>학력/경력</Text>
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
                      openLinkPage(portfolio);
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
          <View>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                flexWrap: 'nowrap',
                padding: 20,
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.medium }}>
                리뷰
              </Text>
              {profile.reviews?.length ?? 0 > 0 ? (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <Text h2 style={{ fontWeight: 'bold', marginEnd: 10 }}>
                      {profile.rating}
                    </Text>
                    <View>
                      <RatingBar ratingScore={profile.rating} />
                      <Text style={{ color: '#9A9A9A', fontSize: 11 }}>
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
                          params: { userId: profile.userId },
                        });
                        console.log('===========profile.userId:' + profile?.userId);
                      }}
                    >
                      <Text style={{ color: theme.colors.primary, textAlign: 'right' }}>
                        더보기
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={{ paddingTop: 10 }}>아직 리뷰가 작성되지 않은 것 같아요.</Text>
              )}
            </View>
          </View>
        </>
      )}
    </ScrollView>
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
  onCheckBoxPressed,
}: {
  profile: ProfileViewDto;
  rightChild?: ReactNode;
  onCheckBoxPressed?: (isSeekingTeam: boolean) => void;
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

  function isPositionExists() {
    if (!profile.position || profile.position == Position.None) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.lg,
                fontWeight: theme.fontWeight.bold,
                marginBottom: 12,
              }}
            >
              {profile.nickname}
            </Text>
            {onCheckBoxPressed ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingEnd: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.light,
                  }}
                >
                  팀 초대 허용
                </Text>
                <CheckBox
                  checked={profile.isSeekingTeam || false}
                  checkedIcon={
                    <MaterialIcon name="check-box" size={25} color={theme.colors.primary} />
                  }
                  uncheckedIcon={
                    <MaterialIcon
                      name="check-box-outline-blank"
                      size={18}
                      color={theme.colors.grey2}
                    />
                  }
                  onPress={() => onCheckBoxPressed(!profile.isSeekingTeam)}
                  containerStyle={{ padding: 0, flex: 1 }}
                  textStyle={{
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.light,
                    color: 'black',
                  }}
                  wrapperStyle={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginEnd: -22,
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
          {isPositionExists() ? (
            <ToggleButton
              title={KoreanPosition[profile.position ?? Position.None]}
              titleStyle={styles.profileText3}
              style={{
                paddingHorizontal: 18,
                justifyContent: 'center',
                borderRadius: theme.radius.smd,
                height: theme.boxComponentHeight.md,
                maxWidth: 120,
              }}
              onClick={() => {}}
            />
          ) : (
            <></>
          )}
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
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
}));

export default Profile;
