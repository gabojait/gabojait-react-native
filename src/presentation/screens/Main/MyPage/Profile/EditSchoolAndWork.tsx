import Education from '@/data/model/Profile/Education';
import Work from '@/data/model/Profile/Work';
import CustomInput from '@/presentation/components/CustomInput';
import DateDropdown from '@/presentation/components/DropdownWithoutItem';
import { ModalContext } from '@/presentation/components/modal/context';
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import { setEducationAndWorkAction, setEducations, setWorks } from '@/redux/action/profileActions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EditItem, SquareIcon } from './EditPortfolio';

const EditSchoolAndWork = ({ navigation }: ProfileStackParamListProps<'EditSchoolAndWork'>) => {
  const works = useAppSelector(state => state.profileReducer.works);
  const educations = useAppSelector(state => state.profileReducer.educations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      console.log('[Go out]', educations, works);
      dispatch(setEducationAndWorkAction({ educations: educations, works }));
    });
  }, []);

  useEffect(() => {
    console.log('Works Change:', works);
  }, [works]);

  const handleAddSchool = (school: Education) => {
    dispatch(
      setEducations([...educations, { ...school, educationId: educations.length.toString() }]),
    );
  };
  const handleDeleteSchool = (id: string) => {
    const idx = educations.findIndex(item => item.educationId == id);
    educations.splice(idx, 1);
    dispatch(setEducations([...educations]));
  };

  const handleEditSchool = (school: Education) => {
    const idx = educations.findIndex(item => item.educationId == school.educationId);
    educations[idx] = school;
    dispatch(setEducations([...educations]));
  };

  const handleAddCarrer = (work: Work) => {
    dispatch(setWorks([...works, { ...work, workId: works.length.toString() }]));
  };
  const handleDeleteWork = (id: string) => {
    const idx = works.findIndex(item => item.workId == id);
    works.splice(idx, 1);
    dispatch(setWorks([...works]));
  };

  const handleEditWork = (work: Work) => {
    const idx = works.findIndex(item => item.workId == work.workId);
    const list = [...works];
    list[idx] = work;
    dispatch(setWorks([...list]));
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
  onDeleteData: (dataId: string) => void;
  title: string;
}) => {
  const modal = React.useContext(ModalContext);

  const showDatePickerModal = (i: number, data: Education, dates: string[]) => {
    modal?.show({
      title: <Text>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>,
      content: (
        <DatePickerModalContent
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide();
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates);
              } else if (i == 1) {
                console.log(dates);
                onChangeData({
                  ...data,
                  startedDate: dates[0] ?? new Date().toISOString(),
                  endedDate: dates[1] ?? new Date().toISOString(),
                });
              }
            }
          }}
          date={new Date(dates[i] ?? new Date().toISOString())}
          onDatePicked={date => {
            dates[i] = date.toISOString();
          }}
          isCurrentCheckable
          isCurrent={data.isCurrent}
          setIsCurrent={isCurrent => {
            onChangeData({ ...data, isCurrent });
          }}
          minimumDate={i == 1 ? new Date(dates[0]) : undefined}
        />
      ),
    });
  };

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Education;
          const dates = [
            _data.startedDate ?? new Date().toISOString(),
            _data.endedDate ?? new Date().toISOString(),
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
            educationId: datas.length.toString(),
          } as Education)
        }
        title={title}
      />
    </>
  );
};

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
  onDeleteData: (dataId: string) => void;
  title: string;
}) => {
  const modal = React.useContext(ModalContext);

  const showDatePickerModal = (i: number, data: Work, dates: string[]) => {
    modal?.show({
      title: <Text>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>,
      content: (
        <DatePickerModalContent
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide();
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates);
              } else if (i == 1) {
                console.log(dates);
                onChangeData({
                  ...data,
                  startedDate: dates[0] ?? new Date().toISOString(),
                  endedDate: dates[1] ?? new Date().toISOString(),
                });
              }
            }
          }}
          date={new Date(dates[i] ?? new Date().toISOString())}
          onDatePicked={date => {
            dates[i] = date.toISOString();
          }}
          isCurrentCheckable
          isCurrent={data.isCurrent}
          setIsCurrent={isCurrent => {
            onChangeData({ ...data, isCurrent });
          }}
          minimumDate={i == 1 ? new Date(dates[0]) : undefined}
        />
      ),
    });
  };

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Work;
          const dates = [
            _data.startedDate ?? new Date().toISOString(),
            _data.endedDate ?? new Date().toISOString(),
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
            workId: datas.length.toString(),
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
