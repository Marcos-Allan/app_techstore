import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, Text, TextInput, View, Alert, Modal, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

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

export default function Edit() {
    const insets = useSafeAreaInsets();
    
    const navigate = useNavigation().navigate
    
    const [modalVisible, setModalVisible] = useState(false);
    const [slc, setSlc] = useState<any>();

    
    function alteredInfosProduct(rota:string, descont:string, price:string, image:string, description:string, stars:string, keywords:string, id:string, action:string, timestamp:string){
        const params:Props = { descont, price, image, description, stars, keywords, id, action, timestamp }
        navigate(rota, params)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setNewImage(result.assets[0].uri);
          const name = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1, result.assets[0].uri.length)
          const uri = result.assets[0].uri
          const type = 'image/' + name.split('.')[1]
          const formData = new FormData()
          formData.append('image', JSON.parse(JSON.stringify({
            name: name,
            uri: uri,
            type: type
          })))
            setSlc({
                uri:uri as any,
                name:'file' as any,
                type:type
            })
            formData.append('price', newPrice)
            formData.append('descont', newDescont)
            formData.append('description', newDescription)
            formData.append('keywords', newKeyWords)
        }
      };

    function onDelete(id:string){
        axios.delete(`https://techstore-backend.onrender.com/product/delete/${id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    function onCreate(image:string, price:string, descont:string, description: string, stars: string, keywords:string, slc:any){
        const formData = new FormData()
        
        if(slc){
            formData.append('file', JSON.parse(JSON.stringify({
                name: slc.name,
                uri: slc.uri,
                type: slc.type,
            })))
        }else{
            formData.append('image', newImage)
        }
        formData.append('price', newPrice)
        formData.append('descont', newDescont)
        formData.append('description', newDescription)
        formData.append('keywords', newKeyWords)

        axios.post(`https://techstore-backend.onrender.com/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function onUpdate(id:string, image:string, price:string, descont:string, description: string, stars: string, keywords:string){
        axios.put(`https://techstore-backend.onrender.com/product/update/${id}`, {
            image: image,
            price: price,
            descont: descont,
            description: description,
            stars: stars,
            keywords: keywords,
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
            setNewKeyWords('sem itens')
        }else{
            setNewPrice(produto ? produto.price : undefined)
            setNewImage(produto ? produto.image : undefined)
            setNewDescont(produto ? produto.descont : undefined)
            setNewDescription(produto ? produto.description : 'pr')
            setNewStars(produto ? produto.stars : '0')
            setNewKeyWords(produto ? produto.keywords : 'não tem palavras chaves')
        }
    },[produto !== undefined ? produto.timestamp : ''])

    const [newImage, setNewImage] = useState<string>('')
    const [newPrice, setNewPrice] = useState<string>('')
    const [newDescont, setNewDescont] = useState<string>('')
    const [newDescription, setNewDescription] = useState<string>('')
    const [newStars, setNewStars] = useState<string>('')
    const [newKeyWords, setNewKeyWords] = useState<string>('')

    function addedFormData(name:any='', uri:any='', type:any=''){
        const formData = new FormData()
        if(name !== '' && uri !== '' && type ==! ''){
            setSlc({
                name:name,
                uri:uri,
                type:type
            })
            formData.append('file', JSON.parse(JSON.stringify({
                name: name,
                uri: uri,
                type: type,
            })))
        }else{
            formData.append('image', newImage)
        }
        formData.append('price', newPrice)
        formData.append('descont', newDescont)
        formData.append('description', newDescription)
        formData.append('keywords', newKeyWords)
        return formData
    }

    return(
        <>
            {produto && (
                    produto.price !== undefined && 
                    produto.image !== undefined &&
                    produto.descont !== undefined &&
                    produto.action !== undefined &&
                    produto.description !== undefined &&
                    produto.stars !== undefined &&
                    produto.keywords !== undefined
                    ) ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: insets.top }}>
                    <Image
                        style={{ width: 280, height: 160, borderRadius: 8 }}
                        source={{
                            uri: produto && produto.action !== 'ADICIONAR' ? produto.image : newImage,
                        }}
                    />

                    {/* FORMULÁRIO DE ATUALIZAÇÃO OU CRIAÇÃO */}
                    <ScrollView style={{ width: '95%', backgroundColor: '#d9d9d9', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: 20 }}>
                        <View
                            style={{ width: '100%', marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 20, marginHorizontal: 'auto', paddingHorizontal: 20 }}
                        >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                Price
                            </Text>
                            <TextInput
                                onChangeText={setNewPrice}
                                value={newPrice}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                            />
                        </View>

                        <View
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 20, margin: 'auto', paddingHorizontal: 20 }}
                        >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                Descont
                            </Text>
                            <TextInput
                                onChangeText={setNewDescont}
                                value={newDescont}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                            />
                        </View>
                        
                        <View
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 20, marginHorizontal: 'auto', paddingHorizontal: 20 }}
                        >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                Image
                            </Text>
                            <TextInput
                                onChangeText={setNewImage}
                                value={newImage}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                            />
                        </View>
                        
                        <View
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 20, marginHorizontal: 'auto', paddingHorizontal: 20 }}
                            >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                Stars
                            </Text>
                            <TextInput
                                onChangeText={setNewStars}
                                value={newStars}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                                />
                        </View>

                        <View
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 20, marginHorizontal: 'auto', paddingHorizontal: 20 }}
                        >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                Description
                            </Text>
                            <TextInput
                                onChangeText={setNewDescription}
                                value={newDescription}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                            />
                        </View>
                        
                        <View
                            style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 40, paddingBottom: 40, paddingHorizontal: 20 }}
                        >
                            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', opacity: 0.5, letterSpacing: 3, fontWeight: '300' }}>
                                KeyWords
                            </Text>
                            <TextInput
                                onChangeText={setNewKeyWords}
                                value={newKeyWords}
                                style={{ borderStyle: 'solid', paddingHorizontal: 10, borderWidth: 2, borderColor: '#000000', width: '100%', flexGrow: 1 }}
                            />
                        </View>
                        <View
                            style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 40, paddingBottom: 40, paddingHorizontal: 20 }}
                        >
                            <Pressable onPress={pickImage} >
                                <Text>Selecione Uma Imagem</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    {/* ALERTA DE EXCLUSÃO DOS PRODUTOS DO BANCO DE DADOS */}

                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
                        {produto && produto.action == 'ADICIONAR' && (
                            <Pressable
                                onPress={() => {
                                    onCreate(newImage, newPrice, newDescont, newDescont, newStars, newKeyWords, slc)
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
                                    onUpdate(produto.id, newImage, newPrice, newDescont, newDescription, newStars, newKeyWords)
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
                                alteredInfosProduct('Edit', 'props.descont', 'props.price', 'props.image', 'props.description', 'props.stars', 'props.keywords', 'props.id', action, timestamp,)
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