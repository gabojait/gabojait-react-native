import Education from '@/data/model/Profile/Education';
import Work from '@/data/model/Profile/Work';
import CustomInput from '@/presentation/components/CustomInput';
import DateDropdown from '@/presentation/components/DropdownWithoutItem';
import { ModalContext } from '@/presentation/components/modal/context';
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EditItem, SquareIcon } from './EditPortfolio';
import {
  createEducation,
  createWork,
  deleteEducation,
  deleteWork,
  updateEducation,
  updateWork,
} from '@/redux/action/profileActions';
import useModal from '@/presentation/components/modal/useModal';
import { Periodical } from '@/data/model/Profile/Periodical';

const EditSchoolAndWork = ({ navigation }: ProfileStackParamListProps<'EditSchoolAndWork'>) => {
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const dispatch = useAppDispatch();

  const { educations, works } = {
    ...data,
    educations: data?.educations ?? [],
    works: data?.works ?? [],
  } ?? { educations: [], works: [] };

  // useEffect(() => {
  //   navigation.addListener('beforeRemove', () => {
  //     console.log('[Go out]', educations, works);
  //     dispatch(setEducationAndWorkAction({educations: educations, works}));
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log('Works Change:', works);
  // }, [works]);

  const handleAddSchool = (school: Education) => {
    dispatch(createEducation(school));
  };
  const handleDeleteSchool = (id: number) => {
    dispatch(deleteEducation(id));
  };

  const handleEditSchool = (school: Education) => {
    dispatch(updateEducation(school.educationId, school));
  };

  const handleAddCarrer = (work: Work) => {
    dispatch(createWork(work));
  };
  const handleDeleteWork = (id: number) => {
    dispatch(deleteWork(id));
  };

  const handleEditWork = (work: Work) => {
    dispatch(updateWork(work.workId, work));
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
      <EducationList
        datas={educations}
        onAddData={handleAddSchool}
        onChangeData={handleEditSchool}
        onDeleteData={handleDeleteSchool}
        title="학력"
      />
      <WorkList
        datas={works}
        onAddData={handleAddCarrer}
        onChangeData={handleEditWork}
        onDeleteData={handleDeleteWork}
        title="경력"
      />
    </ScrollView>
  );
};

export const EducationList = ({
  datas,
  onChangeData,
  onAddData,
  onDeleteData,
  title,
}: {
  datas: Education[];
  onChangeData: (data: Education) => void;
  onAddData: (data: Education) => void;
  onDeleteData: (dataId: number) => void;
  title: string;
}) => {
  const showDatePickerModal = useDatePickerModal((data: Periodical) =>
    onChangeData(data as Education),
  );

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Education;
          const dates = [
            _data.startedAt ?? new Date().toISOString(),
            _data.endedAt ?? new Date().toISOString(),
          ];
          return (
            <EditItem
              id={_data.educationId}
              name={_data.institutionName}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeleteData(itemId);
              }}
              onChangeName={text => onChangeData({ ..._data, institutionName: text })}
            >
              {/* 진행중인 경우 데이터 어떻게 처리됨? */}
              <DateDropdown
                text={
                  !dates[0] || !dates[1]
                    ? '기간 입력'
                    : `${new Date(dates[0]).toLocaleDateString()} ~ ${new Date(
                        dates[1],
                      ).toLocaleDateString()}`
                }
                onClick={() => showDatePickerModal(0, _data, dates)}
              />
            </EditItem>
          );
        }}
        onAdd={() =>
          onAddData({
            educationId: datas.length,
          } as Education)
        }
        title={title}
      />
    </>
  );
};

function useDatePickerModal(onChangeData: (data: Periodical) => void) {
  const modal = useModal();

  const showDatePickerModal = (i: number, data: Periodical, dates: string[]) => {
    modal?.show({
      content: (
        <DatePickerModalContent
          title={<Text h3>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>}
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide();
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates);
              } else if (i == 1) {
                onChangeData({
                  ...data,
                  startedAt: dates[0] ?? new Date().toISOString(),
                  endedAt: dates[1] ?? new Date().toISOString(),
                });
              }
            }
          }}
          date={new Date(dates[i] ?? new Date().toISOString())}
          onDatePicked={date => {
            dates[i] = date.toISOString();
          }}
          isCurrentCheckable={i != 0}
          isCurrent={data.isCurrent}
          setIsCurrent={isCurrent => {
            onChangeData({ ...data, isCurrent });
          }}
          minimumDate={i == 1 ? new Date(dates[0]) : undefined}
        />
      ),
    });
  };
  return showDatePickerModal;
}

export const WorkList = ({
  datas,
  onChangeData,
  onAddData,
  onDeleteData,
  title,
}: {
  datas: Work[];
  onChangeData: (data: Work) => void;
  onAddData: (data: Work) => void;
  onDeleteData: (dataId: number) => void;
  title: string;
}) => {
  const showDatePickerModal = useDatePickerModal((data: Periodical) => onChangeData(data as Work));

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Work;
          const dates = [
            _data.startedAt ?? new Date().toISOString(),
            _data.endedAt ?? new Date().toISOString(),
          ];
          return (
            <EditItem
              id={_data.workId}
              name={_data.corporationName}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeleteData(itemId);
              }}
              onChangeName={text => onChangeData({ ..._data, corporationName: text })}
            >
              {/* 진행중인 경우 데이터 어떻게 처리됨? */}
              <DateDropdown
                text={
                  !dates[0] || !dates[1]
                    ? '기간 입력'
                    : `${new Date(dates[0]).toLocaleDateString()} ~ ${new Date(
                        dates[1],
                      ).toLocaleDateString()}`
                }
                onClick={() => showDatePickerModal(0, _data, dates)}
              />
              <CustomInput
                value={_data.workDescription}
                onChangeText={text => onChangeData({ ..._data, workDescription: text })}
                numberOfLines={6}
                multiline
                style={{
                  minHeight: 6 * 20,
                }}
                placeholder={
                  '경력에 대한 설명을 적어주세요\nex)어떤 툴을 사용했고 어떤 직무를 했는지'
                }
              />
            </EditItem>
          );
        }}
        onAdd={() =>
          onAddData({
            workId: datas.length,
          } as Work)
        }
        title={title}
      />
    </>
  );
};

export const List = ({
  datas,
  renderItems,
  onAdd,
  title,
}: {
  datas: any[];
  renderItems: (data: any) => React.ReactNode;
  onAdd: () => void;
  title: string;
}) => {
  return (
    <>
      <Text h4>{title}</Text>
      {datas.map(renderItems)}
      <View style={{ alignItems: 'center' }}>
        <SquareIcon
          name="add"
          onPress={() => {
            onAdd();
          }}
        />
      </View>
    </>
  );
};

export default EditSchoolAndWork;
