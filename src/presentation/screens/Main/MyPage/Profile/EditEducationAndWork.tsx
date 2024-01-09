import Education from '@/data/model/Profile/Education';
import Work from '@/data/model/Profile/Work';
import CustomInput from '@/presentation/components/CustomInput';
import DateDropdown from '@/presentation/components/DropdownWithoutItem';
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent';
import { ProfileStackParamListProps } from '@/presentation/navigation/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Text, useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { EditItem } from './EditPortfolio';
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
import { SquareIcon } from '@/presentation/components/icon/CustomIcon';
import useGlobalStyles from '@/presentation/styles';

const EditEducationAndWork = ({ navigation }: ProfileStackParamListProps<'EditSchoolAndWork'>) => {
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const educationInitializeRef = useRef(true);
  const workInitializeRef = useRef(true);
  const temporaryEducationId = useRef(data?.educations?.length || 0);
  const temporaryWorkId = useRef(data?.works?.length || 0);
  const educations = useMemo(() => {
    if (!data?.educations) {
      return [];
    }

    if (educationInitializeRef.current) {
      return initializeEducation();
    }

    return data.educations;
  }, [data?.educations]);
  const works = useMemo(() => {
    if (!data?.works) {
      return [];
    }

    if (workInitializeRef.current) {
      return initializeWork();
    }

    return data.works;
  }, [data?.works]);

  function initializeEducation() {
    if (!data?.educations) {
      return [];
    }
    educationInitializeRef.current = false;
    data.educations.forEach((it, idx) => {
      if (it.educationId) {
        dispatch(deleteEducation(it.educationId));
      }
      createOriginalEducation({ ...it, educationId: idx });
    });

    return data.educations.map((it, idx) => ({ ...it, educationId: idx }));
  }

  function initializeWork() {
    if (!data?.works) {
      return [];
    }
    workInitializeRef.current = false;
    data.works.forEach((it, idx) => {
      if (it.workId) {
        dispatch(deleteWork(it.workId));
      }
      createOriginalWork({ ...it, workId: idx });
    });

    return data.works.map((it, idx) => ({ ...it, workId: idx }));
  }

  function createOriginalEducation(education: Education) {
    dispatch(createEducation(education));
  }

  function createOriginalWork(work: Work) {
    dispatch(createWork(work));
  }

  const handleAddEducation = () => {
    dispatch(
      createEducation({
        educationId: temporaryEducationId.current++,
      } as Education),
    );
  };
  const handleDeleteEducation = (id: number) => {
    dispatch(deleteEducation(id));
  };

  const handleEditEducation = (school: Education) => {
    dispatch(updateEducation(school.educationId!, school));
  };

  const handleAddWork = () => {
    dispatch(
      createWork({
        workId: temporaryWorkId.current++,
      } as Work),
    );
  };
  const handleDeleteWork = (id: number) => {
    dispatch(deleteWork(id));
  };

  const handleEditWork = (work: Work) => {
    dispatch(updateWork(work.workId!, work));
  };

  useEffect(() => {
    console.log('학력 변경 감지');
    educations.map(value => {
      console.log(`{educationId: ${value.educationId}, `);
      console.log(`institutionName: ${value.institutionName}, `);
      console.log(`isCurrent: ${value.isCurrent}, `);
      console.log(`startedAt: ${value.startedAt}, `);
      console.log(`endedAt: ${value.endedAt}}`);
    });
  }, [educations]);

  useEffect(() => {
    console.log('경력 변경 감지');
    works.map(value => {
      console.log(`{workId: ${value.workId}, `);
      console.log(`corporationName: ${value.corporationName}, `);
      console.log(`workDescription: ${value.workDescription}, `);
      console.log(`isCurrent: ${value.isCurrent}, `);
      console.log(`startedAt: ${value.startedAt}, `);
      console.log(`endedAt: ${value.endedAt}}`);
    });
  }, [works]);

  return (
    <ScrollView style={globalStyles.container}>
      <Text
        style={{
          fontSize: theme.fontSize.xmd,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: 10,
        }}
      >
        학력
      </Text>
      <EducationList
        datas={educations}
        onAddData={handleAddEducation}
        onChangeData={handleEditEducation}
        onDeleteData={handleDeleteEducation}
      />
      <Text
        style={{
          fontSize: theme.fontSize.xmd,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: 10,
          paddingTop: 32,
        }}
      >
        경력
      </Text>
      <WorkList
        datas={works}
        onAddData={handleAddWork}
        onChangeData={handleEditWork}
        onDeleteData={handleDeleteWork}
      />
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export const EducationList = ({
  datas,
  onChangeData,
  onAddData,
  onDeleteData,
}: {
  datas: Education[];
  onChangeData: (data: Education) => void;
  onAddData: () => void;
  onDeleteData: (dataId: number) => void;
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
              id={_data.educationId!}
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
        onAdd={() => onAddData()}
      />
    </>
  );
};

function useDatePickerModal(onChangeData: (data: Periodical) => void) {
  const modal = useModal();
  const globalstyles = useGlobalStyles();
  const showDatePickerModal = (i: number, data: Periodical, dates: string[]) => {
    modal?.show({
      content: (
        <DatePickerModalContent
          title={
            <Text style={globalstyles.modalTitle}>
              {i == 0 ? '시작' : '끝난'} 기간을 입력해주세요
            </Text>
          }
          doneButtonText="다음"
          onModalVisibityChanged={(visibility, isCurrent) => {
            if (!visibility) {
              modal.hide();
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates);
              } else if (i == 1) {
                onChangeData({
                  ...data,
                  isCurrent,
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
}: {
  datas: Work[];
  onChangeData: (data: Work) => void;
  onAddData: () => void;
  onDeleteData: (dataId: number) => void;
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
              id={_data.workId!}
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
                shape="round"
                inputContainerStyle={{
                  borderColor: '#8e8e8e',
                  borderWidth: 1,
                  borderBottomColor: '#8e8e8e',
                  borderRadius: 20,
                }}
                containerStyle={{
                  marginTop: 20,
                }}
                placeholder={
                  '경력에 대한 설명을 적어주세요\nex)어떤 툴을 사용했고 어떤 직무를 했는지'
                }
              />
            </EditItem>
          );
        }}
        onAdd={() => onAddData()}
      />
    </>
  );
};

export const List = ({
  datas,
  renderItems,
  onAdd,
}: {
  datas: any[];
  renderItems: (data: any) => React.ReactNode;
  onAdd: () => void;
}) => {
  return (
    <View>
      {datas.map(renderItems)}
      <TouchableOpacity
        onPress={() => {
          onAdd();
        }}
        style={{ alignItems: 'center' }}
      >
        <SquareIcon name="add" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default EditEducationAndWork;
