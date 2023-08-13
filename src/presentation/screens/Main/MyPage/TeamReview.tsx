import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { RatingInput } from '@/presentation/components/RatingInput';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomInput from '@/presentation/components/CustomInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getReviewQuestions } from '@/redux/reducers/reviewQuestionsGetReducer';
import { ReviewType } from '@/data/model/Review/ReviewQuestion';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { getTeamToReview } from '@/redux/reducers/teamToReviewGetReducer';
import PagerView from 'react-native-pager-view';
import ReviewAnswer from '@/data/model/Review/ReviewAnswer';
import { ModalContext } from '@/presentation/components/modal/context';
import SymbolCenteredModalContent from '@/presentation/components/modalContent/SymbolCenteredModalContent';
import { createReview } from '@/redux/reducers/reviewCreateReducer';
import { changeToTitleCase, getFirstAlphabet } from '@/presentation/utils/util';
import useModal from '@/presentation/components/modal/useModal';
import { Position } from '@/data/model/type/Position';
import { PositionIcon } from '@/presentation/components/PartIcon';
import { getMyTeam } from '@/data/api/team';
import TeamDto from '@/data/model/Team/TeamDto';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { UseQueryResult, useQuery } from 'react-query';

const TeamReview = ({ navigation, route }: MainStackScreenProps<'TeamReview'>) => {
  const { theme } = useTheme();
  const modal = useModal();
  const dispatch = useAppDispatch();
  const pagerViewRef = useRef<PagerView>(null);

  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(teamKeys.myTeam, () => getMyTeam(), {
    useErrorBoundary: true,
    retry: 1,
  });

  const {
    data: reviewQuestions,
    loading: reviewQuestionsLoading,
    error: reviewQuestionsError,
  } = useAppSelector(state => state.reviewQuestionsGetReducer.reviewQuestionsResult);
  const {
    data: teamToReview,
    loading: teamToReviewLoading,
    error: teamToReviewError,
  } = useAppSelector(state => state.teamToReviewGetReducer.teamToReviewGetResult);
  const teammateArray = [
    ...[teamToReview?.teamMemberCnts.filter(item => item.position === Position.Backend)],
    ...[teamToReview?.teamMemberCnts.filter(item => item.position === Position.Designer)],
    ...[teamToReview?.teamMemberCnts.filter(item => item.position === Position.Frontend)],
    ...[teamToReview?.teamMemberCnts.filter(item => item.position === Position.Manager)],
  ];
  const [reviewResultState, setReviewResultState] = useState<ReviewAnswer[]>([]);
  const [reviewState, setReviewState] = useState<ReviewAnswer[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  function updateTextReview(userId: string, text: string) {
    const newReview = { post: text, rate: '', userId: userId };
    const otherReviews = reviewState.filter(item => item != newReview);

    const result = [...otherReviews, newReview];
    console.log(`updateTextReview----------------`);
    result.map(item => console.log(`answer: ${item.post}, rate: ${item.rate}, userId: ${userId}`));
    setReviewState([...otherReviews, newReview]);
  }

  const updateRatingReview = (userId: string, score: string) => {
    const newReview = { post: '', rate: score, userId: userId };
    const otherReviews = reviewState.filter(item => item != newReview);

    const result = [...otherReviews, newReview];
    console.log(`updateRatingReview----------------`);
    result.map(item => console.log(`answer: ${item.post}, rate: ${item.rate}, userId: ${userId}`));
    setReviewState([...otherReviews, newReview]);
  };

  const moveToNextPage = (index: number) => {
    requestAnimationFrame(() => pagerViewRef.current?.setPage(index));
    setPageCount(pageCount + 1);
  };

  const isLastindex = (index: number) => {
    if (index == teamData?.teamMembers.length! - 1) return true;
    else false;
  };

  const beforeReviewModal = () => {
    modal?.show({
      content: (
        <SymbolCenteredModalContent
          title="잠깐!"
          text={'리뷰는 수정이 어려우니\n 신중하게 선택해주세요'}
          symbol={<Text style={{ fontSize: theme.emojiSize.sm, textAlign: 'center' }}>🥺</Text>}
          yesButton={{ title: '확인', onPress: () => modal.hide(), buttonStyle: { minWidth: 189 } }}
        />
      ),
    });
  };

  // useEffect(() => {
  //   let answeredCount = 0;
  //   reviewState.map(item => {
  //     //공백 제거
  //     const answer = item.answer.replace(/ /gi, '');
  //     console.log(`answer: ${item.answer}, rate: ${item.rate}`);
  //     if (answer.length != 0 || item.rate != '') {
  //       answeredCount += 1;
  //     }
  //   });
  //   console.log(`answeredCount: ${answeredCount}`);
  //   if (reviewState != null && answeredCount == reviewState.length) setButtonDisabled(false);
  //   else setButtonDisabled(true);
  // });
  // useEffect(() => {
  //   reviewQuestions?.map((item, index) =>
  //     setReviewState(prevState => [
  //       ...prevState,
  //       { answer: '', questionId: item.questionId, rate: '', revieweeUserId: '' },
  //     ]),
  //   );
  //   console.log(`reviewQuestions: ${reviewQuestions}`);
  //   console.log(`reviewState: ${reviewState}`);
  // }, [reviewQuestions]);

  const { teamId } = route.params!;

  useEffect(() => {
    console.log(`초기렌더링 시작`);
    beforeReviewModal();
    // dispatch(getTeamToReview(teamId));
    // dispatch(getReviewQuestions());
    setReviewState([]);
  }, []);

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
        {teamData?.projectName}
      </Text>
      <PagerView
        style={{ flex: 1, backgroundColor: 'white' }}
        orientation="horizontal"
        initialPage={0}
        ref={pagerViewRef}
        collapsable={false}
        scrollEnabled={false}
      >
        {teamData?.teamMembers.map((item, index) => (
          <View key={item.nickname}>
            <ScrollView style={{ flex: 1 }}>
              <CardWrapper
                style={{ marginLeft: 20, minWidth: 300, marginBottom: 10, marginTop: 2 }}
              >
                <View style={{ width: '100%' }}>
                  <View
                    style={{ flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 20 }}
                  >
                    <PositionIcon position={item.position} isRecruitDone={true} />
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
                      style={{ minHeight: 90 }}
                      maxLength={200}
                    />
                  </View>
                </View>
              </CardWrapper>
            </ScrollView>
            {isLastindex(index) ? (
              <FilledButton
                title={'완료'}
                buttonStyle={{ backgroundColor: theme.colors.primary }}
                containerStyle={{ marginHorizontal: 70 }}
                disabled={buttonDisabled}
                onPress={() => {
                  setReviewResultState(prevState => [...prevState, ...reviewState]);
                  setReviewState([]);
                  reviewResultState.map(item => {
                    console.log(
                      `item.answer:${item.post}, item.rate:${item.rate}, item.revieweeUserId:${item.userId}`,
                    );
                  });
                  //dispatch(createReview({ reviews: reviewResultState }, teamId));
                  navigation.goBack();
                }}
              />
            ) : (
              <FilledButton
                title={'다음'}
                buttonStyle={{ backgroundColor: theme.colors.primary }}
                containerStyle={{ marginHorizontal: 70 }}
                disabled={buttonDisabled}
                onPress={() => {
                  setReviewResultState(prevState => [...prevState, ...reviewState]);
                  //초기화
                  reviewQuestions?.map((item, index) =>
                    setReviewState(prevState => [...prevState, { post: '', rate: '', userId: '' }]),
                  );
                  moveToNextPage(pageCount);
                  setButtonDisabled(true); //초기화
                }}
              />
            )}
          </View>
        ))}
      </PagerView>
    </>
  );
};

export default TeamReview;
