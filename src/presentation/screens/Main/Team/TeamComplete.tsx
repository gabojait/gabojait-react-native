import { completeTeam } from '@/data/api/team';
import ProjectUrl from '@/data/model/Team/ProjectUrl';
import { FilledButton } from '@/presentation/components/Button';
import CustomInput from '@/presentation/components/CustomInput';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationForm } from '@/reactQuery/util/useMutationForm';
import { useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export const TeamComplete = ({ navigation }: MainStackScreenProps<'TeamComplete'>) => {
  const [link, setLink] = useState<ProjectUrl>({ projectUrl: '' });
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const teamComplete = useMutationForm<ProjectUrl, unknown>({
    mutationKey: teamKeys.completeTeam,
    mutationFn: async (dto: ProjectUrl) => completeTeam(dto),
    useErrorBoundary: true,
  });

  if (teamComplete.data) {
    navigation.navigate('CompleteSuccess');
  }

  return (
    <View style={[globalStyles.container]}>
      <Text
        style={{
          fontWeight: theme.fontWeight.semibold,
          fontSize: 15,
          color: 'black',
          textAlign: 'center',
          paddingBottom: 20,
        }}
      >
        {'프로젝트 링크를 남겨주세요:)'}
      </Text>
      <CustomInput
        value={link.projectUrl}
        placeholder={'깃허브, XD, 앱스토어, 피그마 등'}
        onChangeText={(text: string) => {
          setLink({ projectUrl: text });
        }}
        shape="round"
      />
      <FilledButton
        onPress={() => {
          teamComplete.mutation(link);
        }}
        title={'제출하기'}
        containerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};
