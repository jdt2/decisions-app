import React from 'react';
import { Headline, Subheading } from 'react-native-paper';

export default function Subheader(props) {
    return (
        <Subheading {...props} style={{
            fontWeight: '600',
            fontSize: 24,
            lineHeight: 29,
            fontFamily: 'Inter_600SemiBold',
            color: 'rgba(38, 50, 56, 0.5);'
        }}>
            {props.children}
        </Subheading>
    )
}