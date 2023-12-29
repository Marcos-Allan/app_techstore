import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'

export default function Products(){
    const insets = useSafeAreaInsets();

    return(
        <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
            <Text>
                Products
            </Text>
        </View>
    )
}