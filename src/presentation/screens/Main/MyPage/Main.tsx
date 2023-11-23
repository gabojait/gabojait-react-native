import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { Suspense, useEffect } from 'react';
import { Icon, makeStyles, Text, useTheme } from '@rneui/themed';
import { MainBottomTabNavigationProps } from '@/presentation/navigation/types';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import DivideWrapper from '@/presentation/components/DivideWrapper';
import { RatingBar } from '@/presentation/components/RatingBar';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import { WIDTH, chagneToOfficialWord, isEmptyArray } from '@/presentation/utils/util';
import { UseQueryResult, useQuery, useQueryErrorResetBoundary } from 'react-query';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getMyProfile } from '@/data/api/profile';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import Loading from '../../Loading';
import { Position } from '@/data/model/type/Position';

const Main = ({ navigation, route }: MainBottomTabNavigationProps<'MyPage'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <MainComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};
const MainComponent = ({ navigation }: MainBottomTabNavigationProps<'MyPage'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const { data: profileData }: UseQueryResult<ProfileViewResponse> = useQuery(
    [profileKeys.myProfile],
    () => getMyProfile(),
    {
      useErrorBoundary: true,
    },
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}
      >
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.primary,
              }}
            >
              {profileData?.nickname}
            </Text>
            {profileData?.isLeader ? (
              <Text
                style={{
                  fontSize: theme.fontSize.md,
                  fontWeight: theme.fontWeight.medium,
                  color: theme.colors.grey1,
                  paddingTop: 10,
                  paddingStart: 5,
                }}
              >
                팀장님
              </Text>
            ) : (
              <></>
            )}
          </View>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.medium,
              paddingTop: 5,
            }}
          >
            {chagneToOfficialWord(profileData?.position)}
          </Text>
        </View>
        <CardWrapper
          style={[
            { borderRadius: 22, justifyContent: 'center', maxHeight: 45, paddingHorizontal: 22 },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('MainNavigation', { screen: 'Setting' })}
          >
            <Gabojait name="setting" size={34} color="black" />
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
        <CardWrapper style={[{ flex: 1, minHeight: 93, justifyContent: 'center', marginRight: 7 }]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainNavigation', {
                screen: 'BookMark',
                params: { isLeader: profileData?.isLeader ?? false },
              })
            }
          >
            <Icon type="ionicon" size={43} name="heart-circle-outline" />
            <Text style={{ textAlign: 'center' }}>찜</Text>
          </TouchableOpacity>
        </CardWrapper>
        <CardWrapper style={[{ flex: 1, minHeight: 93, justifyContent: 'center', marginLeft: 7 }]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainNavigation', {
                screen: 'Profile',
                params: { screen: 'View' },
              })
            }
          >
            <Gabojait style={{ padding: 5 }} name="person" size={34} color="black" />
            <Text style={{ textAlign: 'center' }}>프로필</Text>
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={styles.divider}>
        {profileData?.isLeader ? (
          <LeaderComponent
            onPressApply={() =>
              navigation.navigate('MainNavigation', {
                screen: 'ApplyStatus',
                params: { screen: 'Frontend', params: { position: Position.Frontend } },
              })
            }
            onPressTeam={() =>
              navigation.push('MainNavigation', {
                screen: 'OfferSentUser',
                params: { screen: 'Frontend', params: { position: Position.Frontend } },
              })
            }
            onPressHistory={() => navigation.navigate('MainNavigation', { screen: 'TeamHistory' })}
          />
        ) : (
          <MemberComponent
            onPressApply={() =>
              navigation.navigate('MainNavigation', { screen: 'OfferFromTeamPage' })
            }
            onPressTeam={() =>
              navigation.navigate('MainNavigation', { screen: 'OfferToTeamHistory' })
            }
            onPressHistory={() => navigation.navigate('MainNavigation', { screen: 'TeamHistory' })}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: theme.fontWeight.bold,
          marginLeft: 24,
          paddingBottom: 3,
          marginTop: 20,
        }}
      >
        나의 리뷰
      </Text>
      {isEmptyArray(profileData?.reviews) ? <NoReview /> : <MyReview data={profileData!} />}
    </ScrollView>
  );
};

interface ReviewItemProps {
  name: string;
  score: number;
  content: string;
}

const ReviewItem = ({ name, score, content }: ReviewItemProps) => {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(WIDTH);
  }, []);
  return (
    <CardWrapper
      style={{
        minHeight: 180,
        width: WIDTH / 1.2,
        marginHorizontal: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.disabled,
      }}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.bold,
              paddingRight: 5,
            }}
          >
            {name}
          </Text>
          <RatingBar ratingScore={score} size={theme.ratingBarSize.xs} />
        </View>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={{
            color: theme.colors.grey1,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.light,
            lineHeight: 25,
          }}
        >
          {content}
        </Text>
      </View>
    </CardWrapper>
  );
};

interface Component {
  onPressApply: () => void;
  onPressTeam: () => void;
  onPressHistory: () => void;
}

const MemberComponent = ({ onPressApply, onPressTeam, onPressHistory }: Component) => {
  const styles = useStyles();

  return (
    <DivideWrapper style={{ flex: 1, minHeight: 93, justifyContent: 'center' }}>
      <View>
        <TouchableOpacity onPress={() => onPressApply()}>
          <Icon type="ionicon" size={43} name="grid-outline" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>받은 제안</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressTeam()}>
          <Icon type="ionicon" size={43} name="document-text-outline" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>지원한 팀</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressHistory()}>
          <Gabojait style={{ padding: 5 }} name="people" size={34} color="black" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>팀 히스토리</Text>
        </TouchableOpacity>
      </View>
    </DivideWrapper>
  );
};

const LeaderComponent = ({ onPressApply, onPressTeam, onPressHistory }: Component) => {
  const styles = useStyles();

  return (
    <DivideWrapper style={{ flex: 1, minHeight: 93, justifyContent: 'center' }}>
      <View>
        <TouchableOpacity onPress={() => onPressApply()}>
          <Icon type="ionicon" size={43} name="grid-outline" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>지원 소식</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressTeam()}>
          <Icon type="ionicon" size={43} name="document-text-outline" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>보낸제안</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressHistory()}>
          <Gabojait style={{ padding: 5 }} name="people" size={34} color="black" />
          <Text style={{ textAlign: 'center', paddingTop: 5 }}>팀 히스토리</Text>
        </TouchableOpacity>
      </View>
    </DivideWrapper>
  );
};

const MyReview = ({ data }: { data: ProfileViewDto }) => {
  const { theme } = useTheme();

  return (
    <>
      <View style={{ marginLeft: 20, flexDirection: 'row' }}>
        <RatingBar ratingScore={data?.rating} size={theme.ratingBarSize.md} />
        <Text style={{ fontSize: 20, fontWeight: theme.fontWeight.bold, paddingLeft: 9 }}>
          {data?.rating}
        </Text>
      </View>
      <View style={{ paddingBottom: 70 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data?.reviews}
          renderItem={({ item }) => (
            <ReviewItem name={item.reviewer} score={2.5} content={item.post} />
          )}
        />
      </View>
    </>
  );
};

const NoReview = () => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontSize: theme.fontSize?.lg,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.grey2,
        textAlign: 'center',
        paddingVertical: 130,
      }}
    >
      아직 작성된 리뷰가 없어요!
    </Text>
  );
};

const useStyles = makeStyles(theme => ({
  scrollView: {
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
}));

export default Main;
