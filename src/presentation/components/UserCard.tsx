import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CardWrapper from './CardWrapper';
import { RatingBar } from './RatingBar';
import Gabojait from './icon/Gabojait';
import { makeStyles, useTheme } from '@rneui/themed';
import UserProfileDto from '@/data/model/User/UserProfileDto';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import { Position } from '@/data/model/type/Position';
import { mapPositionToKorean } from '../utils/PositionDropdownUtils';
import { Chip, sliderColors } from '@/presentation/screens/Main/MyPage/Profile';
import { Level } from '@/data/model/Profile/Skill';

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
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <RatingBar ratingScore={item.rating} />
              <Text style={styles.score}>{item.rating}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.skills.map(skill => (
                <Chip
                  style={[
                    styles[skill.level],
                    {
                      borderRadius: theme.radius.sm,
                      padding: 10,
                      borderWidth: 0,
                    },
                  ]}
                >
                  <Text>{skill.skillName}</Text>
                </Chip>
              ))}
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
  LOW: {
    backgroundColor: theme.customColors.red,
  },
  MID: {
    backgroundColor: theme.customColors.orange,
  },
  HIGH: {
    backgroundColor: theme.customColors.yellow,
  },
}));
