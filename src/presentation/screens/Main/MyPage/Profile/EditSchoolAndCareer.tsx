import Education from '@/model/Profile/Education'
import DateDropdown from '@/presentation/components/DropdownWithoutItem'
import {ModalContext} from '@/presentation/components/modal/context'
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent'
import {Text} from '@rneui/themed'
import React, {useState} from 'react'
import {View} from 'react-native'
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
      workId: 'string',
    },
    {
      corporationName: '11회사에서 인턴',
      description: 'string',
      endedDate: '2023-02-26',
      isCurrent: true,
      schemaVersion: 'string',
      startedDate: '2022-07-01',
      workId: 'string',
    },
  ]
  const orgSchool = [
    {
      educationId: 'string',
      endedDate: 'string',
      institutionName: '인천대학교 디자인학부 재학중',
      isCurrent: true,
      schemaVersion: 'string',
      startedDate: 'string',
    },
  ]
  const [careers, setCarrers] = useState(orgCareer)
  const [schools, setSchools] = useState(orgSchool)

  return
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
  let dates = ['', '']

  const showDatePickerModal = (i: number, data: Education) => {
    modal?.show({
      title: <Text>{i == 0 ? '시작' : '끝난'} 기간을 입력해주세요</Text>,
      content: (
        <DatePickerModalContent
          doneButtonText="다음"
          onModalVisibityChanged={visibility => {
            if (!visibility) {
              modal.hide()
              if (i == 0) {
                showDatePickerModal(i + 1, data)
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
        />
      ),
    })
  }

  return (
    <>
      <List
        datas={datas}
        renderItems={data => {
          return (
            <EditItem
              id={data.dataId}
              name={data.name}
              titleEditable
              fieldColor="white"
              onDeleteItem={itemId => {
                onDeleteData(itemId)
              }}
              onChangeName={text => onChangeData({...data, name: text})}>
              {/* 진행중인 경우 데이터 어떻게 처리됨? */}
              <DateDropdown
                text={
                  !dates[0] || !dates[1]
                    ? '기간 입력'
                    : `${new Date(dates[0]).toLocaleDateString()} ~ ${new Date(
                        dates[1],
                      ).toLocaleDateString()}`
                }
                onClick={() => showDatePickerModal(0, data)}
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
