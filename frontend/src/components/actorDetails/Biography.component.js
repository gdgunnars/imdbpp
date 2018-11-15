import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DimSize } from '../../common';
import { Text, View } from '../../general';

class Biography extends PureComponent {


    render() {
        const { bio, active } = this.props;
        let biostuff = active ? bio : bio.slice(0, 100);
        return (
            <View.rowPadding>
                <Text.body1>{biostuff}</Text.body1>
            </View.rowPadding>
        )
    }
}
export default Biography;