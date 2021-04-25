import React, { useState, useEffect } from 'react'
import { View, Platform } from 'react-native'
import { ETAButtonOutline } from '@etaui'
import DateTimePicker from '@react-native-community/datetimepicker'

const ETADatePicker = () => {
    const [ date, setdate ] = useState(new Date(1598051730000))
    const [ mode, setmode ] = useState('date')
    const [ show, setshow ] = useState(false)
    const [ title, settitle ] = useState(false)
    const [ birthdate, setbirthdate ] = useState('Fecha de nacimiento')
  
    const onChange = (event, selectedDate) => {
        settitle(true)
        const currentDate = selectedDate || date
        setshow(Platform.OS === 'ios')
        setdate(currentDate)

        let yearconverted = currentDate.getFullYear()
        let monthconverted = ('0' + (currentDate.getMonth() + 1)).slice(-2)
        let dayconverted =
        Platform.OS === 'ios'
        ? ('0' + (currentDate.getDate() + 1)).slice(-2)
        : ('0' + currentDate.getDate()).slice(-2)
        // let dayconverted = currentDate.getDate()
        var _completeDate = `${yearconverted}-${monthconverted}-${dayconverted}`
        setbirthdate(_completeDate)
  }

    const showMode = (currentMode) => {
      setshow(true)
      setmode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date')
    }
    
    return (
        <View>
            <ETAButtonOutline
				title={title ? `${birthdate}` : `Fecha de nacimiento`}
				onPress={showDatepicker}
				borderColor='#333'
                borderWidth={0.3}
				padding={10}
				width={270}
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