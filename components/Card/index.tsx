import { useNavigation } from "@react-navigation/native";

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
}

export default function Card(props: CardProps){

    const navigate = useNavigation().navigate
    
    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, id:string){

        const params:Props = { descont, price, image, id }
        navigate(rota, params)
    }

    return(
        <View style={{ flex: 1, flexDirection: 'column', padding: 10, margin: 10, backgroundColor: '#d9d9d9', borderRadius: 8 }} key={props.id}>
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
                        Preço Pós Desconto: 
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
            <Pressable
                onPress={() => {
                    alteredInfosProduct('Login', props.descont, props.price, props.image, props.id)
                }}
                style={{ backgroundColor: '#6192fe', padding: 10, borderRadius: 8 }}
            >
                <Text style={{ textAlign: 'center', textTransform: 'uppercase', color: '#f2f2f2', fontWeight: '500', letterSpacing: 4 }}>Editar</Text>
            </Pressable>
        </View>
    )
}