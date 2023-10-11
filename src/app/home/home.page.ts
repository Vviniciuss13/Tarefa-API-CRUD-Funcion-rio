import { Component, ViewChild } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { error } from 'console';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonModal) modal: IonModal;

  constructor()
  {
    this.getFuncionarios();
  }

  isModalOpen = false;

  type = '';

  funcionario = {
    id: '',
    nome: '',
    sobrenome: '',
    cargo: '',
    cep: '',
    pais: '',
    cidade: '',
    fone: '',
    data_nasc: '',
    endereco: '',
    salario: 0,
  }

  isLoading: boolean = false;
  funcionarios: any;

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api_atividade/funcionario/listar_funcionarios.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios;
      this.type = typeof(this.funcionarios);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(cod: any){
    this.isLoading = true;
    fetch('http://localhost/api_atividade/funcionario/remover_funcionario.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify({CodFun: cod, Acao: 'remover'})
    })
    .then(response => response.json())
    .then(response => {
      alert(response.menssagem)
      this.getFuncionarios();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
    })

  }

  inserir(form: NgForm){
    this.isLoading = true;
    fetch('http://localhost/api_atividade/funcionario/inserir_funcionarios.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(response => {
      alert(response.menssagem);
      this.getFuncionarios();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  selecionar(CodFun: any){
    this.isLoading = true;
    fetch('http://localhost/api_atividade/funcionario/listar_pelo_id_funcionario.php',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({CodFun: CodFun})
    })
    .then(response => response.json())
    .then(response => {
      this.funcionario.id = response.funcionarios.CodFun
      this.funcionario.nome = response.funcionarios.Nome
      this.funcionario.sobrenome = response.funcionarios.Sobrenome
      this.funcionario.cargo = response.funcionarios.Cargo
      this.funcionario.cep = response.funcionarios.CEP
      this.funcionario.pais = response.funcionarios.Pais
      this.funcionario.cidade = response.funcionarios.Cidade
      this.funcionario.fone = response.funcionarios.Fone
      this.funcionario.data_nasc = response.funcionarios.DataNasc
      this.funcionario.endereco = response.funcionarios.Endereco
      this.funcionario.salario = response.funcionarios.Salario
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  pesquisar(pesquisa: NgForm){
    this.isLoading = true;
    fetch('http://localhost/api_atividade/funcionario/listar_funcionarios_filtro.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pesquisa)
    })
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios
      this.type = typeof(this.funcionarios);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  atualizar(form: NgForm){
    this.isLoading = true;
    console.log(form);
    fetch('http://localhost/api_atividade/funcionario/atualizar_funcionario.php',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(response => {
      alert(response.menssagem)
      this.getFuncionarios();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  setOpen(){
    if(this.isModalOpen == false){
      this.isModalOpen = true;
    }else{
      this.modal.dismiss(null);
      this.isModalOpen = false;
    }
    this.funcionario = {
      id: '',
      nome: '',
      sobrenome: '',
      cargo: '',
      cep: '',
      pais: '',
      cidade: '',
      fone: '',
      data_nasc: '',
      endereco: '',
      salario: 0,
    }
  }
}
