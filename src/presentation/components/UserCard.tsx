import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { theme } from '../theme';
import CardWrapper from './CardWrapper';
import { RatingBar } from './RatingBar';
import Gabojait from './icon/Gabojait';
import { makeStyles, useTheme } from '@rneui/themed';
import UserProfileDto from '@/data/model/User/UserProfileDto';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import { Position } from '@/data/model/type/Position';
import { mapPositionToKorean } from '../utils/PositionDropdownUtils';

export const UserCard = ({
  item,
  position,
}: {
  item: UserProfileDto | UserProfileOfferDto;
  position: Position;
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <>
      <CardWrapper
        style={{
          marginVertical: 5,
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 32,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <View>
            <Text style={styles.name}>{item.nickname}</Text>
            <Text style={styles.position}>{mapPositionToKorean(position)}</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <RatingBar ratingScore={item.rating} />
              <Text style={styles.score}>{item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Gabojait name="arrow-next" size={28} color={theme.colors.disabled} />
          </TouchableOpacity>
        </View>
      </CardWrapper>
    </>
  );
};
const useStyles = makeStyles(theme => ({
  name: {
    fontSize: 18,
    fontWeight: theme.fontWeight?.semibold,
    color: 'black',
  },
  position: {
    fontSize: 12,
    fontWeight: theme.fontWeight?.light,
    color: 'black',
    paddingBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: theme.fontWeight?.bold,
    color: 'black',
    paddingLeft: 10,
  },
}));
