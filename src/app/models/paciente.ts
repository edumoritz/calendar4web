export class Paciente {

  constructor(
    public id?: number,
    public nome?: string,
    public sobrenome?: string,
    public email?: string,
    public telefone?: number,
    public celular?: number,
    public data_nasc?: Date,
    public comentario?: string
  ){}


}
