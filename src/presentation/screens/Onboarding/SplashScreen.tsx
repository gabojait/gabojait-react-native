import {RootStackScreenProps} from '@/presentation/navigation/types';
import {getUser} from '@/redux/action/login';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, {useEffect} from 'react';
import {Alert, PermissionsAndroid, Platform, View} from 'react-native';
import Splash from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import {createTable, getDBConnection, getNotifications, saveNotification} from "@/data/localdb";

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
        dispatch(getUser());
        requestUserPermission();
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
        return messaging().onTokenRefresh(token => {
            // Todo: save token to server
            console.log(token);
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
                time: remoteMessage.data?.time ?? ""
            });

            await db.close();

        });
        return unsubscribe;
    }, []);

    useEffect(handleRefresh, [user]);
    return <View style={[{flex: 1, backgroundColor: ''}]}></View>;
};
export default SplashScreen;
