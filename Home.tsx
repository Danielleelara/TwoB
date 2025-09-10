import React, { useEffect, useState } from 'react';
import { Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GestorDados from './dados/GestorDados';
import Aluno from './dados/Aluno';
import { styles } from './CommonStyles';

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Aluno[]>([]);
  const [edit, setEdit] = useState<Aluno | null>(null);


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

const onEditItem = async (item: Aluno) => {

  try {
   await new GestorDados().editar(item); 
    getData();
    setEdit(null);
    
  } catch (error) {
   console.log('Não foi possível editar o item', error);  
  }
}

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.itemsContainer}>
          <Text style={styles.input}>TwoB - Escola de Jiu-Jitsu</Text>
          <FlatList
            data={data}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity key={item._id} style={styles.item}
              onPress={() => setEdit(item)}
              >
                <Text style={styles.textItem}>{item.nome}</Text>
                <Text style={styles.textItem}>{item?.turma}</Text>
                <Text style={styles.textItem}>{item?.pago ? 'Pago': 'Pendente'}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // const novoAluno = { _id: 16 , nome: 'Angelina Maria', turma: 'A1', pago: true };
          // new GestorDados()
          //   .adicionar(novoProduto)
          //   .then(() => console.log('Produto adicionado:'))
          //   .catch(error => console.error('Erro ao adicionar produto:', error));
          // getData();
        }}
      >
        <Text>Adicionar Aluno</Text>
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

         <Modal
      visible={edit !== null}
      animationType='slide'
      onRequestClose={() => setEdit(null)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Editar Aluno</Text>
        {edit && (
          <>
            <TextInput onChangeText={(e: string) => setEdit({ ...edit, pago: !e })} value={edit.pago ? 'pago' : 'pendente'} style={styles.modalLabel}/>
            <TextInput onChangeText={(e: string) => setEdit({ ...edit, nome: e })} value={edit.nome}  style={styles.modalValue}/>  
            <TextInput onChangeText={(e: string) => setEdit({ ...edit, turma: e })} value={edit.turma} style={styles.modalValue}/>
         </>)}
         <Button title='Editar' onPress={()=> edit && onEditItem(edit)}/>
           <Button title='Fechar' onPress={()=>setEdit(null)}/>
         </View>
         </Modal>
    </View>
  );
};

export default Home;
