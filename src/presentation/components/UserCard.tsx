import React, { useState } from 'react';
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
import { Image } from 'react-native';
import LoadingSpinner from '@/presentation/screens/Loading';
import { CachedImage } from '@georstat/react-native-image-cache';

const DefaultProfileImage = require('@/assets/images/default_profile_image.png');
export const UserCard = ({
  item,
  position,
}: {
  item: UserProfileDto | UserProfileOfferDto;
  position: Position;
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const [imagesNotValid, setImagesNotValid] = useState(new Set());
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
            paddingHorizontal: 24,
            justifyContent: 'space-between',
            alignContent: 'center',
            gap: 20,
          }}
        >
          <View style={{ height: '100%', display: 'flex' }}>
            <CachedImage
              style={{ flex: 1, aspectRatio: 1, borderRadius: 8.8 }}
              imageStyle={{ flex: 1, aspectRatio: 1, borderRadius: 8.8 }}
              source={
                !item.imageUrl || imagesNotValid.has(item.imageUrl)
                  ? DefaultProfileImage
                  : item.imageUrl
              }
              resizeMode={'cover'}
              onError={() => setImagesNotValid(prev => prev.add(item.imageUrl))}
              loadingImageComponent={LoadingSpinner}
            />
          </View>
          <View>
            <Text style={styles.name}>{item.nickname}</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <RatingBar ratingScore={item.rating} />
              <Text style={styles.score}>{item.rating}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.skills.length === 0 && <View style={{ height: 38, padding: 10 }} />}
              {item.skills?.map(skill => (
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
