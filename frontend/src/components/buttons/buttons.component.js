import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import * as DimSize from '../../common/dimensionSize';

const Button = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const BookmarkContainer = styled.View`
    display: flex;
    justify-Content: center;
    align-items: center;  
    position: relative;
`;

const BookmarkIconContainer = styled.View`
    position: absolute;
    top: 20%;
`;

class Buttons extends PureComponent {
    constructor(props) {
        super(props)
    }

    getButton(type) {
        const { size } = this.props;
        const iconSize = DimSize.height(size);
        const iconSizeMissing = DimSize.height('15%');
        const whiteColor = '#ffff';
        const redColor = '#e03d38';
        const reduceSize = 2.5;

        switch (type) {
            case 'play':
                return <Icon.FontAwesome name={'play-circle-o'} color={whiteColor} size={iconSize} />
            case 'pause':
                return <Icon.FontAwesome name={'pause-circle-o'} color={whiteColor} size={iconSize} />
            case 'camera':
                return <Icon.FontAwesome name={'camera'} color={whiteColor} size={iconSize} />
            case 'add':
                return (
                    <BookmarkContainer>
                        <Icon.FontAwesome name={'bookmark'} color={whiteColor} size={iconSize} />
                        <BookmarkIconContainer>
                            <Icon.FontAwesome name={'plus'} size={iconSize / reduceSize} />
                        </BookmarkIconContainer>
                    </BookmarkContainer>
                );
            case 'remove':
                return (
                    <BookmarkContainer>
                        <Icon.FontAwesome name={'bookmark'} color={redColor} size={iconSize} />
                        <BookmarkIconContainer>
                            <Icon.FontAwesome name={'close'} color={whiteColor} size={iconSize / reduceSize} />
                        </BookmarkIconContainer>
                    </BookmarkContainer>
                );
            default:
                return <Icon.FontAwesome name={'question-circle-o'} color={'#ff69b4'} size={iconSizeMissing} />

        }
    }

    render() {
        const { name, onClick } = this.props;
        return (
            <Button
                onPress={() => onClick()}
            >
                {this.getButton(name)}
            </Button>
        )
    }


}

export default Buttons;
