import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText } from '@etaui'
// import { Entypo } from '@icons'

const Root = styled.SafeAreaView`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-vertical: 10px;
	z-index: 1000;
	background-color: ${(props) =>
		props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`
const ButtonContainer = styled.TouchableOpacity`
	height: 18px;
	width: 18px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`

const ETANetInfo = () => {
	// const themeContext = useContext(ThemeContext)
	const [ isInternetReachable, setisInternetReachable ] = useState(true)

	useEffect(() => {
		let isUnMounted = false
		checkConnection()

		return () => {
			isUnMounted = true
		}
	}, [])

	const checkConnection = async () => {
		const unsubscribe = await NetInfo.addEventListener((state) => {
			setisInternetReachable(state.isInternetReachable)
			console.log(
				'isInternetReachable: ',
				state.isInternetReachable,
			)
		})
	}

	if (isInternetReachable) {
		return null
	}

	return (
		<Root>
			<ButtonContainer 
				onPress={() => console.log()}
			>
				{/* <Entypo name='info' size={12} color={'#333'} /> */}
			</ButtonContainer>
			<ETASimpleText
				size={14}
				weight='400'
				color={'#333'}
				align='center'>
				Sin conexión a internet, reconectando.
			</ETASimpleText>
			<ActivityIndicator
				size='small'
				color={'#333'}
			/>
		</Root>
	)
}

export default ETANetInfo
