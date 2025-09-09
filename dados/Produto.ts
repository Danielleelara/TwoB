class Produto {
     _id: number;
     nome: string;
     quantidade: number;
     constructor(_id: number, nome: string, quantidade: number){
         this._id = _id;
         this.nome = nome;
         this.quantidade = quantidade;
     }
 }

 export default Produto;