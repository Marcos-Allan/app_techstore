import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import axios from 'axios'

export default function Edit() {
    const insets = useSafeAreaInsets();

    function onDelete(id:string){
        axios.delete(`https://techstore-backend.onrender.com/product/delete/${id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    function onCreate(image:string, price:string, descont:string){
        axios.post(`https://techstore-backend.onrender.com/create`, {
            image: image,
            price: price,
            descont: descont
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
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
    
    const { price, image, descont, id, action, timestamp }:any = useRoute().params



    useEffect(() => {
        if(action == 'ADICIONAR'){
            setNewPrice('00.00')
            setNewImage('https://via.placeholder.com/900/d9d9d9')
            setNewDescont('0')
        }else{
            setNewPrice(price)
            setNewImage(image)
            setNewDescont(descont)
        }
    },[timestamp])

    const [newImage, setNewImage] = useState<string>('')
    const [newPrice, setNewPrice] = useState<string>('')
    const [newDescont, setNewDescont] = useState<string>('')

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: insets.top }}>

            {image && (
                <Image
                    style={{ width: 280, height: 160, borderRadius: 8 }}
                    source={{
                        uri: action !== 'ADICIONAR' ? image : newImage,
                    }}
                />
            )}
            
            {price && (
                <Text>
                    {action !== 'ADICIONAR' ? price : newPrice}
                </Text>
            )}
            
            {descont && (
                <Text>
                    {action !== 'ADICIONAR' ? descont : newDescont}
                </Text>
            )}

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

            {/* ALERTA DE EXCLUSÃO DOS PRODUTOS DO BANCO DE DADOS */}

            <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
                {action == 'ADICIONAR' && (
                    <Pressable
                        onPress={() => {
                            onCreate(newImage, newPrice, newDescont)
                        }}
                        style={{ backgroundColor: '#67d083', flexGrow: 1,  paddingVertical: 10 }}
                        >
                        <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                        >Criar</Text>
                    </Pressable>
                )}

                {action == 'EDITAR' && (
                    <Pressable
                        onPress={() => {
                            onUpdate(id, newImage, newPrice, newDescont)
                        }}
                        style={{ backgroundColor: '#64aaff', flexGrow: 1,  paddingVertical: 10 }}
                    >
                        <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                        >Atualizar</Text>
                    </Pressable>
                )}

                {action == 'DELETAR' && (
                    <Pressable
                        onPress={() => {
                            onDelete(id)
                        }}
                        style={{ backgroundColor: '#ff6464', flexGrow: 1,  paddingVertical: 10 }}
                    >
                        <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
                        >Deletar</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}

// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useState, useEffect } from 'react'
// import { useRoute } from "@react-navigation/native";
// import { Image, Pressable, Text, TextInput, View } from "react-native";
// import axios from 'axios'

// export default function Edit() {
//     const insets = useSafeAreaInsets();

//     function onDelete(id:string){
//         axios.delete(`https://techstore-backend.onrender.com/product/delete/${id}`)
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => {
//             console.error(error)
//         })
//     }
    
//     function onCreate(image:string, price:string, descont:string){
//         axios.post(`https://techstore-backend.onrender.com/create`, {
//             image: image,
//             price: price,
//             descont: descont
//         })
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => {
//             console.error(error)
//         })
//     }

//     function onUpdate(id:string, image:string, price:string, descont:string){
//         axios.put(`https://techstore-backend.onrender.com/product/update/${id}`, {
//             image: image,
//             price: price,
//             descont: descont,
//         })
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => {
//             console.error(error)
//         })
//     }
    
//     const { price, image, descont, id, action }:any = useRoute().params

//     useEffect(() => {
//         setNewImage(image)
//         setNewPrice(price)
//         setNewDescont(descont)
//     },[])

//     const [newImage, setNewImage] = useState<string>('')
//     const [newPrice, setNewPrice] = useState<string>('')
//     const [newDescont, setNewDescont] = useState<string>('')

//     function hanlePrice(event:any){
//         setNewPrice(event.target.value)
//     }
//     function hanleImage(event:any){
//         setNewImage(event.target.value)
//     }
//     function hanleDescont(event:any){
//         setNewDescont(event.target.value)
//     }

//     return(
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: insets.top }}>

//             {image && (
//                 <Image
//                     style={{ width: 280, height: 160, borderRadius: 8 }}
//                     source={{
//                         uri: action !== 'ADICIONAR' ? image : newImage,
//                     }}
//                 />
//             )}
//             {price && (
//                 <Text>
//                     {action !== 'ADICIONAR' ? price : newPrice}
//                 </Text>
//             )}
            
//             {descont && (
//                 <Text>
//                     {action !== 'ADICIONAR' ? descont : newDescont}
//                 </Text>
//             )}

//             {/* FORMULÁRIO DE ATUALIZAÇÃO OU CRIAÇÃO */}
//             <View
//                 style={{ width: '80%', height: 30, display: 'flex', flexDirection: 'row', marginBottom: 10 }}
//             >
//                 <Text>
//                     Price:
//                 </Text>
//                 <TextInput
//                     onChangeText={setNewPrice}
//                     value={newPrice}
//                     style={{ borderStyle: 'solid', paddingLeft: 10, borderWidth: 2, borderColor: '#000000', flexGrow: 1 }}
//                 />
//             </View>

//             <View
//                 style={{ width: '80%', height: 30, display: 'flex', flexDirection: 'row', marginBottom: 10 }}
//             >
//                 <Text>
//                     Descont:
//                 </Text>
//                 <TextInput
//                     onChangeText={setNewDescont}
//                     value={newDescont}
//                     style={{ borderStyle: 'solid', paddingLeft: 10, borderWidth: 2, borderColor: '#000000', flexGrow: 1 }}
//                 />
//             </View>
            
//             <View
//                 style={{ width: '80%', height: 30, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', marginBottom: 10 }}
//             >
//                 <Text>
//                     Image:
//                 </Text>
//                 <TextInput
//                     onChangeText={setNewImage}
//                     value={newImage}
//                     style={{ borderStyle: 'solid', paddingLeft: 10, borderWidth: 2, borderColor: '#000000', flexGrow: 1 }}
//                 />
//             </View>

//             {/* ALERTA DE EXCLUSÃO DOS PRODUTOS DO BANCO DE DADOS */}

//             <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
//                 {action == 'ADICIONAR' && (
//                     <Pressable
//                         onPress={() => {
//                             onCreate(newImage, newPrice, newDescont)
//                         }}
//                         style={{ backgroundColor: '#67d083', flexGrow: 1,  paddingVertical: 10 }}
//                         >
//                         <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
//                         >Criar</Text>
//                     </Pressable>
//                 )}

//                 {action == 'EDITAR' && (
//                     <Pressable
//                         onPress={() => {
//                             onUpdate(id, newImage, newPrice, newDescont)
//                         }}
//                         style={{ backgroundColor: '#64aaff', flexGrow: 1,  paddingVertical: 10 }}
//                     >
//                         <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
//                         >Atualizar</Text>
//                     </Pressable>
//                 )}

//                 {action == 'DELETAR' && (
//                     <Pressable
//                         onPress={() => {
//                             onDelete(id)
//                         }}
//                         style={{ backgroundColor: '#ff6464', flexGrow: 1,  paddingVertical: 10 }}
//                     >
//                         <Text style={{ textTransform: 'uppercase', color: '#f2f2f2', textAlign: 'center', fontWeight: '600'}}
//                         >Deletar</Text>
//                     </Pressable>
//                 )}
//             </View>
//         </View>
//     )
// }