import { Icon, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { PixelRatio, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { Position } from '@/data/model/type/Position';
import PositionDropdownContent from '@/presentation/model/PositionDropdownContent';
import PositionCount from '../model/PositionCount';
import { mapKoreanToPosition, mapPositionToTextName } from '../utils/PositionDropdownUtils';
import PositionRecruiting from '../model/PositionRecruitng';
import { mapToInitial } from '../utils/util';

interface positionDropdownProps {
  onCloseClick: () => void;
  onSelectPosition: (data: PositionCount) => void;
  dropdownData: PositionDropdownContent[];
  onDropdownSelected: (value: Position) => void;
  defaultData: PositionRecruiting;
  isSingleSelection: boolean;
}

export const PositionDropdown = ({
  onCloseClick,
  onSelectPosition,
  dropdownData,
  onDropdownSelected,
  defaultData,
  isSingleSelection,
}: positionDropdownProps) => {
  const { theme } = useTheme();
  const [position, setPosition] = useState<Position>(defaultData.position);
  const [count, setCount] = useState(defaultData.recruitCnt);
  const [placeholdeText, setPlaceholdText] = useState<string | (() => string)>(
    mapPositionToTextName(defaultData.position),
  );
  const [select, setSelected] = useState(false);
  const [codename, setCodename] = useState('');
  const [positionResult, setPositionResult] = useState<PositionCountDto>({
    position: defaultData.position,
    totalRecruitCnt: defaultData.recruitCnt,
  });

  useEffect(() => {
    handleSelectPosition();
  }, [count]);

  useEffect(() => {
    handleSelectPosition();
  }, [position]);

  useEffect(() => {
    onSelectPosition(positionResult);
  }, [positionResult]);

  function initializePlaceHolderText(text: string | (() => string)) {
    if (text == '') {
      return '팀원 포지션을 선택해주세요';
    } else {
      return placeholdeText;
    }
  }

  function onPositionSelected(value: string) {
    const position = mapKoreanToPosition(value);
    setPosition(position as Position);
    onDropdownSelected(position as Position);
  }

  function handleSelectPosition() {
    if (position != Position.None) {
      setImage(position);
      setPositionResult({ position: position, totalRecruitCnt: count });
    }
  }

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    count > 0 && defaultData.currentCnt <= count - 1 ? setCount(count - 1) : {};
  }

  function setImage(position: Position) {
    setSelected(true);
    setCodename(mapToInitial(position));
  }

  const Spinner = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: 20,
            height: 23,
            backgroundColor: theme.colors.grey0,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => decrease()}>
            <Icon
              type={'octicon'}
              name={'chevron-down'}
              size={20}
              style={styles.minusIcon}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 35,
            height: 23,
            backgroundColor: theme.colors.grey0,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'black', fontSize: 17 }}>{count}</Text>
        </View>
        <View
          style={{
            width: 20,
            height: 23,
            backgroundColor: theme.colors.grey0,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => increase()}>
            <Icon
              type={'octicon'}
              name={'chevron-up'}
              size={20}
              style={styles.plusIcon}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        {
          paddingBottom: 20,
        },
      ]}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          },
        ]}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                borderColor: select ? theme.colors.primary : theme.colors.grey0,
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
                backgroundColor: select ? theme.colors.primary : theme.colors.grey0,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: theme.fontWeight.bold,
                position: 'absolute',
                color: 'black',
              }}
            >
              {codename}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: theme.colors.grey0,
            borderRadius: 6,
            marginStart: 10,
            justifyContent: 'space-between',
            backgroundColor: theme.colors.grey0,
          }}
        >
          {defaultData.position == Position.None ? (
            <SelectList
              placeholder={initializePlaceHolderText(placeholdeText).toString()}
              inputStyles={{ fontSize: theme.fontSize.xs }}
              setSelected={(value: string) => {
                console.log(value);
                setPlaceholdText(value);
                onPositionSelected(value);
              }}
              data={dropdownData}
              save="value"
              boxStyles={{
                borderColor: theme.colors.grey0,
                width: 168,
                height: 42,
              }}
              search={false}
              onSelect={() => {
                setImage(position);
              }}
              dropdownStyles={{
                backgroundColor: theme.colors.grey0,
                borderColor: theme.colors.grey0,
                borderRadius: 6,
              }}
              arrowicon={<Text />}
              dropdownShown={false}
            />
          ) : (
            <NoDropdownBox text={initializePlaceHolderText(placeholdeText)} />
          )}

          <TouchableOpacity
            onPress={() => {
              onCloseClick();
            }}
          >
            <Icon
              type="material"
              name="close"
              color={theme.colors.grey1}
              containerStyle={{ paddingEnd: 4, paddingTop: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isSingleSelection ? null : <Spinner />}
    </View>
  );
};

const NoDropdownBox = ({ text }: { text: string | (() => string) }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.grey0,
        borderColor: theme.colors.grey0,
        borderRadius: 6,
        width: 168,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{ paddingStart: 20 }}>{text.toString()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  plusIcon: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 3,
      },
      android: {
        textAlignVertical: 'center',
      },
    }),
  },
  minusIcon: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 4,
      },
      android: {
        textAlignVertical: 'center',
      },
    }),
  },
});
