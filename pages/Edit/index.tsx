import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, Text, TextInput, View, Alert, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'

interface Props {
    descont: string,
    image: string,
    price: string,
    description: string,
    stars: string,
    id: string,
    action: string,
    timestamp:string,
}

export default function Edit() {
    const insets = useSafeAreaInsets();
    
    const navigate = useNavigation().navigate
    
    const [modalVisible, setModalVisible] = useState(false);
    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, description:string, stars:string, id:string, action:string, timestamp:string){
        const params:Props = { descont, price, image, description, stars, id, action, timestamp }
        navigate(rota, params)
    }

    function onDelete(id:string){
        axios.delete(`https://techstore-backend.onrender.com/product/delete/${id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    function onCreate(image:string, price:string, descont:string, description: string, stars: string){
        axios.post(`https://techstore-backend.onrender.com/create`, {
            image: image,
            price: price,
            descont: descont,
            description: description,
            stars: stars,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function onUpdate(id:string, image:string, price:string, descont:string, description: string, stars: string){
        axios.put(`https://techstore-backend.onrender.com/product/update/${id}`, {
            image: image,
            price: price,
            descont: descont,
            description: description,
            stars: stars,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    const produto :any = useRoute().params

    useEffect(() => {
        if(produto && produto.action == 'ADICIONAR'){
            setNewPrice('00.00')
            setNewImage('https://via.placeholder.com/900/d9d9d9')
            setNewDescont('0')
            setNewDescription('Produto Qualquer')
            setNewStars('0')
        }else{
            setNewPrice(produto ? produto.price : undefined)
            setNewImage(produto ? produto.image : undefined)
            setNewDescont(produto ? produto.descont : undefined)
            setNewDescription(produto ? produto.description : 'pr')
            setNewStars(produto ? produto.stars : '0')
        }
    },[produto !== undefined ? produto.timestamp : ''])

    const [newImage, setNewImage] = useState<string>('')
    const [newPrice, setNewPrice] = useState<string>('')
    const [newDescont, setNewDescont] = useState<string>('')
    const [newDescription, setNewDescription] = useState<string>('')
    const [newStars, setNewStars] = useState<string>('')

    return(
        <>
            {produto && (
                    produto.price !== undefined && 
                    produto.image !== undefined &&
                    produto.descont !== undefined &&
                    produto.action !== undefined 
                    // produto.description !== undefined &&
                    // produto.stars !== undefined 
                    ) ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: insets.top }}>
                    <Image
                        style={{ width: 280, height: 160, borderRadius: 8 }}
                        source={{
                            uri: produto && produto.action !== 'ADICIONAR' ? produto.image : newImage,
                        }}
                    />
                    
                    <Text>
                        {produto && produto.action !== 'ADICIONAR' ? produto.price : newPrice}
                    </Text>
                    
                    <Text>
                        {produto && produto.action !== 'ADICIONAR' ? produto.descont : newDescont}
                    </Text>

                    {/* FORMULÁRIO DE ATUALIZAÇÃO OU CRIAÇÃO */}
                    <View
                        style={{ width: '80%', height: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}
                    >
                        <Text style={{ width: '21%', fontSize: 12 }}>
                            Price:
                        </Text>
                        <TextInput
                            onChangeText={setNewPrice}
                            value={newPrice}
                            style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '90%' }}
                        />
                    </View>

                    <View
                        style={{ width: '80%', height: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}
                    >
                        <Text style={{ width: '21%', fontSize: 12 }}>
                            Descont:
                        </Text>
                        <TextInput
                            onChangeText={setNewDescont}
                            value={newDescont}
                            style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '90%' }}
                        />
                    </View>
                    
                    <View
                        style={{ width: '80%', height: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}
                    >
                        <Text style={{ width: '21%', fontSize: 12 }}>
                            Image:
                        </Text>
                        <TextInput
                            onChangeText={setNewImage}
                            value={newImage}
                            style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '90%' }}
                        />
                    </View>

                    <View
                        style={{ width: '80%', height: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}
                    >
                        <Text style={{ width: '21%', fontSize: 12 }}>
                            Description:
                        </Text>
                        <TextInput
                            onChangeText={setNewDescription}
                            value={newDescription}
                            style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '90%' }}
                        />
                    </View>

                    <View
                        style={{ width: '80%', height: 30, display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}
                    >
                        <Text style={{ width: '21%', fontSize: 12 }}>
                            Stars:
                        </Text>
                        <TextInput
                            onChangeText={setNewStars}
                            value={newStars}
                            style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '90%' }}
                        />
                    </View>

                    {/* ALERTA DE EXCLUSÃO DOS PRODUTOS DO BANCO DE DADOS */}

                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
                        {produto && produto.action == 'ADICIONAR' && (
                            <Pressable
                                onPress={() => {
                                    onCreate(newImage, newPrice, newDescont, newDescont, newStars)
                                }}
                                style={{ backgroundColor: '#67d083', flexGrow: 1,  paddingVertical: 10 }}
                                >
                                <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                                >Criar</Text>
                            </Pressable>
                        )}

                        {produto && produto.action == 'EDITAR' && (
                            <Pressable
                                onPress={() => {
                                    onUpdate(produto.id, newImage, newPrice, newDescont, newDescription, newStars)
                                }}
                                style={{ backgroundColor: '#64aaff', flexGrow: 1,  paddingVertical: 10 }}
                            >
                                <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                                >Atualizar</Text>
                            </Pressable>
                        )}

                        {produto && produto.action == 'DELETAR' && (
                            <Pressable
                                onPress={() => {
                                    onDelete(produto.id)
                                }}
                                style={{ backgroundColor: '#ff6464', flexGrow: 1,  paddingVertical: 10 }}
                            >
                                <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                                >Deletar</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            ):(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '100%', paddingTop: insets.top }}>
                    <View>
                        <Ionicons
                            name='add'
                            style={{ fontSize: 26, backgroundColor: '#67d083', padding: 15, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                const action = 'ADICIONAR'
                                const timestamp = String(new Date().getTime())
                                alteredInfosProduct('Edit', 'props.descont', 'props.price', 'props.image', 'props.description', 'props.stars', 'props.id', action, timestamp)
                            }}
                        />
                        <Text
                            style={{ textAlign: 'center', marginTop: 10, fontSize: 12, letterSpacing: 2, color: '#000000', opacity: 0.6 }
                        }>Criar</Text>
                    </View>
                    <View>
                        <Ionicons
                            onPress={() => setModalVisible(true)}
                            name='pencil'
                            style={{ fontSize: 26, backgroundColor: '#64aaff', padding: 16, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            />
                        <Text
                            style={{ textAlign: 'center', marginTop: 10, fontSize: 12, letterSpacing: 2, color: '#000000', opacity: 0.6 }}
                        >Editar</Text>
                    </View>
                    <View
                    >
                        <Ionicons
                            onPress={() => setModalVisible(true)}
                            name='trash'
                            style={{ fontSize: 26, backgroundColor: '#ff6464', padding: 16, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                        />
                        <Text
                            style={{ textAlign: 'center', marginTop: 10, fontSize: 12, letterSpacing: 2, color: '#000000', opacity: 0.6 }}
                        >Excluir</Text>
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
                                    Por favor Selecione Um Produto Primeiro
                                </Text>

                                {/* BOTÔES DE FUNCIONALIDADES */}
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Pressable
                                        style={[
                                            {flexGrow: 1, width: '50%', padding: 10, elevation: 2,}
                                            ,{
                                            backgroundColor: '#ff6464',
                                        }]}
                                        onPress={() => setModalVisible(!modalVisible)}
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
                                            >Cancelar</Text>
                                    </Pressable>
                                    
                                    <Pressable
                                        style={[
                                            { flexGrow: 1, width: '50%', padding: 10, elevation: 2 }
                                            ,{
                                                backgroundColor: '#64aaff',
                                            }]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                setTimeout(() => {                                                    
                                                    navigate('Products')
                                                }, 10);
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
                                        >Selecionar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </>
    )
}