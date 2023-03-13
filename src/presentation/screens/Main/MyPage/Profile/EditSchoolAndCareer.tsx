import Education from '@/model/Profile/Education'
import Work from '@/model/Profile/Work'
import CustomInput from '@/presentation/components/CustomInput'
import DateDropdown from '@/presentation/components/DropdownWithoutItem'
import {ModalContext} from '@/presentation/components/modal/context'
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent'
import {Text} from '@rneui/themed'
import React, {useState} from 'react'
import {ScrollView, View} from 'react-native'
import {EditItem, SquareIcon} from './EditPortfolio'

const EditSchoolAndCareer = ({}) => {
  const orgCareer = [
    {
      corporationName: '00회사에서 인턴',
      description: 'string',
      endedDate: '2022-01-01',
      isCurrent: true,
      schemaVersion: 'string',
      startedDate: '2022-06-01',
      workId: '1',
    },
    {
      corporationName: '11회사에서 인턴',
      description: 'string',
      endedDate: '2023-02-26',
      isCurrent: true,
      schemaVersion: 'string',
      startedDate: '2022-07-01',
      workId: '2',
    },
  ]
  const orgSchool = [
    {
      educationId: 'string',
      endedDate: '2023-01-01',
      institutionName: '인천대학교 디자인학부 재학중',
      isCurrent: true,
      schemaVersion: 'string',
      startedDate: '2022-07-01',
    },
  ]
  const [careers, setCarrers] = useState(orgCareer)
  const [schools, setSchools] = useState(orgSchool)

  const handleAddSchool = (school: Education) => {
    setSchools(prevState => [...prevState, {...school, educationId: prevState.length.toString()}])
  }
  const handleDeleteSchool = (id: string) => {
    setSchools(prevState => {
      const idx = prevState.findIndex(item => item.educationId == id)
      prevState.splice(idx, 1)
      return [...prevState]
    })
  }

  const handleEditSchool = (school: Education) => {
    setSchools(prevState => {
      const idx = prevState.findIndex(item => item.educationId == school.educationId)
      prevState[idx] = school
      return [...prevState]
    })
  }

  const handleAddCarrer = (career: Work) => {
    setCarrers(prevState => [...prevState, {...career, workId: prevState.length.toString()}])
  }
  const handleDeleteCareer = (id: string) => {
    setCarrers(prevState => {
      const idx = prevState.findIndex(item => item.workId == id)
      prevState.splice(idx, 1)
      return [...prevState]
    })
  }

  const handleEditCareer = (career: Work) => {
    setCarrers(prevState => {
      const idx = prevState.findIndex(item => item.workId == career.workId)
      prevState[idx] = career
      return [...prevState]
    })
  }

  return (
    <ScrollView style={{padding: 20, backgroundColor: 'white'}}>
      <EducationList
        datas={schools}
        onAddData={handleAddSchool}
        onChangeData={handleEditSchool}
        onDeleteData={handleDeleteSchool}
        title="학력"
      />
      <WorkList
        datas={careers}
        onAddData={handleAddCarrer}
        onChangeData={handleEditCareer}
        onDeleteData={handleDeleteCareer}
        title="경력"
      />
    </ScrollView>
  )
}

export const EducationList = ({
  datas,
  onChangeData,
  onAddData,
  onDeleteData,
  title,
}: {
  datas: Education[]
  onChangeData: (data: Education) => void
  onAddData: (data: Education) => void
  onDeleteData: (dataId: string) => void
  title: string
}) => {
  const modal = React.useContext(ModalContext)

  const showDatePickerModal = (i: number, data: Education, dates: string[]) => {
    modal?.show({
      title: <Text>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>,
      content: (
        <DatePickerModalContent
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide()
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates)
              } else if (i == 1) {
                console.log(dates)
                onChangeData({
                  ...data,
                  startedDate: dates[0] ?? new Date().toISOString(),
                  endedDate: dates[1] ?? new Date().toISOString(),
                })
              }
            }
          }}
          date={new Date(dates[i] ?? new Date().toISOString())}
          onDatePicked={date => {
            dates[i] = date.toISOString()
          }}
          isCurrentCheckable
          isCurrent={data.isCurrent}
          setIsCurrent={isCurrent => {
            onChangeData({...data, isCurrent})
          }}
          minimumDate={i == 1 ? new Date(dates[0]) : undefined}
        />
      ),
    })
  }

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Education
          let dates = [
            _data.startedDate ?? new Date().toISOString(),
            _data.endedDate ?? new Date().toISOString(),
          ]
          return (
            <EditItem
              id={_data.educationId}
              name={_data.institutionName}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeleteData(itemId)
              }}
              onChangeName={text => onChangeData({..._data, institutionName: text})}>
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
          )
        }}
        onAdd={() =>
          onAddData({
            educationId: datas.length.toString(),
          } as Education)
        }
        title={title}
      />
    </>
  )
}

export const WorkList = ({
  datas,
  onChangeData,
  onAddData,
  onDeleteData,
  title,
}: {
  datas: Work[]
  onChangeData: (data: Work) => void
  onAddData: (data: Work) => void
  onDeleteData: (dataId: string) => void
  title: string
}) => {
  const modal = React.useContext(ModalContext)

  const showDatePickerModal = (i: number, data: Work, dates: string[]) => {
    modal?.show({
      title: <Text>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>,
      content: (
        <DatePickerModalContent
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide()
              if (i == 0) {
                showDatePickerModal(i + 1, data, dates)
              } else if (i == 1) {
                console.log(dates)
                onChangeData({
                  ...data,
                  startedDate: dates[0] ?? new Date().toISOString(),
                  endedDate: dates[1] ?? new Date().toISOString(),
                })
              }
            }
          }}
          date={new Date(dates[i] ?? new Date().toISOString())}
          onDatePicked={date => {
            dates[i] = date.toISOString()
          }}
          isCurrentCheckable
          isCurrent={data.isCurrent}
          setIsCurrent={isCurrent => {
            onChangeData({...data, isCurrent})
          }}
          minimumDate={i == 1 ? new Date(dates[0]) : undefined}
        />
      ),
    })
  }

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          const _data = data as Work
          let dates = [
            _data.startedDate ?? new Date().toISOString(),
            _data.endedDate ?? new Date().toISOString(),
          ]
          return (
            <EditItem
              id={_data.workId}
              name={_data.corporationName}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeleteData(itemId)
              }}
              onChangeName={text => onChangeData({..._data, corporationName: text})}>
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
          )
        }}
        onAdd={() =>
          onAddData({
            workId: datas.length.toString(),
          } as Work)
        }
        title={title}
      />
    </>
  )
}

export const List = ({
  datas,
  renderItems,
  onAdd,
  title,
}: {
  datas: any[]
  renderItems: (data: any) => React.ReactNode
  onAdd: () => void
  title: string
}) => {
  return (
    <>
      <Text h4>{title}</Text>
      {datas.map(renderItems)}
      <View style={{alignItems: 'center'}}>
        <SquareIcon
          name="add"
          onPress={() => {
            onAdd()
          }}
        />
      </View>
    </>
  )
}

export default EditSchoolAndCareer
