import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native'

export default function People(){
    const insets = useSafeAreaInsets();
    const [web, setWeb] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('offline')

    useEffect(() => {
      setMessage(message == 'online' ? 'offline' : 'online')
    }, [web]);

    return(
        <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>
            <Text>
                Teste de webHooks
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#0085de', marginTop: 20, padding: 20, borderRadius: 10, width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setWeb(!web)}
            >
              <Text style={{ color: '#ffffff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3, fontSize: 10, textAlign: 'center'  }}>Utilizar WebHook</Text>
            </TouchableOpacity>
            
            <Text
              style={{
                color: `${message == 'online' ? '#5cbb77' : '#ff5f5f'}`, textTransform: 'uppercase', fontWeight: '900', marginTop: 20,
            }}>
              {message}
            </Text>
        </View>
    )
}