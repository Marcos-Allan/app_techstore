import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'

export default function People(){
    const insets = useSafeAreaInsets();

    return(
        <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
            <Text>
                Pessoas Online no momento 0
            </Text>
        </View>
    )
}