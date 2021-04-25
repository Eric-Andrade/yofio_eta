import React, { useState, useEffect } from 'react'
import { Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'
import { ETATextInputOutline, ETASimpleText, ETAButtonFilled, ETAButtonOutline } from '@etaui'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux'
import { FORM } from '@redux/form/actions'
import DateTimePicker from '@react-native-community/datetimepicker'
import ImagePicker from 'react-native-image-crop-picker'
import Geolocation from '@react-native-community/geolocation'

const {width} = Dimensions.get('window')
let imageSize = 120

const validationSchema = yup.object().shape({
    f_firstname: yup
        .string()
        .matches(/^[A-Za-zÑñ ]*$/, 'Escribe sólo letras y sin tildes.')
        .required('Campo requerido.'),
    f_lastname: yup
        .string()
        .matches(/^[A-Za-zÑñ ]*$/, 'Escribe sólo letras y sin tildes.')
        .required('Campo requerido.'),
    f_email: yup
        .string()
        // .matches(/^[A-Za-z0-9]*$/, 'No ingrese caracteres especiales ni con tildes')
        .required('Campo requerido.')
        .email('Ingresa un email válido'),
    f_birthdate: yup
        .string()
        // .required('Campo requerido.'),
    // f_location: yup
    //     .string()
    //     .required('Campo requerido.')
})
  
const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f9f9f9;
`
const HeadContainer = styled.View`
    flex: 0.4;
	width: ${width}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`
const ImageContainer = styled.View`
    width: ${Platform.OS === 'ios' ? imageSize : imageSize}px;
    height: ${Platform.OS === 'ios' ? imageSize : imageSize}px;
    border-radius: ${imageSize / 2}px;    
    justify-content: center;
    align-items: center;
    background-color: #999
`
const Image = styled.Image`
    width: ${Platform.OS === 'ios' ? imageSize - 10 : imageSize - 10}px;
    height: ${Platform.OS === 'ios' ? imageSize - 10 : imageSize - 10}px;
    border-radius: ${(imageSize - 10) / 2}px;
`
const FormContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-vertical: 40px;
    background-color: transparent;
`
const TextInputsContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: transparent;
`
const ImagePickerContainer = styled.View`
    flex-direction: row;
`
const CreditsContainer = styled.View`
    flex: 0.1;
	width: ${width}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { } = state.form

	return { }
}

const mapDispatchProps = (dispatch, props) => ({
	sendForm: ({ firstname, lastname, email, birthdate, image, location }) => {
		dispatch({
			type: FORM,
			payload: {
				firstname,
                lastname,
                email,
                birthdate,
                image,
                location
			},
		})
	},
})

