import { useTheme } from '@rneui/themed';
import React, { Key, useEffect, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import PositionDropdownContent from '../model/PositionDropdownContent';
import { Position } from '@/data/model/type/Position';
import { PositionTextName } from '../model/PositionTextName';
import PositionRecruiting from '../model/PositionRecruitng';
import { PositionDropdown } from './PositionDropdown';
import { mapPositionRecruitingToPositionCount } from '../model/mapper/mapPositionRecruitingToPositionCount';
import { ModalContext } from './modal/context';
import SymbolModalContent from './modalContent/SymbolModalContent';
import useModal from './modal/useModal';

export interface StateProp {
  disabled: boolean;
  positionDropdownArray: PositionDropdownProps[];
}

interface PositionDropdownProps {
  index: number;
  hide: boolean;
  positionData: PositionRecruiting;
}
interface PositionDropdownEditorProps {
  onTeamMemberRecruitChanged: (data: PositionCountDto[]) => void;
  currentTeamMembers: PositionRecruiting[];
}

export const PositionDropdownEditor = ({
  onTeamMemberRecruitChanged,
  currentTeamMembers,
}: PositionDropdownEditorProps) => {
  const modal = useModal();
  const [animatedValue, setAnimatedValue] = useState(() => new Animated.Value(0));
  const [state, setState] = useState<StateProp>({
    disabled: false,
    //positionDropdownArray: initializePositionDropdownArray(currentTeamMembers) || [],
    positionDropdownArray: [],
  });
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const animationValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-59, 0],
  });
  const [teamMemberRecruit, setTeamMemberRecruit] = useState<PositionCountDto[]>([]);
  const [positionState, setPositionState] = useState<PositionDropdownContent[]>([]);

  useEffect(() => {
    initializeView();
  }, []);

  const AlertCantRemoveView = () => {
    modal?.show({
      title: '',
      content: (
        <SymbolModalContent
          title="포지션을 지울 수 없어요!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>🧐</Text>}
          text={'이미 팀원이 모집된 포지션은 삭제할 수 없어요!'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
    });
  };

  function updatePositionDropdownArray(selectedData: PositionCountDto, index: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == index) {
        return { index: item.index, hide: item.hide, positionData: selectedData };
      }
      return item;
    });
    //setState(prevState => ({disabled: prevState.disabled, positionDropdownArray: updatedArray}))
  }

  function addTeamMemberRecruit(selectedData: PositionCountDto) {
    const isPositionExist = teamMemberRecruit.some(item => item.position == selectedData.position);
    if (isPositionExist) {
      const updatedTeamMembers = teamMemberRecruit.map(item => {
        if (item.position == selectedData.position) {
          return selectedData;
        }
        return item;
      });
      setTeamMemberRecruit(updatedTeamMembers);
    } else if (selectedData.position != 'none') {
      setTeamMemberRecruit(prevState => [...prevState, selectedData]);
    }
  }

  function handlePositionDisabled(value: Position) {
    const updatedArray = positionState.map(item => {
      if (item.value == value) {
        return { key: item.key, value: item.value, disabled: true };
      }
      return item;
    });
    setPositionState(updatedArray);
  }

  function initializeView() {
    currentTeamMembers.map(item => {
      initializeViewData(item);
      positionState.map(dropdownItem => {
        let isDisabled = false;
        if (item.position == dropdownItem.key) {
          isDisabled = true;
        }
        setPositionState(prevState => [
          ...prevState,
          {
            key: dropdownItem.key,
            value: dropdownItem.value,
            disabled: isDisabled,
          },
        ]);
      });
    });
  }

  function initializeViewData(item: PositionRecruiting) {
    animatedValue.setValue(0);
    const newlyAddedValue: PositionDropdownProps = {
      index: index,
      hide: false,
      positionData: {
        position: item.position,
        currentCnt: item.currentCnt,
        recruitCnt: item.recruitCnt,
      },
    };
    setState(prevState => ({
      disabled: true,
      positionDropdownArray: [...prevState.positionDropdownArray, newlyAddedValue],
    }));
    Animated.timing(animatedValue, { toValue: 1, duration: 500, useNativeDriver: true }).start(
      () => {
        setIndex(index + 1);
        setState(prevState => ({
          disabled: false,
          positionDropdownArray: [...prevState.positionDropdownArray],
        }));
      },
    );
  }

  function addView() {
    animatedValue.setValue(0);
    const newlyAddedValue: PositionDropdownProps = {
      index: index,
      hide: false,
      positionData: { position: Position.None, recruitCnt: 0, currentCnt: 0 },
    };
    setState(prevState => ({
      disabled: true,
      positionDropdownArray: [...prevState.positionDropdownArray, newlyAddedValue],
    }));
    Animated.timing(animatedValue, { toValue: 1, duration: 500, useNativeDriver: true }).start(
      () => {
        setIndex(index + 1);
        setState(prevState => ({
          disabled: false,
          positionDropdownArray: [...prevState.positionDropdownArray],
        }));
      },
    );
  }

  function hideView(removeIndex: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == removeIndex && item.positionData.currentCnt == 0) {
        handlePositionEnabled(item.positionData.position);
        removeTeamMemberRecruit(item.positionData.position);
        return { index: removeIndex, hide: true, positionData: item.positionData };
      }
      if (item.positionData.currentCnt > 0) {
        //TODO: 팀원이 0명 이상인 포지션 못 지운다는 모달 띄우기
        AlertCantRemoveView();
      }
      return item;
    });
    updatedArray.sort((a, b) => a.index - b.index);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).stop();

    setState({
      disabled: false,
      positionDropdownArray: [...updatedArray],
    });
  }

  function handlePositionEnabled(value: Position) {
    const updatedArray = positionState.map(item => {
      if (item.value == value) {
        return { key: item.key, value: item.value, disabled: false };
      }
      return item;
    });
    setPositionState(updatedArray);
  }

  function removeTeamMemberRecruit(value: Position) {
    const filteredArray = teamMemberRecruit.filter(item => item.position != value);
    setTeamMemberRecruit(filteredArray);
  }

  let newArray = state.positionDropdownArray.map((item, idx) => {
    return (
      <Animated.View
        key={idx}
        style={[
          {
            opacity: animatedValue,
            transform: [{ translateY: animationValue }],
            backgroundColor: 'white',
          },
          item.hide ? { width: 0, height: 0 } : {},
        ]}
      >
        <PositionDropdown
          onCloseClick={() => {
            hideView(idx);
          }}
          onSelectPosition={(data: PositionCountDto) => {
            updatePositionDropdownArray(data, idx);
            addTeamMemberRecruit(data);
          }}
          onDropdownSelected={(value: Position) => handlePositionDisabled(value)}
          dropdownData={positionState}
          defaultData={item.positionData}
        />
      </Animated.View>
    );
  });

  return (
    <View>
      <ScrollView style={{ backgroundColor: 'white' }}>{newArray}</ScrollView>
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={() => {
          addView();
        }}
      >
        <CustomIcon name="plus-square" size={25} color={theme.colors.grey1} />
      </TouchableOpacity>
    </View>
  );
};
