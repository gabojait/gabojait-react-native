import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Alert, ImageBackground, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { makeStyles } from '@rneui/themed';

export const ProfileImage = ({
  image,
  setImage,
}: {
  image: Asset | null;
  setImage: (asset: Asset) => void;
}) => {
  const styles = useStyles();
  return !image ? (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
          });
          setImage(result.assets?.[0]!);
          console.log(result.assets?.[0]?.fileName);
        }}
        style={styles.profileTouchArea}
      >
        <MaterialIcon name="camera-alt" size={25} color="#6C6C6C" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.profileContainer}>
      <ImageBackground source={image} borderRadius={8}>
        <TouchableOpacity
          onPress={async () => {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              selectionLimit: 1,
            });
            if ((result.assets?.length ?? 0) === 1) {
              if ((result.assets?.[0].fileSize ?? 0) / 1024 / 1024 > 3) {
                Alert.alert('사진 용량', '사진 용량은 3MB를 넘을 수 없습니다.');
              }

              setImage(result.assets?.[0]!);
            }
          }}
          style={styles.profileTouchArea}
        />
      </ImageBackground>
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
