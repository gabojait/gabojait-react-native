import { Position } from '@/data/model/type/Position';
import { TeamMemberStatus } from '@/data/model/type/TeamMemberStatus';
import GroupListCard from '@/presentation/components/TeamBanner';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

const OfferPage = ({ navigation }: MainStackScreenProps<'OfferPage'>) => {
  const arr: PositionRecruiting[] = [{ position: 'none', currentCnt: 0, recruitCnt: 0 }];
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        data={arr}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <GroupListCard teamMembersCnt={arr} teamName={'가보자잇'} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OfferPage;
