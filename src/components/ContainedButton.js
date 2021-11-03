import React from 'react';
import { Button } from 'react-native-paper';

export default function ContainedButton(props) {
    return (
        <Button
            {...props}
            mode="contained"
            uppercase={false}
            contentStyle={{
                height: props.height || 72,
            }}
            labelStyle={{
                fontSize: props.fontSize || 34,
            }}>
            {props.children}
        </Button>
    )
}