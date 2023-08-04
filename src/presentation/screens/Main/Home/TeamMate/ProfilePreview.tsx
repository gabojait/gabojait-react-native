import { TeammateStackParamListProps } from '@/presentation/navigation/types';

import React, { useState } from 'react';
import { Text, useTheme } from '@rneui/themed';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '@/redux/hooks';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import { setProfileVisibility } from '@/redux/reducers/profileReducer';
import { Level } from '@/data/model/Profile/Skill';
import useGlobalStyles from '@/presentation/styles';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';
import { Asset } from 'react-native-image-picker';
import {
  CustomSlider,
  IconLabel,
  PortfolioView,
  ProfileImage,
  ToggleButton,
  portfolioTypeIconName,
  sliderColors,
} from '../../MyPage/Profile';
import { UseQueryResult, useQuery } from 'react-query';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getProfile } from '@/data/api/profile';
import CustomHeader from '@/presentation/components/CustomHeader';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { Icon } from '@rneui/base';
import { FilledButton } from '@/presentation/components/Button';
import textStyles from '@/presentation/res/styles/textStyles';

const ProfilePreview = ({ navigation, route }: TeammateStackParamListProps<'ProfilePreview'>) => {
  return <ProfilePreviewComponent navigation={navigation} route={route} />;
};

const ProfilePreviewComponent = ({
  navigation,
  route,
}: TeammateStackParamListProps<'ProfilePreview'>) => {
  const { theme } = useTheme();
  const userId = route.params.userId;
  const {
    data: profile,
    isLoading,
    error,
  }: UseQueryResult<ProfileViewResponse> = useQuery([profileKeys.profile, userId], () =>
    getProfile(userId),
  );
  const dispatch = useAppDispatch();

  const globalStyles = useGlobalStyles();

  const [refreshing, setRefreshing] = useState(false);
  //   useEffect(() => {
  //     if (!pageLoading) setRefreshing(false);
  //   }, [pageLoading]);

  const [image, setImage] = useState<Asset | null>(null);

  //   useEffect(() => {
  //     setImage({
  //       uri: profile?.imageUrl,
  //     });
  //   }, [profile?.imageUrl]);

  //   useEffect(() => {
  //     if (image && image.fileName) {
  //       const formData = new FormData();
  //       formData.append('image', {
  //         name: image?.fileName,
  //         uri: image?.uri,
  //       });
  //       dispatch(setProfileImage(formData));
  //     }
  //   }, [image]);
  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <CustomHeader
        title={''}
        canGoBack={true}
        rightChildren={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {}} style={{ paddingRight: 25 }}>
              <CustomIcon name="heart" size={30} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Icon type="entypo" name="dots-three-vertical" size={20} />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 0.2, backgroundColor: '#f5f5f5', marginBottom: '30%' }} />
        <View style={{ flex: 0.8 }}>
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
                <FilledButton
                  title={'초대하기'}
                  style={{ minWidth: 123, minHeight: 40, borderRadius: 10 }}
                  titleStyle={{ fontSize: 14, fontWeight: '400' }}
                />
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

            <Text style={{ marginVertical: 11, marginTop: 30, fontSize: 17 }}>기술스택/직무</Text>
            <ToggleButton
              title={KoreanPosition[profile.position ?? Position.None]}
              titleStyle={{
                fontSize: 14,
                fontWeight: '500',
                margin: 3,
              }}
              style={{ borderRadius: 10 }}
            />
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
                      team.teamMembers.find(member => member.userId === userId)?.position ??
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
                  {/* {profile.reviews?.map(review => (
                      <ReviewItem review={review} />
                    ))}
                    <Link to={''} style={{ color: theme.colors.primary, textAlign: 'right' }}>
                      더보기
                    </Link> */}
                </View>
              </>
            ) : (
              <Text>아직 리뷰가 작성되지 않은 것 같아요.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default ProfilePreview;
