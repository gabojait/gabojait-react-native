import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CardWrapper from './CardWrapper';
import { RatingBar } from './RatingBar';
import { makeStyles, useTheme } from '@rneui/themed';
import UserProfileDto from '@/data/model/User/UserProfileDto';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import { Position } from '@/data/model/type/Position';
import { Chip } from '@/presentation/screens/Main/MyPage/Profile';
import LoadingSpinner from '@/presentation/screens/Loading';
import { CachedImage } from '@georstat/react-native-image-cache';
import { defaultProfile } from '@/assets/images/imageUrls';

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
            paddingVertical: 31,
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignContent: 'center',
            gap: 20,
          }}
        >
          <View style={{ height: '100%', display: 'flex' }}>
            <CachedImage
              style={{
                flex: 1,
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: theme.colors.disabled,
                justifyContent: 'center',
              }}
              imageStyle={{
                flex: 1,
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: theme.colors.disabled,
                justifyContent: 'center',
              }}
              source={
                !item.imageUrl || imagesNotValid.has(item.imageUrl) ? defaultProfile : item.imageUrl
              }
              resizeMode={'cover'}
              onError={() => setImagesNotValid(prev => prev.add(item.imageUrl))}
              loadingImageComponent={LoadingSpinner}
            />
          </View>
          <View style={{ paddingStart: 20 }}>
            <Text style={styles.name}>{item.nickname}</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
              <RatingBar ratingScore={item.rating} size={20} />
              <Text style={styles.score}>{item.rating}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {item.skills.length === 0 && <View style={{ height: 38, padding: 10 }} />}
              {item.skills?.map(skill => (
                <Chip
                  style={[
                    styles[skill.level],
                    {
                      borderRadius: theme.radius.xs,
                      padding: 5,
                      borderWidth: 0,
                    },
                  ]}
                >
                  <Text>{skill.skillName}</Text>
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </CardWrapper>
    </>
  );
};
const useStyles = makeStyles(theme => ({
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight?.semibold,
    color: 'black',
    paddingBottom: 5,
  },
  position: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight?.light,
    color: 'black',
  },
  score: {
    fontSize: theme.fontSize.md,
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
