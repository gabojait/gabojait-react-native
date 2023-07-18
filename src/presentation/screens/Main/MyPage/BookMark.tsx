import TeamBanner from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';

const BookMark = ({ navigation }: MainStackScreenProps<'BookMark'>) => {
  const arr: TeamBriefDto[] = [
    {
      teamId: 0,
      projectName: '가보자잇',
      teamMemberCnts: [],
      teamMembers: [],
      createdAt: '2023-07-16',
      updatedAt: '2023-07-16',
    },
  ];
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        data={arr}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupDetail', { teamId: item.teamId })}
          >
            <TeamBanner teamMembersCnt={item.teamMemberCnts} teamName={item.projectName} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookMark;
