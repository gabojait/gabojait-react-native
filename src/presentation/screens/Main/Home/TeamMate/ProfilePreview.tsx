import { TeammateStackParamListProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
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
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from 'react-query';
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
import { cancelOfferToUser, sendOfferToUser } from '@/data/api/offer';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { BottomInputModalContent } from '@/presentation/components/modalContent/BottomInputModalContent';
import { ReportCompleteModal } from '@/presentation/components/ReportCompleteModal';
import BookMarkHeader from '@/presentation/screens/Headers/BookmarkHeader';
import {
  StackHeaderInterpolationProps,
  StackHeaderInterpolatedStyle,
} from '@react-navigation/stack';

const ProfilePreview = ({ navigation, route }: TeammateStackParamListProps<'ProfilePreview'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="프로필이 존재하지 않습니다">
        <ProfilePreviewComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

type buttonTitle = '초대하기' | '취소하기';

const ProfilePreviewComponent = ({
  navigation,
  route,
}: TeammateStackParamListProps<'ProfilePreview'>) => {
  const { theme } = useTheme();
  const userId = route.params.userId;
  const modal = useModal();
  const queryClient = useQueryClient();
  const globalStyles = useGlobalStyles();
  const [image, setImage] = useState<Asset | null>(null);
  const [reportState, setReportState] = useState({ text: '' });
  const [reportButtonState, setReportButtonState] = useState({
    text: '신고하기',
    isDisabled: true,
  });
  const [buttonState, setButtonState] = useState<{ color: string; title: buttonTitle }>({
    color: theme.colors.primary,
    title: '초대하기',
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
        queryClient.invalidateQueries([profileKeys.profileUserId, favoriteKeys.favoriteByUserList]);
      },
    },
  );
  const { mutation: sendOfferMutation } = useMutationDialog(
    offerKeys.offerToUser,
    (args: [string, Position]) => sendOfferToUser(...args),
    'CENTER',
    {
      resultModalContent: {
        title: '초대 완료!',
        content: '팀원 초대장이 보내졌습니다! 답장을 기다려주세요',
      },
      onSuccessClick() {
        setButtonState({ title: '취소하기', color: theme.colors.disabled });
      },
    },
  );
  const { mutation: cancelOfferMutation } = useMutationDialog(
    offerKeys.cancelOfferToUser,
    (args: number) => cancelOfferToUser(args),
    'CENTER',
    {
      resultModalContent: {
        title: '취소 완료!!',
        content: '팀원 초대를 취소하셨습니다.',
      },
      onSuccessClick() {
        setButtonState({ title: '초대하기', color: theme.colors.primary });
      },
    },
  );

  useEffect(() => {
    checkIsOfferedAlready();
  }, [profile]);

  function reportCompeletedModal() {
    modal?.show({
      content: <ReportCompleteModal onPressYesButton={() => modal.hide()} />,
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  }

  function handleReportModal() {
    modal?.show({
      content: (
        <BottomInputModalContent
          header={'팀을 신고하시겠습니까?'}
          content={'신고사유를 적어주세요'}
          yesButton={{
            title: '신고하기',
            onPress: () => {
              console.log('신고하기');
              modal.hide();
              reportCompeletedModal();
            },
          }}
          noButton={{
            title: '취소',
            onPress: () => {
              console.log('신고하기');
              modal.hide();
            },
          }}
          onInputValueChange={(text: string) => {
            setReportState({ text: text });
          }}
        />
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  }

  function handleFavoriteTeam() {
    mutateFavorite([userId, { isAddFavorite: !profile?.isFavorite }]);
  }

  function handleOfferMutation() {
    if (buttonState.title == '초대하기') {
      sendOfferMutation.mutate([userId, profile!.position]);
      queryClient.fetchQuery(offerKeys.offerToUser);
    } else if (buttonState.title == '취소하기' && profile!.offers) {
      const offer = profile!.offers.find(item => item.position == profile!.position);
      cancelOfferMutation.mutate(offer?.offerId!);
    }
  }

  function checkIsOfferedAlready() {
    const offer = profile!.offers.find(item => item.position == profile!.position);
    if (offer) {
      setButtonState({ title: '취소하기', color: theme.colors.disabled });
    }
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <BookMarkHeader
        onPressBookMark={handleFavoriteTeam}
        onPressReport={handleReportModal}
        toChangeColor={isFavorite(profile?.isFavorite!)}
      />
      {/* <CustomHeader
        title={''}
        canGoBack={true}
        rightChildren={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleFavoriteTeam} style={{ paddingEnd: 16 }}>
              <CustomIcon name="heart" size={24} color={isFavorite(profile?.isFavorite!)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReportModal}>
              <Icon type="material" name="pending" size={24} />
            </TouchableOpacity>
          </View>
        }
        align="center"
      /> */}
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
              {image && <ImageBackground source={image} borderRadius={8} />}
            </View>
            <PortfolioView
              profile={profile}
              rightChild={
                <FilledButton
                  onPress={() => {
                    handleOfferMutation();
                  }}
                  title={buttonState.title}
                  style={{ minWidth: 123, minHeight: 40, borderRadius: 10 }}
                  buttonStyle={{ backgroundColor: buttonState.color }}
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
            <View style={{ height: 20 }} />
            {profile.skills?.map((skill, idx) => (
              <>
                <Text style={{ fontSize: 14 }}>희망 기술스택</Text>
                <CustomSlider
                  text={skill.skillName}
                  value={Level[skill.level ?? 'low']}
                  onChangeValue={function (value: number | number[]): void {}}
                  minimumTrackTintColor={sliderColors[idx % 3]}
                />
                <View style={{ height: 10 }} />
              </>
            ))}
            <Text style={{ marginVertical: 10, marginTop: 20, fontSize: 17 }}>포트폴리오</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginBottom: 20 }}>
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
            <View style={{ height: 1, width: '100%', backgroundColor: '#D9D9D9' }} />
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
            />
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
