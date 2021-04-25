import React from 'react'
import { View } from 'react-native'
import { ETAButtonOutline } from '@etaui'
import ImagePicker from 'react-native-image-crop-picker'

const ETAImagePicker = ({type, titleButton}) => {
    const chooseImage = () => {
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
                    console.log('Image choose')
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
                    console.log('Image choose')
                }).catch(error => {
                    console.log('[ETAImagePicker] error: ', error)
                })
                break
        }
    }

    return (
        <View>
            <ETAButtonOutline
				title={titleButton}
				onPress={() => chooseImage()}
				borderColor='#333'
                borderWidth={0.3}
				padding={10}
				width={130}
				borderRadius={3}
			/>
            
        </View>
    )
}

export default React.memo(ETAImagePicker)