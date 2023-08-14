import { getMyProfile } from '@/data/api/profile';
import { GetReviewProps, getTeamsToReview } from '@/data/api/review';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import TeamDto from '@/data/model/Team/TeamDto';
import CompletedTeamBanner from '@/presentation/components/CompletedTeamBanner';
import TeamBanner from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTeamToReview } from '@/redux/reducers/teamToReviewGetReducer';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { UseQueryResult, useQuery } from 'react-query';

export default function TeamHistory({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const dispatch = useAppDispatch();

  const QueryKey = {
    all: reviewKeys.reviewAvailableTeams,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  }: UseQueryResult<ProfileViewResponse> = useQuery([profileKeys.myProfile], () => getMyProfile(), {
    useErrorBoundary: true,
  });
  const [params, setParams] = useState({ pageFrom: 0, pageSize: 20 } as PageRequest);
  const { data, isLoading, error }: UseQueryResult<TeamDto[]> = useQuery(
    [reviewKeys.reviewAvailableTeams],
    async () => getTeamsToReview,
    {
      useErrorBoundary: true,
    },
  );
  if (isLoading && !data) {
    return <Text>로딩 중</Text>;
  }

  if (error) {
    return <Text>에러 발생</Text>;
  }

  if (!data) {
    return null;
  }
  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TeamReview', { teamId: item.teamId })}
            >
              <TeamBanner teamMembersCnt={item.teamMemberCnts} teamName={item.projectName} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
