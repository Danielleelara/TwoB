import React, { Fragment, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import GestorDados from './dados/GestorDados';
import Produto from './dados/Produto';
import { styles } from './CommonStyles';

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Produto[]>([]);

 const getData = async () => {
  try {
    const response = await new GestorDados().obterTodos()
    setData(response); 
  } catch (error) {
    console.error('Não foi possível carregar os dados', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.itemsContainer}>
          <Text style={styles.input}>Dados do StackOverFlow:</Text>
          <FlatList
            data={data}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => (
              <Fragment key={item._id}>
                <Text>{item._id || ''}</Text>
                <Text style={styles.textItem}>{item.nome}</Text>
                <Text>{item?.quantidade}</Text>
              </Fragment>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const novoProduto = { _id: 5, nome: 'Ciriguela', quantidade: 25 };
          new GestorDados()
            .adicionar(novoProduto)
            .then(() => console.log('Produto adicionado:'))
            .catch(error => console.error('Erro ao adicionar produto:', error));
          getData();
        }}
      >
        Adicionar produto
      </TouchableOpacity>
      {/* <Button
         title="editar Produto"
         onPress={() => {
           const novoProduto = { _id: null, nome: 'Uva', quantidade: 10 };
           new GestorDados().editar(novoProduto)
                 .then((json) => setData(json))
             .catch((error) => console.error('Erro ao adicionar produto:', error));
             getData();
         }}
         /> */}
    </View>
  );
};

export default Home;
