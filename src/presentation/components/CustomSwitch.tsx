import { Card } from '@rneui/base';
import { Switch } from '@rneui/themed';
import React, {useState} from 'react'
import color from '../res/styles/color'

export const CustomSwitch =  ({}) => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
      <Card>
        <Switch 
        thumbColor={color.white}
        trackColor={{false: color.darkGrey, true: color.primary}}
        onValueChange={toggleSwitch}
        value={isEnabled}/>
      </Card>
    )
}