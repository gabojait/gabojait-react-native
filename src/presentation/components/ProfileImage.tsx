import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { makeStyles, useTheme } from '@rneui/themed';
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker';
import LoadingSpinner from '@/presentation/screens/Loading';
import { CachedImage } from '@georstat/react-native-image-cache';

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

  return !imageUrl ? (
    <View style={[styles.profileContainer, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          pickNewImage();
        }}
        style={styles.profileTouchArea}
      >
        <MaterialIcon name="camera-alt" size={25} color="#6C6C6C" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ width: 100, borderRadius: 10 }}>
      <TouchableOpacity
        onPress={() => {
          pickNewImage();
        }}
      >
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
          source={imageUrl}
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
