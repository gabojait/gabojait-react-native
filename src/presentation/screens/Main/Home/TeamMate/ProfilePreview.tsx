import { TeammateStackParamListProps } from '@/presentation/navigation/types';
import React, { useState } from 'react';
import { Text, useTheme } from '@rneui/themed';
import {
  ImageBackground,
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import { Level } from '@/data/model/Profile/Skill';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';
import { Asset } from 'react-native-image-picker';
import {
  CustomSlider,
  IconLabel,
  PortfolioView,
  ReviewItem,
  ToggleButton,
  portfolioTypeIconName,
  sliderColors,
} from '../../MyPage/Profile';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getProfile } from '@/data/api/profile';
import CustomHeader from '@/presentation/components/CustomHeader';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { Icon } from '@rneui/base';
import { FilledButton } from '@/presentation/components/Button';
import { favoriteKeys } from '@/reactQuery/key/FavoriteKeys';
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto';
import { postFavoriteUser } from '@/data/api/favorite';
import { isFavorite } from '@/presentation/utils/util';
import useModal from '@/presentation/components/modal/useModal';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import useGlobalStyles from '@/presentation/styles';
import CardWrapper from '@/presentation/components/CardWrapper';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { sendOfferToUser } from '@/data/api/offer';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Fallback404 } from '@/presentation/components/errorComponent/GeneralFallback';

const ProfilePreview = ({ navigation, route }: TeammateStackParamListProps<'ProfilePreview'>) => {
  return (
    <Error404Boundary fallback={Fallback404()}>
      <ProfilePreviewComponent navigation={navigation} route={route} />
    </Error404Boundary>
  );
};

const ProfilePreviewComponent = ({
  navigation,
  route,
}: TeammateStackParamListProps<'ProfilePreview'>) => {
  const { theme } = useTheme();
  const userId = route.params.userId;
  const modal = useModal();
  const queryClient = useQueryClient();
  const globalStyles = useGlobalStyles();
  const [reportState, setReportState] = useState({ text: '' });
  const [reportButtonState, setReportButtonState] = useState({
    text: '신고하기',
    isDisabled: true,
  });
  const {
    data: profile,
    isLoading,
    error,
  }: UseQueryResult<ProfileViewResponse> = useQuery([profileKeys.profileUserId], () =>
    getProfile(userId),
  );
  const { mutate: mutateFavorite, data: favoriteResponse } = useMutation(
    favoriteKeys.favoriteByTeam,
    (args: [string, FavoriteUpdateDto]) => postFavoriteUser(...args),
    {
      useErrorBoundary: true,
      onSuccess: () => {
        queryClient.invalidateQueries([profileKeys.profileUserId]);
      },
    },
  );
  const { mutation: sendOfferMutation } = useMutationDialog(
    offerKeys.offerToUser,
    (args: [string, Position]) => sendOfferToUser(...args),
    {
      resultToMessage: _ => '팀원 초대장이 보내졌습니다! 답장을 기다려주세요',
    },
  );
  const reportCompeletedModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title="신고완료!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✅</Text>}
          text={'신고가 완료되었습니다.'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };
  const handleReportModal = () => {
    modal?.show({
      content: (
        <BottomModalContent
          title="팀을 신고하시겠습니까?"
          children={
            <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
              <Text style={[globalStyles.textLight13, { textAlign: 'center', paddingBottom: 10 }]}>
                신고 사유를 적어주세요
              </Text>
              <CardWrapper style={{ minHeight: 75, maxWidth: 400 }}>
                <TextInput
                  value={reportState.text}
                  style={{ width: '100%' }}
                  onChangeText={(text: string) => {
                    setReportState(prevState => ({ ...prevState, text: text }));
                  }}
                  multiline={true}
                  maxLength={500}
                />
              </CardWrapper>
            </View>
          }
          yesButton={{
            title: reportButtonState.text,
            onPress: () => {
              modal.hide();
              reportCompeletedModal();
            },
            disabled: reportButtonState.isDisabled,
          }}
          noButton={{
            title: '나가기',
            onPress: () => {
              modal.hide();
            },
          }}
          neverSeeAgainShow={false}
          onBackgroundPress={modal?.hide}
        />
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };
  function handleFavoriteTeam() {
    mutateFavorite([userId, { isAddFavorite: !profile?.isFavorite }]);
  }
  const [image, setImage] = useState<Asset | null>(null);
  function isOfferButtonDisabled() {
    if (profile && profile.offers.length > 0) {
      return true;
    }
    return false;
  }
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
            <TouchableOpacity
              onPress={() => {
                handleFavoriteTeam();
              }}
              style={{ paddingRight: 25 }}
            >
              <CustomIcon name="heart" size={30} color={isFavorite(profile.isFavorite)} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleReportModal();
              }}
            >
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
            <View style={globalStyles.profileContainer}>
              <ImageBackground source={image} borderRadius={8} />
            </View>
            <PortfolioView
              profile={profile}
              rightChild={
                <FilledButton
                  onPress={() => {
                    sendOfferMutation.mutate([userId, profile.position]);
                  }}
                  title={'초대하기'}
                  style={{ minWidth: 123, minHeight: 40, borderRadius: 10 }}
                  titleStyle={{ fontSize: 14, fontWeight: '400' }}
                  disabled={isOfferButtonDisabled()}
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
                    <Text style={{ color: '#9A9A9A', fontSize: 11 }}>
                      {profile.reviews?.length ?? 0}개 리뷰
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 25 }}>
                  {profile.reviews?.map(review => (
                    <ReviewItem review={review} />
                  ))}
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
