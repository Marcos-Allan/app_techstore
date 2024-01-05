import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import Card from '../../components/Card';

export default function Products(){
    const insets = useSafeAreaInsets();
    
    const [data, setData] = useState<any>()
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        setLoading(true)
        axios.get('https://techstore-backend.onrender.com/products')
        .then((response) => {
            console.log(response.data)
            setLoading(false)
            setData(response.data)
        })
        .catch((error) => console.log(error))
    },[reload])

    return(
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top, backgroundColor: '#ebf0f2', position: 'relative' }}
        >
            {loading == false && (
                <Text
                    style={{ fontSize: 28, color:'#2a72ef', fontWeight: '700', letterSpacing: 4, paddingVertical: 6 }}
                >
                    Produtos
                </Text>
            )}
            
            {loading == false && (
                <Pressable
                    style={{ position: 'absolute', top: 30, left: 0, zIndex: 900, marginTop: insets.top, backgroundColor: '#2a72ef', padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                    onPress={() => setReload(!reload)}
                >
                    <Ionicons
                        style={{ fontSize: 26, color: '#f2f2f2' }}
                        name='reload'
                    />
                </Pressable>
            )}
            {loading == false ? (
                <ScrollView>
                    {data && data.map((card:any) => (
                        <Card
                            descont={card.descont}
                            image={card.image}
                            price={card.price}
                            description={card.description}
                            stars={card.stars}
                            id={card._id}
                        />  
                    ))}
                </ScrollView>
            ): (
                <Text style={{ color: '#2a72ef', fontWeight: '700', letterSpacing: 3, fontSize: 20 }} >Carregando...</Text>
            )}
        </View>
    )
}