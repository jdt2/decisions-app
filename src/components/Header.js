import React from 'react';
import { Headline } from 'react-native-paper';

export default function Header(props) {
    return (
        <Headline {...props} style={{
            ...props.style,
            fontWeight: '600',
            fontSize: props.fontSize ? props.fontSize : 60,
            lineHeight: props.lineHeight ? props.lineHeight : 73,
            fontFamily: 'Inter_600SemiBold',
        }}>
            {props.children}
        </Headline>
    )
}