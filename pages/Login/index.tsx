import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import axios from 'axios'

export default function Login() {
    const insets = useSafeAreaInsets();

    function onDelete(id:string){
        console.log(`produto do ID: '${id}' deletado`)
    }
    
    function onCreate(){
        console.log('produto criado com sucesso')
    }

    function onUpdate(id:string, image:string, price:string, descont:string){
        axios.put(`https://techstore-backend.onrender.com/product/update/${id}`, {
            image: image,
            price: price,
            descont: descont,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    const { price, image, descont, id }:any = useRoute().params
    if(!id){
        const id = '4002-8922'
    }
    if(!price){
        const price = '00.00'
    }
    if(!image){
        const image = 'https://'
    }
    if(!price){
        const price = '00.00'
    }

    const [newImage, setNewImage] = useState<string>(image)
    const [newPrice, setNewPrice] = useState<string>(price)
    const [newDescont, setNewDescont] = useState<string>(descont)

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: insets.top }}>

            {image && (
                <Image
                style={{ width: 280, height: 160, borderRadius: 8 }}
                source={{
                        uri: image,
                    }}
                />
            )}
            {price && (
                <Text>
                    {price}
                </Text>
            )}
            
            {descont && (
                <Text>
                    {descont}
                </Text>
            )}

            <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
                <Pressable
                    onPress={() => {
                        onCreate()
                    }}
                    style={{ backgroundColor: '#67d083', flexGrow: 1,  paddingVertical: 10 }}
                >
                    <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                    >Criar</Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        onUpdate(id, newImage, newPrice, newDescont)
                    }}
                    style={{ backgroundColor: '#64aaff', flexGrow: 1,  paddingVertical: 10 }}
                >
                    <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                    >Atualizar</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        onDelete(id)
                    }}
                    style={{ backgroundColor: '#ff6464', flexGrow: 1,  paddingVertical: 10 }}
                >
                    <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                    >Deletar</Text>
                </Pressable>
            </View>
        </View>
    )
}