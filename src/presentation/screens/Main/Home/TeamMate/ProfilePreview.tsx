import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
import { Text, useTheme } from '@rneui/themed';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RatingBar } from '@/presentation/components/RatingBar';
import { Level } from '@/data/model/Profile/Skill';
import { Position } from '@/data/model/type/Position';
import { Asset } from 'react-native-image-picker';
import {
  IconLabel,
  portfolioTypeIconName,
  PortfolioView,
  sliderColors,
} from '../../MyPage/Profile';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
  UseQueryResult,
} from 'react-query';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getProfile } from '@/data/api/profile';
import { favoriteKeys } from '@/reactQuery/key/FavoriteKeys';
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto';
import { postFavoriteUser } from '@/data/api/favorite';
import { isFavorite } from '@/presentation/utils/util';
import useModal from '@/presentation/components/modal/useModal';
import useGlobalStyles from '@/presentation/styles';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { cancelOfferToUser, sendOfferToUser } from '@/data/api/offer';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { BottomInputModalContent } from '@/presentation/components/modalContent/BottomInputModalContent';
import { ReportCompleteModal } from '@/presentation/components/ReportCompleteModal';
import BookMarkHeader from '@/presentation/screens/Headers/BookmarkHeader';
import { ToggleButton } from '@/presentation/components/ToggleButton';
import { CustomSlider } from '@/presentation/components/CustomSlider';
import { FilledButton } from '@/presentation/components/Button';
import { ProfileReviewItem } from '@/presentation/components/ProfileReviewItem';
import { isSkillExists } from '@/presentation/utils/ProfileUtils';
import { ProjectIcon } from '@/presentation/components/icon/CustomIcon';
import { ProfileImage } from '@/presentation/components/ProfileImage';

const ProfilePreview = ({ navigation, route }: MainStackScreenProps<'ProfilePreview'>) => {
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

const ProfilePreviewComponent = ({ navigation, route }: MainStackScreenProps<'ProfilePreview'>) => {
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
  const [buttonState, setButtonState] = useState<{
    color: string;
    title: buttonTitle;
  }>({
    color: theme.colors.primary,
    title: '초대하기',
  });
  const [imagesNotValid, setImagesNotValid] = useState(new Set());
  const {
    data: profile,
    isLoading,
    error,
  }: UseQueryResult<ProfileViewResponse> = useQuery(
    profileKeys.profileUserId(userId),
    ({ queryKey: [_, _userId] }) => getProfile(_userId),
  );

  const { mutate: mutateFavorite, data: favoriteResponse } = useMutation(
    favoriteKeys.favoriteUser,
    (args: [string, FavoriteUpdateDto]) => postFavoriteUser(...args),
    {
      useErrorBoundary: true,
      onSettled: (data, error, [_userId], context) => {
        // 쿼리의 캐시를 날리고 새로운 서버 데이터를 갖고 오게 한다.
        queryClient.invalidateQueries([
          profileKeys.profileUserId(_userId),
          favoriteKeys.favoriteUser,
        ]);
      },
      onMutate: async ([_userId, { isAddFavorite }]) => {
        await queryClient.cancelQueries(profileKeys.profileUserId(_userId));
        const oldData = queryClient.getQueryData(
          profileKeys.profileUserId(_userId),
        ) as ProfileViewResponse;
        const newData = { ...oldData, isFavorite: isAddFavorite };
        queryClient.setQueryData(profileKeys.profileUserId(_userId), newData);
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
          header={<Text style={globalStyles.modalTitle}>'사용자를 신고하시겠습니까?'</Text>}
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
        headerStyle={{ backgroundColor: '#f5f5f5' }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', borderBottomColor: '#f5f5f5' }}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: '#f5f5f5',
            marginBottom: '30%',
            position: 'absolute',
          }}
        />
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
            onChangeImage={() => {}}
            isAvailableToChangeImage={false}
          />
          <View style={{ flex: 0.9 }}>
            <View style={{ flex: 1, height: 40 }} />
            <View
              style={{ flex: 1, backgroundColor: 'white', height: 40, borderTopRightRadius: 18 }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View style={{ paddingTop: 15 }}>
            <PortfolioView
              profile={profile}
              rightChild={
                <FilledButton
                  title={buttonState.title}
                  onPress={() => {
                    handleOfferMutation();
                  }}
                  buttonStyle={{
                    height: 48,
                    paddingVertical: -10,
                    backgroundColor: buttonState.color,
                  }}
                  titleStyle={{
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.semibold,
                  }}
                />
              }
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
                        params: { userId: 2 },
                      });
                    }}
                  >
                    <Text style={{ color: theme.colors.primary, textAlign: 'right' }}>더보기</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={{ paddingTop: 10 }}>아직 리뷰가 작성되지 않은 것 같아요.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default ProfilePreview;
