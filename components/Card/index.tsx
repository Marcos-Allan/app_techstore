import { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, Text, View, Alert, Modal } from "react-native";

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
    const [modalVisible, setModalVisible] = useState(false);
    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, id:string, action:string, timestamp:string){

        const params:Props = { descont, price, image, id, action, timestamp }
        navigate(rota, params)
    }

    return(
        <Pressable
            key={props.id}        
            style={{ flex: 1, flexDirection: 'column', padding: 10, margin: 10, backgroundColor: '#d9d9d9', borderRadius: 8, position: 'relative', marginRight: 34 }}
            onPress={() => {
                setModalVisible(true)
            }}
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

            {/* MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -20,
                }}>
                    <View style={{
                        width: '85%',
                        backgroundColor: '#ffffff',
                        borderRadius: 8,
                        overflow: 'hidden',
                        paddingTop: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2, },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        position: 'relative'
                    }}>
                        <Pressable
                            style={{ position: 'absolute', top:'5%', right: '3%', }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name='close' style={{ fontSize: 16 }} />
                        </Pressable>

                        <Text style={{ marginBottom: 15, textAlign: 'center', marginHorizontal: 20, letterSpacing: 2, lineHeight: 24, }}>
                            O que você deseja fazer com o Produto?
                        </Text>

                        {/* BOTÔES DE FUNCIONALIDADES */}
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Pressable
                                style={[
                                    {flexGrow: 1, width: '50%', padding: 10, elevation: 2,}
                                    ,{
                                    backgroundColor: '#ff6464',
                                }]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    const action = 'DELETAR'
                                    const timestamp = String(new Date().getTime())
                                    alteredInfosProduct('Edit', props.descont, props.price, props.image, props.id, action, timestamp)
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontWeight: '400',
                                        letterSpacing: 2,
                                        textAlign: 'center',
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                    }}
                                    >Deletar</Text>
                            </Pressable>
                            
                            <Pressable
                                style={[
                                    { flexGrow: 1, width: '50%', padding: 10, elevation: 2 }
                                    ,{
                                        backgroundColor: '#64aaff',
                                    }]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        const action = 'EDITAR'
                                        const timestamp = String(new Date().getTime())
                                        alteredInfosProduct('Edit', props.descont, props.price, props.image, props.id, action, timestamp)
                                    }}
                            >
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontWeight: '400',
                                        letterSpacing: 2,
                                        textAlign: 'center',
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                    }}
                                >Editar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </Pressable>
    )
}