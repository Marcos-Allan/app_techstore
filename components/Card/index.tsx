import { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, Text, View, Alert, Modal } from "react-native";

interface CardProps {
    image: string,
    descont: string,
    price: string,
    description: string,
    stars: string,
    keywords: string,
    id: string,
}

interface Props {
    descont: string,
    image: string,
    price: string,
    description: string,
    stars: string,
    keywords: string,
    id: string,
    action: string,
    timestamp:string,
}

export default function Card(props: CardProps){

    const navigate = useNavigation().navigate
    const [modalVisible, setModalVisible] = useState(false);
    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, description:string, stars:string, keywords:string, id:string, action:string, timestamp:string){

        const params:Props = { descont, price, image, description, stars, keywords, id, action, timestamp }
        navigate(rota, params)
    }

    return(
        <Pressable
            key={props.id}        
            style={{ flex: 1, flexDirection: 'column', padding: 10, margin: 10, backgroundColor: '#d9d9d9', borderRadius: 8, alignItems: 'center', position: 'relative', marginHorizontal: 20, marginRight: 50 }}
            onPress={() => {
                setModalVisible(true)
            }}
        >
            <Image
                style={{ width: '100%', height: 160, borderRadius: 8 }}
                source={{
                    uri: props.image,
                }}
            />
            <View
                style={{
                    width: '100%',
                    height: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginVertical: 5,
                }}
            />
            <View
                style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5, width: '100%' }}
            >
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        Preço Original
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                        R$ {props.price}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginVertical: 5,
                        }}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        Preço No Desconto
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                    R$ {((Number(props.price) / 100) * (100 - Number(props.descont))).toFixed(2)}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginVertical: 5,
                        }}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        Desconto
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                        {props.descont}%
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginVertical: 5,
                        }}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        Stars
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                        {props.stars}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginVertical: 5,
                        }}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'column', flexWrap: 'wrap', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        Description
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                        {props.description}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            marginVertical: 5,
                        }}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'column', flexWrap: 'wrap', justifyContent: "space-between", alignItems: 'flex-start' }}>
                    <Text style={{ color: '#000000', fontWeight: '500', letterSpacing: 2, fontSize: 14, marginBottom: 6 }}>
                        KeyWords
                    </Text>
                    <Text style={{ color: '#0054bb', fontWeight: '500', letterSpacing: 2, fontSize: 16 }}>
                        {props.keywords}
                    </Text>
                </View>
            </View>

            <View style={{ position: 'absolute', top: 0, right: -54, width: 46, height: '100%' }}>
                <View
                    style={{ borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#66ed91', marginBottom: 16 }}
                >
                    <Ionicons
                        style={{ fontSize: 18, fontWeight: '700' }}
                        onPress={() => {
                            const action = 'ADICIONAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.description, props.stars, props.keywords, props.id, action, timestamp)
                        }}
                        name='add-outline' 
                    />
                </View>

                <View
                    style={{ borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#66c2ed', marginBottom: 16 }}
                    >
                    <Ionicons
                        style={{ fontSize: 18, fontWeight: '700' }}
                        onPress={() => {
                            const action = 'EDITAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.description, props.stars, props.keywords, props.id, action, timestamp)
                        }}
                        name='pencil-outline' 
                    />
                </View>

                <View
                    style={{ borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundColor: '#ed6666', marginBottom: 16 }}
                >
                    <Ionicons
                        style={{ fontSize: 18, fontWeight: '700' }}
                        onPress={() => {
                            const action = 'DELETAR'
                            const timestamp = String(new Date().getTime())
                            alteredInfosProduct('Edit', props.descont, props.price, props.image, props.description, props.stars, props.keywords, props.id, action, timestamp)
                        }}
                        name='trash-outline' 
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
                                    alteredInfosProduct('Edit', props.descont, props.price, props.image, props.description, props.stars, props.keywords, props.id, action, timestamp)
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
                                        alteredInfosProduct('Edit', props.descont, props.price, props.image, props.description, props.stars, props.keywords, props.id, action, timestamp)
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