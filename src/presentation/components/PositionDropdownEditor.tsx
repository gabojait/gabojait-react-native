import { useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import PositionDropdownContent from '../model/PositionDropdownContent';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '../model/type/Position';
import PositionRecruiting from '../model/PositionRecruitng';
import { PositionDropdown } from './PositionDropdown';
import SymbolModalContent from './modalContent/SymbolModalContent';
import useModal from './modal/useModal';
import { mapPositionCountToPositionRecruiting } from '../model/mapper/mapPositionCountToPositionRecruiting';

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
    positionDropdownArray: [],
  });
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const animationValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-59, 0],
  });
  const [teamMemberRecruit, setTeamMemberRecruit] = useState<PositionCountDto[]>([]);
  const [positionState, setPositionState] = useState<PositionDropdownContent[]>([
    { key: Position.Backend, value: KoreanPosition.BACKEND, disabled: false },
    { key: Position.Frontend, value: KoreanPosition.FRONTEND, disabled: false },
    { key: Position.Designer, value: KoreanPosition.DESIGNER, disabled: false },
    { key: Position.Manager, value: KoreanPosition.MANAGER, disabled: false },
  ]);

  const AlertCantRemoveView = () => {
    modal?.show({
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
  useEffect(() => {
    initializeView();
  }, []);

  useEffect(() => {
    onTeamMemberRecruitChanged(teamMemberRecruit);
  }, [teamMemberRecruit]);

  useEffect(() => {
    updatePositionState();
    console.log(`state.positionDropdownArray:${state.positionDropdownArray}`);
  }, [state]);

  function updatePositionState() {
    const selectedPositions = teamMemberRecruit.map(item => {
      return item.position;
    });

    const updatedPositionState = positionState.map(item => {
      const isSelected = selectedPositions.some(position => position == item.key);

      if (isSelected) {
        return { key: item.key, value: item.value, disabled: true };
      }
      return { key: item.key, value: item.value, disabled: false };
    });

    setPositionState(updatedPositionState);
  }

  function updatePositionDropdownArray(selectedData: PositionCountDto, replacedIndex: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == replacedIndex) {
        removeTeamMemberRecruit(item.positionData.position);
        return {
          index: item.index,
          hide: item.hide,
          positionData: mapPositionCountToPositionRecruiting(selectedData),
        };
      }
      return item;
    });
    setState(prevState => ({ disabled: prevState.disabled, positionDropdownArray: updatedArray }));
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
    } else if (selectedData.position != Position.None) {
      setTeamMemberRecruit(prevState => [...prevState, selectedData]);
    }
  }

  async function initializeView() {
    let initialIndex = 0;
    currentTeamMembers.map(item => {
      animatedValue.setValue(0);
      const newlyAddedValue: PositionDropdownProps = {
        index: initialIndex,
        hide: false,
        positionData: {
          position: item.position,
          currentCnt: item.currentCnt,
          recruitCnt: item.recruitCnt,
        },
      };
      initialIndex += 1;

      setState(prevState => ({
        disabled: true,
        positionDropdownArray: [...prevState.positionDropdownArray, newlyAddedValue],
      }));

      setTeamMemberRecruit(prevState => [
        ...prevState,
        { position: item.position, totalRecruitCnt: item.recruitCnt },
      ]);

      Animated.timing(animatedValue, { toValue: 1, duration: 500, useNativeDriver: true }).start(
        () => {
          setState(prevState => ({
            disabled: false,
            positionDropdownArray: [...prevState.positionDropdownArray],
          }));
        },
      );

      setIndex(initialIndex);
    });
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
        removeTeamMemberRecruit(item.positionData.position);
        return { index: removeIndex, hide: true, positionData: item.positionData };
      }
      if (item.index == removeIndex && item.positionData.currentCnt > 0) {
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
          onDropdownSelected={(value: Position) => {}}
          dropdownData={positionState}
          defaultData={item.positionData}
        />
      </Animated.View>
    );
  });

  return (
    <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>{newArray}</ScrollView>
      <TouchableOpacity
        onPress={() => {
          addView();
        }}
      >
        <CustomIcon name="plus-square" size={25} color={theme.colors.grey1} />
      </TouchableOpacity>
    </View>
  );
};
