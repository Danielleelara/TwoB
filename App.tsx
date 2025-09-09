/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { useEffect, useState } from 'react';
import { FlatList, StatusBar, Text, useColorScheme, View } from 'react-native';
import { styles } from './CommonStyles';
import GestorDados from './dados/GestorDados';
import Produto from './dados/Produto';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    new GestorDados().obterTodos()
      .then(prod => {
        setProducts(prod);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <Text >{item._id}</Text>
            <Text >{item.nome}</Text>
            <Text >{item.quantidade}</Text>
          </View>
        )}  
      />
      <Text>teste</Text>
    </View>
  );
}


export default App;
