import { Animated, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { PositionDropdown } from './PositionDropdown';
import { useTheme } from '@rneui/themed';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { Position } from '@/data/model/type/Position';
import { KoreanPosition } from '@/presentation/model/type/Position';
import PositionDropdownContent from '@/presentation/model/PositionDropdownContent';
import PositionCount from '../model/PositionCount';
import { mapPositionCountToPositionRecruiting } from '../model/mapper/mapPositionCountToPositionRecruiting';

interface StateProp {
  disabled: boolean;
  positionDropdownArray: PositionDropdownProps[];
}

interface PositionDropdownProps {
  index: number;
  hide: boolean;
  positionData: PositionCount;
}

interface PositionDropdownMakerProps {
  onTeamMemberRecruitChanged: (data: PositionCount[]) => void;
}

export const PositionDropdownMaker = ({
  onTeamMemberRecruitChanged,
}: PositionDropdownMakerProps) => {
  const [animatedValue, setAnimatedValue] = useState(() => new Animated.Value(0));
  const [state, setState] = useState<StateProp>({ disabled: false, positionDropdownArray: [] });
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
  const [plusIconColor, setPlusIconColor] = useState(theme.colors.grey1);
  const [availablePositionDropdown, setAvailablePositionDropdown] = useState(0);

  useEffect(() => {
    onTeamMemberRecruitChanged(teamMemberRecruit);
  }, [teamMemberRecruit, teamMemberRecruit]);

  useEffect(() => {
    updatePositionState();
    handlePlusIconColor();
  }, [state]);

  function handleAddAction() {
    if (availablePositionDropdown < positionState.length) {
      addView();
      increaseAvailablePositionDropdown();
    }
  }

  function handleHideAction(removeIndex: number) {
    if (availablePositionDropdown <= positionState.length) {
      hideView(removeIndex);
      decreaseAvailablePositionDropdown();
    }
  }

  function handlePlusIconColor() {
    console.log(
      `availablePositionDropdown:${availablePositionDropdown},positionState.length:${positionState.length}`,
    );
    if (availablePositionDropdown == positionState.length) {
      setPlusIconColor('white');
    } else {
      setPlusIconColor(theme.colors.grey1);
    }
  }

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

  function addView() {
    animatedValue.setValue(0);
    const newlyAddedValue: PositionDropdownProps = {
      index: index,
      hide: false,
      positionData: { position: Position.None, totalRecruitCnt: 0 },
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

  function updatePositionDropdownArray(selectedData: PositionCountDto, replacedIndex: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == replacedIndex) {
        removeTeamMemberRecruit(item.positionData.position);
        return { index: item.index, hide: item.hide, positionData: selectedData };
      }
      return item;
    });

    setState(prevState => ({ disabled: prevState.disabled, positionDropdownArray: updatedArray }));
  }

  function hideView(removeIndex: number) {
    const updatedArray = state.positionDropdownArray.map(item => {
      if (item.index == removeIndex) {
        removeTeamMemberRecruit(item.positionData.position);
        return { index: removeIndex, hide: true, positionData: item.positionData };
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
            handleHideAction(idx);
          }}
          onSelectPosition={(data: PositionCountDto) => {
            updatePositionDropdownArray(data, idx);
            addTeamMemberRecruit(data);
          }}
          onDropdownSelected={(value: Position) => {}}
          dropdownData={positionState}
          defaultData={mapPositionCountToPositionRecruiting(item.positionData)}
          isSingleSelection={false}
        />
      </Animated.View>
    );
  });

  function decreaseAvailablePositionDropdown() {
    setAvailablePositionDropdown(prevState => {
      return prevState - 1;
    });
  }

  function increaseAvailablePositionDropdown() {
    setAvailablePositionDropdown(prevState => {
      return prevState + 1;
    });
  }

  return (
    <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>{newArray}</ScrollView>
      <TouchableOpacity onPress={() => handleAddAction()}>
        <CustomIcon name="plus-square" size={25} color={plusIconColor} />
      </TouchableOpacity>
    </View>
  );
};