const FormComponent = ({sendForm}) => {
    const [ date, setdate ] = useState(new Date(1598051730000))
    const [ mode, setmode ] = useState('date')
    const [ show, setshow ] = useState(false)
    const [ title, settitle ] = useState(false)
    const [ birthdate, setbirthdate ] = useState('')
    const [ image, setimage ] = useState('')
    const [ imageBase64, setimageBase64 ] = useState('')
    const [getLatitude, setgetLatitude] = useState('')
	const [getLongitude, setgetLongitude] = useState('')

    useEffect(() => {
        _findCoordinates()
    }, [])

    const _onChange = (event, selectedDate) => {
        settitle(!title)
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

    /****** Imagepicker */
    const chooseImage = (type) => {
        console.log('chooseImage', type)
        switch(type) {
            case 'selfie':
                ImagePicker.openCamera({
                    compressImageQuality: 1,
                    multiple: false,
                    includeBase64: true,
                    waitAnimationEnd: true,
                    useFrontCamera: true,
                }).then(image => {
                    console.log('ImagePicker data: ', image.path)
                    setimage(image.path)
                    setimageBase64(image.data)
                }).catch(error => {
                    console.log('[ETAImagePicker] error: ', error)
                })
                break
            case 'galery':
                ImagePicker.openPicker({
                    compressImageQuality: 1,
                    multiple: false,
                    includeBase64: true,
                    waitAnimationEnd: true,
                }).then(image => {
                    console.log('ImagePicker data: ', image.path)
                    setimage(image.path)
                    setimageBase64(image.data)
                }).catch(error => {
                    console.log('[ETAImagePicker] error: ', error)
                })
                break
            default:
                console.log('[chooseImage] Error')
        }
    }

    const _findCoordinates = async () => {
		await Geolocation.getCurrentPosition(
			(position) => {
				setgetLatitude(position.coords.latitude)
				setgetLongitude(position.coords.longitude)
			},
			(error) => console.warn('ewe', error.message),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			},
		)
	}

    const _cleanForm = () => {
        ImagePicker.clean()
        .then(() => {
          console.log('Images clear')
        })
        .catch(e => {
          alert(e);
        });

        setgetLatitude('')
        setgetLongitude('')
    }

    return (
        <Root>
            <HeadContainer>
                <ImageContainer>
                    {
                        image !== ''
                        ?    <Image
                                source={{uri: image}}
                            />
                        :   <Image
                                source={require('@assets/logo.png')}
                            />
                    }
                </ImageContainer>
            </HeadContainer>

            <FormContainer>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        f_firstname: 'Eric',
                        f_lastname: 'Torres',
                        f_email: 'test@test.com',
                        f_birthdate: '',
                    }}
                    onSubmit={(values, actions) => {
                        // console.log({values})
                        console.log({
                            getLatitude,
                            getLongitude
                        })
                        if(getLatitude !== '' && getLongitude !== '') {
                            sendForm({
                                firstname: values.f_firstname,
                                lastname: values.f_lastname,
                                email: values.f_email,
                                birthdate: birthdate,
                                image: imageBase64,
                                location: {
                                    getLatitude,
                                    getLongitude
                                }
                            })
                        } else {
                            console.log('[else] _findCoordinates')
                            _findCoordinates()
                            sendForm({
                                firstname: values.f_firstname,
                                lastname: values.f_lastname,
                                email: values.f_email,
                                birthdate: birthdate,
                                image: imageBase64,
                                location: {
                                    getLatitude,
                                    getLongitude
                                }
                            })
                        }

                        setTimeout(() => {
                            actions.setSubmitting(false)
                        }, 2000);
                    }}
                    validationSchema={validationSchema}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        isSubmitting,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                    <>
                        <TextInputsContainer>
                            <ETATextInputOutline
                                placeholder='Nombre *'
                                placeholderTextColor='blue'
                                clearButtonMode='always'
                                keyboardType='default'
                                autoCapitalize='words'
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
                                maxLength={100}
                                multiline={false}
                                numberOfLines={1} // android
                                returnKeyLabel='next' // android
                                secureTextEntry={false} // password
                                spellCheck
                                textContentType='none'
                                returnKeyType='next'
                                textsize={14}
                                height={40}
                                width={width-80}
                                borderWidth={0.3}
                                onChangeText={handleChange('f_firstname')}
                                // onBlur={handleChange('f_firstname')}
                                value={values.f_firstname}
                            />
                            {touched.f_firstname && errors.f_firstname
                                ?   <ETASimpleText
                                        size={13}
                                        weight={Platform.OS === 'ios' ? '300' : '300'}
                                        color='#d93818'
                                        align='center'
                                        style={{ alignSelf: 'flex-start', marginVertical: 10, left: 50 }}>
                                        {errors.f_firstname}
                                    </ETASimpleText>
                                :  null
                            }
                            
                            <ETATextInputOutline
                                placeholder='Apellido(s) *'
                                placeholderTextColor='blue'
                                clearButtonMode='always'
                                keyboardType='default'
                                autoCapitalize='words'
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
                                maxLength={100}
                                multiline={false}
                                numberOfLines={1} // android
                                returnKeyLabel='next' // android
                                secureTextEntry={false} // password
                                spellCheck
                                textContentType='none'
                                returnKeyType='next'
                                textsize={14}
                                height={40}
                                width={width-80}
                                borderWidth={0.3}
                                onChangeText={handleChange('f_lastname')}
                                // onBlur={handleChange('f_lastname')}
                                value={values.f_lastname}
                            />
                            {touched.f_lastname && errors.f_lastname
                                ?   <ETASimpleText
                                        size={13}
                                        weight={Platform.OS === 'ios' ? '300' : '300'}
                                        color='#d93818'
                                        align='center'
                                        style={{ alignSelf: 'flex-start', marginVertical: 10, left: 50 }}>
                                        {errors.f_lastname}
                                    </ETASimpleText>
                                :  null
                            }
                            
                            <ETATextInputOutline
                                placeholder='Correo *'
                                placeholderTextColor='blue'
                                clearButtonMode='always'
                                keyboardType='email-address'
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
                                maxLength={100}
                                multiline={false}
                                numberOfLines={1} // android
                                returnKeyLabel='next' // android
                                secureTextEntry={false} // password
                                spellCheck
                                textContentType='none'
                                returnKeyType='next'
                                textsize={14}
                                height={40}
                                width={width-80}
                                borderWidth={0.3}
                                onChangeText={handleChange('f_email')}
                                onBlur={() => handleChange('f_email')}
                                value={values.f_email}
                            />
                            {touched.f_email && errors.f_email
                                ?   <ETASimpleText
                                        size={13}
                                        weight={Platform.OS === 'ios' ? '300' : '300'}
                                        color='#d93818'
                                        align='center'
                                        style={{ alignSelf: 'flex-start', marginVertical: 10, left: 50 }}>
                                        {errors.f_email}
                                    </ETASimpleText>
                                :  null
                            }

                            <>
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
                                    locale='es-ES'
                                    value={date}
                                    mode={mode}
                                    is24Hour={false}
                                    display='default'
                                    onChange={(event, value) => {setFieldValue('f_birthdate', value); _onChange(value)}}
                                />
                                )}
                            {touched.f_birthdate && errors.f_birthdate
                                ?   <ETASimpleText
                                        size={13}
                                        weight={Platform.OS === 'ios' ? '300' : '300'}
                                        color='#d93818'
                                        align='center'
                                        style={{ alignSelf: 'flex-start', marginVertical: 10, left: 50 }}>
                                        {errors.f_birthdate}
                                    </ETASimpleText>
                                    :  null
                            }
                            </>
                            <ETASimpleText
                                size={13}
                                weight={Platform.OS === 'ios' ? '300' : '300'}
                                color='#333'
                                align='center'
                                style={{ alignSelf: 'flex-start', marginVertical: 10, left: 50 }}>
                                Selfie
                            </ETASimpleText>
                            <ImagePickerContainer>
                                <ETAButtonOutline
                                    title='Abrir cámara'
                                    onPress={() => chooseImage('selfie')}
                                    borderColor='#333'
                                    borderWidth={0.3}
                                    padding={10}
                                    width={130}
                                    borderRadius={3}
                                />
                                <ETAButtonOutline
                                    title='Elegir de galería'
                                    onPress={() => chooseImage('galery')}
                                    borderColor='#333'
                                    borderWidth={0.3}
                                    padding={10}
                                    width={130}
                                    borderRadius={3}
                                />
                            </ImagePickerContainer>
                            <ETAButtonFilled
                                title='Guardar'
                                onPress={handleSubmit}
                                colorButton='#333'
                                padding={10}
                                width={isSubmitting ? 270 : 270}
                                // padding={isSubmitting ? 10 : 120} 
                                disabled={isSubmitting}
                                borderRadius={3}
                            />
                        </TextInputsContainer>
                    </>
                    )}
                </Formik>
            </FormContainer>
            <CreditsContainer>
            <ETASimpleText
                size={13}
                weight={Platform.OS === 'ios' ? '300' : '300'}
                color='#333'
                align='center'
                style={{ alignSelf: 'center', marginVertical: 10, paddingHorizontal: 10 }}>
                Ing. Eric Torres A. erictorresandrade.1@gmail.com
            </ETASimpleText>
            </CreditsContainer>
        </Root>
    )
}

const FormComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(FormComponent)

export default FormComponentConnect
