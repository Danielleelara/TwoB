import Aluno from './Aluno';
import api from '../api';

class GestorDados {
  public async remover(chave: string) {
    await api.delete('/remove/' + chave);
  }
  public async adicionar(aluno: Aluno) {
    await api.post('/new', aluno);
  }
  public async editar(aluno: Aluno) {
    const { _id, nome, turma, pago } = aluno;
   await api.put(`/edit/${_id}`, { nome, turma, pago });
  }
  public async obterTodos(): Promise<Aluno[]> {
    const resposta = await api.get('/');
    return resposta.data;
  }

}

export default GestorDados;
