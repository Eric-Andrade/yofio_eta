import React, { useEffect, useContext } from 'react'
import {
	Dimensions,
    Text
} from 'react-native'
import styled from 'styled-components/native'
import { ETATextInputOutline, ETASimpleText, ETADatePicker, ETAImagePicker, ETAButtonFilled } from '@etaui'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	flex-direction: column;
    padding-horizontal: 20px;
	justify-content: center;
	align-items: center;
	background-color: #f9f9f9;
`
const TextInputsContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: transparent;
`

const FormComponent = () => {
    return (
        <Root>
            <TextInputsContainer>
                <ETATextInputOutline
                    // // refInput={numberCardRef}
                    // // value={values?.[item.name]}
                    // mask={'[A...]'}
                    placeholder='Nombre'
                    // placeholderTextColor={
                    //     placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
                    // }
                    clearButtonMode='always'
                    keyboardType='phone-pad'
                    autoCapitalize='none'
                    allowFontScaling
                    autoCorrect
                    autoFocus
                    blurOnSubmit={false}
                    caretHidden={false}
                    contextMenuHidden={false}
                    editable
                    enablesReturnKeyAutomatically={false}
                    underlineColorAndroid='transparent'
                    keyboardAppearance='dark'
                    maxLength={5}
                    multiline={false}
                    numberOfLines={1} // android
                    returnKeyLabel='next' // android
                    secureTextEntry={false} // password
                    spellCheck
                    textContentType='none'
                    returnKeyType='next'
                    textsize={14}
                    height={40}
                    width={width}
                    borderWidth={0.3}
                    // onChangeText={(formatted, extracted) => {
                    //     setexpiry(
                    //         formatted.replace(
                    //             /[^0-9]/g,
                    //             '',
                    //         ),
                    //     )
                    //     console.log(extracted)
                    // }}
                    // onBlur={handleBlur('cellphone')}
                    // selectionColor={themeContext.PRIMARY_COLOR}
                />

                <ETATextInputOutline
                    // // refInput={numberCardRef}
                    // // value={values?.[item.name]}
                    // mask={'[A...]'}
                    placeholder='Correo'
                    // placeholderTextColor={
                    //     placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
                    // }
                    clearButtonMode='always'
                    keyboardType='phone-pad'
                    autoCapitalize='none'
                    allowFontScaling
                    autoCorrect
                    autoFocus
                    blurOnSubmit={false}
                    caretHidden={false}
                    contextMenuHidden={false}
                    editable
                    enablesReturnKeyAutomatically={false}
                    underlineColorAndroid='transparent'
                    keyboardAppearance='dark'
                    maxLength={5}
                    multiline={false}
                    numberOfLines={1} // android
                    returnKeyLabel='next' // android
                    secureTextEntry={false} // password
                    spellCheck
                    textContentType='none'
                    returnKeyType='next'
                    textsize={14}
                    height={40}
                    width={width}
                    borderWidth={0.3}
                />
                <ETADatePicker />
                <ETAImagePicker 
                    type='selfie'
                    titleButton='Tomar selfie'
                />
                <ETAButtonFilled
                    title='Enviar mis datos'
                    // onPress={showDatepicker}
                    colorButton='#333'
                    padding={10}
                    width={250}
                    borderRadius={3}
                />
            
            </TextInputsContainer>
        </Root>
    )
}

export default FormComponent
