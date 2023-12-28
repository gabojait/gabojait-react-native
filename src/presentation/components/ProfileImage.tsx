import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import { Icon, makeStyles, useTheme } from '@rneui/themed';
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker';
import LoadingSpinner from '@/presentation/screens/Loading';
import { CachedImage } from '@georstat/react-native-image-cache';
import { defaultProfile } from '@/assets/images/imageUrls';

export const ProfileImage = ({
  imageUrl,
  onChangeImage,
  containerStyle,
}: {
  imageUrl: string | null;
  onChangeImage: (newImage: DocumentPickerResponse) => void;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  useEffect(() => {
    console.log(imageUrl);
  }, []);

  async function pickNewImage() {
    try {
      await DocumentPicker.pickSingle({
        type: [types.images],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      }).then(res => {
        onChangeImage(res);
      });
    } catch (e) {}
  }

  return (
    <View
      style={{
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: theme.colors.disabled,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          pickNewImage();
        }}
      >
        {!imageUrl ? (
          <Icon
            type="ionicon"
            name="camera-outline"
            size={25}
            color="#6C6C6C"
            style={{ flex: 1, width: 100, borderRadius: 10, height: 100, justifyContent: 'center' }}
          />
        ) : (
          <></>
        )}
        <CachedImage
          style={{
            flex: 1,
            aspectRatio: 1,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          imageStyle={{
            flex: 1,
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: theme.colors.disabled,
            justifyContent: 'center',
          }}
          source={imageUrl ?? defaultProfile}
          resizeMode={'cover'}
          loadingImageComponent={LoadingSpinner}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  profileContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
    top: -(100 - 30),
    left: 20,
  },
  profileTouchArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
}));
