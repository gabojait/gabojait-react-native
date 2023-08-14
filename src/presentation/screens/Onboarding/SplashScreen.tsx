import {RootStackScreenProps} from '@/presentation/navigation/types';
import {getUser} from '@/redux/action/login';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, PermissionsAndroid, Platform, SafeAreaView, View} from 'react-native';
import Splash from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import {createTable, getDBConnection, getNotifications, saveNotification} from "@/data/localdb";
import CodePush, {DownloadProgress, LocalPackage} from "react-native-code-push";
import {Text} from "@rneui/themed";
import styles from "@/presentation/styles";
import useGlobalStyles from "@/presentation/styles";
import {loginReducer} from "@/redux/reducers/loginReducer";
import {refreshToken} from "@/data/api/accounts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AsyncStorageKey} from "@/lib/asyncStorageKey";

interface SyncProgressViewProps {
    syncProgress: DownloadProgress;
}

function SyncProgressView({syncProgress}: SyncProgressViewProps) {
    const globalStyle = useGlobalStyles()
    return (
        <SafeAreaView style={globalStyle.container}>
            <View>
                <Text>안정적인 서비스 사용을 위해 내부 업데이트를 진행합니다.</Text>
                <Text>재시작까지 잠시만 기다려주세요.</Text>
                <View style={{width: Dimensions.get("screen").width}}>
                    <View
                        style={{
                            width:
                                (syncProgress.receivedBytes / syncProgress.totalBytes) *
                                Dimensions.get("screen").width,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const SplashScreen = ({navigation}: RootStackScreenProps<'SplashScreen'>) => {
    const handleRefresh = () => {
        console.log(user);
        if (!user.loading) {
            if (user.data && !user.error) {
                console.log('토큰 리프레시 성공. ');
                navigation.navigate('MainBottomTabNavigation', {
                    screen: 'Home',
                });
            }
            if (!user.data && user.error) {
                console.log('토큰 리프레시 실패. 로그인으로 이동.');
                navigation.navigate('OnboardingNavigation', {screen: 'Login'});
            }
            Splash.hide();
        }
    };

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.loginReducer.user);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        // Android 13 이상부터 수동으로 권한 요청 필요.
        if (Platform.OS === 'android' && Platform.Version >= 33)
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }


    useEffect(() => {
        // const checkCodePush = async () => {
        //     try {
        //         console.log("checking update")
        //         // Todo: 플랫폼별 업데이트 체크
        //         const update = await CodePush.checkForUpdate()
        //         if (update) {
        //             console.log("update exists: ", update)
        //             Alert.alert("업데이트 알림", `새로운 ${update.appVersion} 버전이 존재합니다. 업데이트 후 앱을 재시작합니다.`)
        //             update
        //                 .download((progress: DownloadProgress) => setSyncProgress(progress))
        //                 .then((newPackage: LocalPackage) =>
        //                     newPackage
        //                         .install(CodePush.InstallMode.IMMEDIATE)
        //                         .then(() => CodePush.restartApp())
        //                 );
        //             return;
        //         }
        //         console.log("update not exists1")
        //         throw new Error("업데이트 없음")
        //     } catch {
        //         console.log("update not exists2")
        //         setHasUpdate(false);
        //         await dispatch(getUser());
        //         await requestUserPermission();
        //     }
        // };
        dispatch(getUser());
         requestUserPermission();
        // checkCodePush();

    }, []);

    const setupFCM = async () => {
        if (!messaging().isAutoInitEnabled) await messaging().registerDeviceForRemoteMessages();

        // Get the device token
        const token = await messaging().getToken();
        console.log(token);

        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        if (Platform.OS == 'ios') {
            const apnsToken = await messaging().getAPNSToken();
            console.log("apnsToken: ", apnsToken);
        }
    };

    useEffect(() => {
        setupFCM();
        // Listen to whether the token changes
        return messaging().onTokenRefresh(async token => {
            // Todo: save token to server
            console.log("New FCM token: ", token);
            if (((await AsyncStorage.getItem(AsyncStorageKey.accessToken))?.length ?? 0) > 0
                && await refreshToken({fcmToken: token})) {
                console.info("FCM 토큰 리프레시 성공")
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage);
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            const db = await getDBConnection();
            if (!db) return;
            await createTable(db);
            await saveNotification(db, {
                id: parseInt(remoteMessage.messageId ?? "99999") ?? 0,
                title: remoteMessage.data?.title ?? "",
                body: remoteMessage.data?.body ?? "",
                time: remoteMessage.data?.time ?? "",
                type: remoteMessage.data?.type ?? ""
            });

            await db.close();

        });
        return unsubscribe;
    }, []);
    const [hasUpdate, setHasUpdate] = useState(true);
    const [syncProgress, setSyncProgress] = useState<DownloadProgress>();

    useEffect(() => {
        handleRefresh()
    }, [user]);

    return <View style={[{flex: 1, backgroundColor: ''}]}>
        {
            syncProgress &&
            <SyncProgressView syncProgress={syncProgress}/>
        }
    </View>;
};
export default SplashScreen;
