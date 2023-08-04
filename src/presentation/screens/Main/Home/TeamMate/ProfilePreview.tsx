import { MainStackScreenProps, TeammateStackParamListProps } from '@/presentation/navigation/types';
import React from 'react';
import { Text } from 'react-native';

const ProfilePreview = ({ navigation, route }: TeammateStackParamListProps<'ProfilePreview'>) => {
  return <ProfilePreviewComponent navigation={navigation} route={route} />;
};

const ProfilePreviewComponent = ({
  navigation,
  route,
}: TeammateStackParamListProps<'ProfilePreview'>) => {
  return (
    <>
      <Text>ProfilePreview</Text>
    </>
  );
};
export default ProfilePreview;
