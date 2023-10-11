import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLoading: boolean = false;
  clientes: any;

  getClientes(){
    this.isLoading = true;
    fetch('http://localhost/api_fatec/clientes/listar.php')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      //this.clientes = response['clientes'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

}
