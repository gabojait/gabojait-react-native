import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { RatingInput } from '@/presentation/components/RatingInput';
import { Text, useTheme } from '@rneui/themed';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import CustomInput from '@/presentation/components/CustomInput';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import PagerView from 'react-native-pager-view';
import ReviewAnswer from '@/data/model/Review/ReviewAnswer';
import { changeToTitleCase, HEIGHT, WIDTH } from '@/presentation/utils/util';
import useModal from '@/presentation/components/modal/useModal';
import { PositionIcon } from '@/presentation/components/PartIcon';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { createReview, getTeamToReview } from '@/data/api/review';
import Reviews from '@/data/model/Review/Reviews';
import { getMyProfile } from '@/data/api/profile';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '../../Loading';
import TeamDto from '@/data/model/Team/TeamDto';

interface ReviewQuestionsProps extends ReviewAnswer {
  questionId: number;
}

const TeamReview = ({ navigation, route }: MainStackScreenProps<'TeamReview'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamReviewComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const TeamReviewComponent = ({ navigation, route }: MainStackScreenProps<'TeamReview'>) => {
  const { theme } = useTheme();
  const modal = useModal();
  const pagerViewRef = useRef<PagerView>(null);
  const queryClient = useQueryClient();
  const { teamId } = route.params!;
  const ref_input1 = useRef<TextInput | null>(null);

  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery([teamKeys.getTeam, teamId], () => getTeamToReview(teamId), {
    useErrorBoundary: true,
    retry: 1,
  });
  const {
    data: profileData,
    isLoading,
    error,
  }: UseQueryResult<ProfileViewResponse> = useQuery([profileKeys.myProfile], () => getMyProfile(), {
    useErrorBoundary: true,
  });
  const { mutation: submitReviewMutation } = useMutationDialog(
    offerKeys.offerToTeam,
    (args: [Reviews, string]) => createReview(...args),
    'CENTER',
    {
      onSuccessClick() {
        queryClient.invalidateQueries([reviewKeys.reviewAvailableTeams]);
        navigation.goBack();
      },
    },
  );

  const [reviewResultState, setReviewResultState] = useState<ReviewAnswer[]>([]);
  const [reviewState, setReviewState] = useState<ReviewQuestionsProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [reviewValidation, setReviewValidation] = useState({ post: false, rating: false });
  const [answer, setAnswer] = useState<ReviewAnswer>({ teamMemberId: '0', post: '', rating: '' });
  function updateTextReview(teamMemberId: string, text: string) {
    const questionId = 1;
    const otherQuestionId = 0;
    const newReview: ReviewQuestionsProps = {
      post: text,
      rating: '',
      teamMemberId: teamMemberId,
      questionId: questionId,
    };
    const otherReviews: ReviewQuestionsProps = reviewState.find(
      item => item.questionId == otherQuestionId,
    ) ?? { post: '', rating: '', teamMemberId: teamMemberId, questionId: otherQuestionId };

    const result: ReviewAnswer[] = [
      {
        post: otherReviews.post,
        rating: otherReviews.rating,
        teamMemberId: otherReviews.teamMemberId,
      },
      newReview,
    ];
    isValidPost(text);
    setReviewState([otherReviews, newReview]);
    judgeButtonDisabled();
  }

  const updateRatingReview = (teamMemberId: string, score: string) => {
    const questionId = 0;
    const otherQuestionId = 1;
    const newReview: ReviewQuestionsProps = {
      post: '',
      rating: score,
      teamMemberId: teamMemberId,
      questionId: questionId,
    };
    const otherReviews: ReviewQuestionsProps = reviewState.find(
      item => item.questionId == otherQuestionId,
    ) ?? { post: '', rating: '', teamMemberId: teamMemberId, questionId: otherQuestionId };

    const result: ReviewAnswer[] = [
      {
        post: otherReviews.post,
        rating: otherReviews.rating,
        teamMemberId: otherReviews.teamMemberId,
      },
      newReview,
    ];
    isValidRating(score);
    setReviewState([otherReviews, newReview]);
    judgeButtonDisabled();
  };

  function mergeReviewAnswer() {
    mergePostAndRatingToAnswer();
    setReviewResultState(prevState => [...prevState, answer]);
  }

  function mergePostAndRatingToAnswer() {
    setReviewResultState(prevState => [...prevState, answer]);
  }

  useEffect(() => {
    const ratingAnswer = reviewState.find(item => item.questionId == 0);
    const postAnswer = reviewState.find(item => item.questionId == 1);
    setAnswer(prevState => ({
      ...prevState,
      teamMemberId: reviewState[0]?.teamMemberId || '0',
      rating: ratingAnswer?.rating || 'novalue',
      post: postAnswer?.post || 'novalue',
    }));
  }, [reviewState]);

  function judgeButtonDisabled() {
    if (reviewValidation.post && reviewValidation.rating) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  function isValidPost(post: string) {
    if (post.length != 0) {
      return setReviewValidation(prevState => ({ ...prevState, post: true }));
    }
  }

  function isValidRating(rating: string) {
    if (parseInt(rating) > 0) {
      return setReviewValidation(prevState => ({ ...prevState, rating: true }));
    }
  }

  function initializeReview() {
    setReviewState([]);
    setButtonDisabled(true);
    setReviewValidation({ post: false, rating: false });
    setAnswer({ teamMemberId: '', post: '', rating: '' });
  }
  const moveToNextPage = (index: number) => {
    requestAnimationFrame(() => pagerViewRef.current?.setPage(index));
    setPageCount(pageCount + 1);
  };

  const isLastindex = (index: number) => {
    if (index == teamData?.teamMembers.length! - 1) {
      return true;
    } else {
      false;
    }
  };

  if (!teamData) {
    return null;
  }

  return (
    <>
      <Text
        style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          color: 'black',
          paddingLeft: 20,
          paddingVertical: 10,
          backgroundColor: 'white',
        }}
      >
        {teamData.projectName}
      </Text>
      <PagerView
        style={{
          flex: 1,
          marginTop: HEIGHT / 7,
        }}
        orientation="horizontal"
        initialPage={0}
        ref={pagerViewRef}
        collapsable={false}
        scrollEnabled={false}
      >
        {teamData.teamMembers.map((item, index) => (
          <ScrollView key={item.nickname}>
            {pageCount > 1 ? (
              <CardWrapper
                style={{ marginLeft: 20, minWidth: 300, marginBottom: 10, marginTop: 2 }}
              >
                <View style={{ width: '100%' }}>
                  <View
                    style={{ flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 20 }}
                  >
                    <PositionIcon
                      position={item.position}
                      isRecruitDone={true}
                      radious={theme.positionIconRadious.md}
                    />
                    <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: theme.fontSize.lg,
                          fontWeight: theme.fontWeight.bold,
                          color: 'black',
                        }}
                      >
                        {item.nickname}
                      </Text>
                      <Text
                        style={{
                          fontSize: theme.fontSize.md,
                          fontWeight: theme.fontWeight.light,
                          color: theme.colors.grey1,
                        }}
                      >
                        {changeToTitleCase(item.position)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderTopColor: theme.colors.disabled,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: theme.fontSize.md,
                        fontWeight: theme.fontWeight.bold,
                        color: 'black',
                        paddingBottom: 10,
                      }}
                    >
                      함께한 팀원은 어떠셨나요?
                    </Text>
                    <RatingInput
                      updateRatingScore={score => updateRatingReview(item.userId, score.toString())}
                      size={theme.ratingBarSize.xl}
                    />
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderTopColor: theme.colors.disabled,
                    }}
                  >
                    <CustomInput
                      onChangeText={(text: string) => updateTextReview(item.userId, text)}
                      shape="round"
                      containerStyle={{ paddingHorizontal: 20 }}
                      size={'sm'}
                      multiline={true}
                      numberOfLines={4}
                      style={{ minHeight: 90, fontSize: 14 }}
                      maxLength={200}
                      placeholder="팀원에 대한 리뷰를 남겨주세요"
                      onPressIn={() => {
                        ref_input1.current?.focus();
                      }}
                      ref={ref_input1}
                    />
                  </View>
                </View>
              </CardWrapper>
            ) : (
              <>
                <View
                  style={[
                    {
                      display: 'flex',
                      backgroundColor: 'white',
                      borderRadius: 38,
                      padding: 20,
                      width: WIDTH * 0.6,
                      marginLeft: 70,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                    잠깐
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 16,
                      fontSize: 12,
                      fontWeight: 'bold',
                      lineHeight: 25,
                    }}
                  >
                    {'리뷰는 수정이 어려우니\n 신중하게 선택해주세요'}
                  </Text>
                  <Text style={{ fontSize: 40, textAlign: 'center' }}>🥺</Text>
                  <FilledButton title={'확인'} onPress={() => moveToNextPage(pageCount)} />
                </View>
              </>
            )}
            <View style={{ paddingTop: 100 }}>
              {item.userId != profileData?.userId.toString() ? (
                <View>
                  {isLastindex(index) ? (
                    <FilledButton
                      title={'완료'}
                      buttonStyle={{ backgroundColor: theme.colors.primary }}
                      containerStyle={{ marginHorizontal: 70 }}
                      disabled={buttonDisabled}
                      onPress={() => {
                        setReviewResultState(prevState => [...prevState, ...reviewState]);
                        setReviewState([]);
                        console.log('reviewResultState:');
                        reviewResultState.map(item => {
                          console.log(
                            `item.post:${item.post}, item.rating:${item.rating}, item.revieweeUserId:${item.teamMemberId}`,
                          );
                        });
                        submitReviewMutation.mutate([
                          { reviews: reviewResultState } as Reviews,
                          teamId,
                        ]);
                      }}
                    />
                  ) : (
                    <FilledButton
                      title={'다음'}
                      buttonStyle={{ backgroundColor: theme.colors.primary }}
                      containerStyle={{ marginHorizontal: 70 }}
                      disabled={buttonDisabled}
                      onPress={() => {
                        mergeReviewAnswer();
                        initializeReview();
                        moveToNextPage(pageCount);
                      }}
                    />
                  )}
                </View>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        ))}
      </PagerView>
    </>
  );
};

export default TeamReview;
