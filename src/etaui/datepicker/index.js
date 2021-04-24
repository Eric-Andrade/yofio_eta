import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ETAButtonOutline } from '@etaui'
import DateTimePicker from '@react-native-community/datetimepicker'

const ETADatePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000))
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date
      setShow(Platform.OS === 'ios')
      setDate(currentDate)
    }
  
    const showMode = (currentMode) => {
      setShow(true)
      setMode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date');
    };
    
    return (
        <View>
            <ETAButtonOutline
				title='Selecciona tu fecha de nacimiento'
				onPress={showDatepicker}
				colorButton='#333'
				padding={10}
				width={250}
				borderRadius={3}
			/>
            
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default ETADatePicker