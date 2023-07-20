import { Icon, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import {
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Gabojait from '@/presentation/components/icon/Gabojait';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { Position } from '@/data/model/type/Position';
import PositionDropdownContent from '@/presentation/model/PositionDropdownContent';
import PositionCount from '../model/PositionCount';
import { mapPositionToTextName, mapKoreanToPosition } from '../utils/PositionDropdownUtils';
import PositionRecruiting from '../model/PositionRecruitng';

interface positionDropdownProps {
  onCloseClick: () => void;
  onSelectPosition: (data: PositionCount) => void;
  dropdownData: PositionDropdownContent[];
  onDropdownSelected: (value: Position) => void;
  defaultData: PositionRecruiting;
}

export const PositionDropdown = ({
  onCloseClick,
  onSelectPosition,
  dropdownData,
  onDropdownSelected,
  defaultData,
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
    if (text == '') return '팀원 포지션을 선택해주세요';
    else return placeholdeText;
  }

  function onPositionSelected(value: string) {
    const position = mapKoreanToPosition(value);
    setPosition(position as Position);
    onDropdownSelected(position as Position);
  }

  function handleSelectPosition() {
    if (position != Position.none) {
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
    if (position == Position.backend) setCodename('B');
    else if (position == Position.frontend) setCodename('F');
    else if (position == Position.designer) setCodename('D');
    else if (position == Position.manager) setCodename('P');
  }

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
            alignItems: 'flex-start',
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
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                width: 15,
                height: 21,
                backgroundColor: theme.colors.grey0,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => increase()}>
                <Gabojait
                  name="plus"
                  size={13}
                  style={styles.plusIcon}
                  color={theme.colors.grey2}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 51,
                height: 21,
                backgroundColor: theme.colors.grey0,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: theme.colors.grey2, fontSize: 17 }}>{count}</Text>
            </View>
            <View
              style={{
                width: 15,
                height: 21,
                backgroundColor: theme.colors.grey0,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => decrease()}>
                <Gabojait
                  name="minus"
                  size={2}
                  style={styles.minusIcon}
                  color={theme.colors.grey2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: theme.colors.grey0,
            borderRadius: 6,
            justifyContent: 'space-between',
            backgroundColor: theme.colors.grey0,
          }}
        >
          {defaultData.position == 'none' ? (
            <SelectList
              placeholder={initializePlaceHolderText(placeholdeText)}
              inputStyles={{ fontSize: theme.fontSize.xs }}
              setSelected={(value: string) => {
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
              arrowicon={<Text></Text>}
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
    </View>
  );
};

const NoDropdownBox = ({ text }) => {
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
      <Text style={{ paddingStart: 20 }}>{text}</Text>
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
        paddingTop: 9,
      },
      android: {
        textAlignVertical: 'center',
      },
    }),
  },
});
