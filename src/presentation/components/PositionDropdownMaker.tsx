import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { PositionDropdown } from './PositionDropdown';
import { useTheme } from '@rneui/themed';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { Position } from '@/data/model/type/Position';
import { PositionTextName } from '@/presentation/model/PositionTextName';
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
    { key: Position.backend, value: PositionTextName.backend, disabled: false },
    { key: Position.frontend, value: PositionTextName.frontend, disabled: false },
    { key: Position.designer, value: PositionTextName.designer, disabled: false },
    { key: Position.manager, value: PositionTextName.manager, disabled: false },
  ]);

  useEffect(() => {
    onTeamMemberRecruitChanged(teamMemberRecruit);
  }, [teamMemberRecruit, teamMemberRecruit]);

  useEffect(() => {
    updatePositionState();
  }, [state]);

  useEffect(() => {
    console.log(state.positionDropdownArray);
  }, [state.positionDropdownArray]);

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
      positionData: { position: 'none', totalRecruitCnt: 0 },
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
    } else if (selectedData.position != 'none') {
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
            hideView(idx);
          }}
          onSelectPosition={(data: PositionCountDto) => {
            updatePositionDropdownArray(data, idx);
            addTeamMemberRecruit(data);
          }}
          onDropdownSelected={(value: Position) => {}}
          dropdownData={positionState}
          defaultData={mapPositionCountToPositionRecruiting(item.positionData)}
        />
      </Animated.View>
    );
  });

  return (
    <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>{newArray}</ScrollView>
      <TouchableOpacity onPress={() => addView()}>
        <CustomIcon name="plus-square" size={25} color={theme.colors.grey1} />
      </TouchableOpacity>
    </View>
  );
};
