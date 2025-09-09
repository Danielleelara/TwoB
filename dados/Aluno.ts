class Aluno {
     _id: number;
     nome: string;
     turma: string;
     pago: boolean;
     constructor(_id: number, nome: string, turma: string, pago: boolean){
         this._id = _id;
         this.nome = nome;
         this.turma = turma;
         this.pago = pago;
     }
 }

 export default Aluno;