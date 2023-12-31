import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, Text, View } from "react-native";

interface CardProps {
    image: string,
    descont: string,
    price: string,
    id: string,
}

interface Props {
    descont: string,
    image: string,
    price: string,
    id: string,
    action: string,
    timestamp:string,
}

export default function Card(props: CardProps){

    const navigate = useNavigation().navigate
    
    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, id:string, action:string, timestamp:string){

        const params:Props = { descont, price, image, id, action, timestamp }
        navigate(rota, params)
    }

    return(
        <View
            style={{ flex: 1, flexDirection: 'column', padding: 10, margin: 10, backgroundColor: '#d9d9d9', borderRadius: 8, position: 'relative', marginRight: 34 }}
        >
            <Image
                style={{ width: 280, height: 160, borderRadius: 8 }}
                source={{
                    uri: props.image,
                }}
            />
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5, width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                    <Text style={{ flexGrow: 1 }}>
                        Preço Original: 
                    </Text>
                    <Text>
                        R$ {props.price}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                    <Text style={{ flexGrow: 1 }}>
                        Preço No Desconto: 
                    </Text>
                    <Text>
                    R$ {((Number(props.price) / 100) * (100 - Number(props.descont))).toFixed(2)}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                    <Text style={{ flexGrow: 1 }}>
                        Desconto: 
                    </Text>
                    <Text>
                        {props.descont}%
                    </Text>
                </View>
            </View>

            <View style={{ position: 'absolute', top: 0, right: -34, width: 30, height: '100%' }}>
                <View
                    style={{ borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#66ed91', marginBottom: 10 }}
                >
                    <Ionicons
                        onPress={() => {
                            const action = 'ADICIONAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.id, action, timestamp)
                        }}
                        name='add' 
                    />
                </View>

                <View
                    style={{ borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#66c2ed', marginBottom: 10 }}
                    >
                    <Ionicons
                        onPress={() => {
                            const action = 'EDITAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.id, action, timestamp)
                        }}
                        name='pencil' 
                    />
                </View>

                <View
                    style={{ borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#ed6666', marginBottom: 10 }}
                >
                    <Ionicons
                        onPress={() => {
                            const action = 'DELETAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.id, action, timestamp)
                        }}
                        name='trash' 
                    />
                </View>
            </View>
        </View>
    )
}