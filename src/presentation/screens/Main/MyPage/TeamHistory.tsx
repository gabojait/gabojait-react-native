import { getMyProfile } from '@/data/api/profile';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import CompletedTeamBanner from '@/presentation/components/CompletedTeamBanner';
import TeamBanner from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTeamToReview } from '@/redux/reducers/teamToReviewGetReducer';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { UseQueryResult, useQuery } from 'react-query';

export default function TeamHistory({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const dispatch = useAppDispatch();

  const { data, isLoading, error }: UseQueryResult<ProfileViewResponse> = useQuery(
    profileKeys.myProfile,
    () => getMyProfile(),
    {
      useErrorBoundary: true,
      retry: 1,
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
          data={data.completedTeams}
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
