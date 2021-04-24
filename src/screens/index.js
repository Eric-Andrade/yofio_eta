import React from 'react'
import styled from 'styled-components/native'
import Form from '../components/form'
import { Text } from 'react-native'

const Root = styled.View`
	flex: 1;
    background-color: transparent;
`

const IndexScreen = () => {
    return (
        <Root>
            <Form/>
        </Root>
    )
}

export default React.memo(IndexScreen)