import  Produto  from './Produto';
 import api from '../api';

 class GestorDados {
     public async remover(chave: string){
     await api.delete('/remove/'+chave);
     }
     public async adicionar(produto: Produto){
     await api.post('/new', produto);
     }
    public async editar(produto: Produto) {
    await api.put(`/edit/${produto._id}`, produto);
}
    public async obterTodos(): Promise<Produto[]>{
    const resposta = await api.get('/');
    return resposta.data;
    }
 }

 export default GestorDados;
