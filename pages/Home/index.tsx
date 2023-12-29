import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../components/Card'

export default function Home({ navigation: {navigate} }:any){
    const insets = useSafeAreaInsets();
    
    const [data, setData] = useState<any>()

    async function getData(){
        axios.get('https://techstore-backend.onrender.com/products')
        .then((response) => {
            console.log(response.data)
            setData(response.data)
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getData()
    })

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
            <Text>
                Home
            </Text>
            <ScrollView>
                {data && data.map((card:any) => (
                    <Card
                        descont={card.descont}
                        image={card.image}
                        price={card.price}
                        id={card._id}
                    />  
                ))}
            </ScrollView>
        </View>
    )
}