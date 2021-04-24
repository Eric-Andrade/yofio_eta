import React, { useState, useEffect } from 'react'
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
                })
                break
        }
    }

    return (
        <View>
            <ETAButtonOutline
				title={titleButton}
				onPress={() => chooseImage()}
				colorButton='#333'
				padding={10}
				width={250}
				borderRadius={3}
			/>
            
        </View>
    )
}

export default React.memo(ETAImagePicker)