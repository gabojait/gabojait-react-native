import TeamBanner from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Team from '@/presentation/model/Team';

const BookMark = ({ navigation }: MainStackScreenProps<'BookMark'>) => {
  const arr: Team[] = [
    {
      teamId: 'fasdfsf',
      projectName: '가보자잇',
      designers: [],
      backends: [],
      frontends: [],
      managers: [],
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
            <TeamBanner team={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookMark;
