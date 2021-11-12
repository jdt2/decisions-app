import React from 'react';
import { Button } from 'react-native-paper';

export default function LinkButton(props) {
    return (
        <Button
            {...props}
            mode="text"
            uppercase={false}
            labelStyle={{
                textDecorationLine: props.normal ? 'none' : 'underline',
                fontWeight: '300',
                fontFamily: 'Inter_300Light',
            }}>
            {props.children}
        </Button>
    )
}