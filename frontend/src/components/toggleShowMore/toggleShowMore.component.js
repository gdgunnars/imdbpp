import React, { PureComponent } from 'react';
import { Text, View } from '../../general';

class ToggleShowMore extends PureComponent {

    render() {
        const { text, active } = this.props;
        if (text) {
            let textData = active ? text : text.slice(0, 100);
            return (
                <View.rowPadding>
                    <Text.body1>{textData}</Text.body1>
                </View.rowPadding>
            )
        } else {
            return (
                <View.rowPadding>
                    <Text.body1>No further info available</Text.body1>
                </View.rowPadding>
            )
        }
    }
}
export default ToggleShowMore;