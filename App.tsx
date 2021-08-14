import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface IAdress {
  cep?: string,
  logradouro?: string,
  bairro?: string,
  localidade?: string,
  uf?: string,
}
        

export default function App() {
  const [adress, setAdress] = useState<IAdress>({
    cep: '',
    logradouro: '',
    localidade: '',
    bairro: '',
    uf: ''
  });

  console.log(adress);

  const getAdressFromApi = useCallback(() => {
    fetch(`https://viacep.com.br/ws/${adress.cep}/json/`)
    .then(res => res.json())
    .then((data: IAdress) => setAdress({
      bairro: data.bairro,
      localidade: data.localidade,
      logradouro: data.logradouro,
      uf: data.uf
    })).catch(err => console.log('erro: ', err))
  }, [adress.cep])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />



      <View style={styles.form}>
        <Text style={styles.titlePage}>Endereço:</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Digite o seu CEP"
          onEndEditing={() => getAdressFromApi()}
          onChangeText={(text) => setAdress((old) => ({
            ...old,
            cep: text
          }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={adress.logradouro}
          onChangeText={(text) => setAdress((old) => ({
            ...old,
            logradouro: text
          }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={adress.bairro}
          onChangeText={(text) => setAdress((old) => ({
            ...old,
            bairro: text 
          }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={adress.localidade}
          onChangeText={(text) => setAdress((old) => ({
            ...old,
            localidade: text
          }))}
        />
        <TextInput
          style={styles.input}
          placeholder="UF"
          value={adress.uf}
          onChangeText={(text) => setAdress((old) => ({
            ...old,
            uf: text
          }))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
    paddingHorizontal: 24
  },
  titlePage: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginBottom: 24
  },
  form: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 12,
    backgroundColor: '#CCCCCC',
    fontWeight: 'bold'
  }
});
