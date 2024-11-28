import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../model/Cliente';
import { ClientService } from '../servico/client.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  table:boolean = true;
  btn_cadastro:boolean = true;
  cliente = new Client;
  clientes:Client[] = [];

  constructor(private service:ClientService){}

  selectAllClients():void{
    this.service.selectAllClients().subscribe(resposta =>this.clientes = resposta)
  }

  register():void{
    this.service.register(this.cliente)
    .subscribe(retorno => {
        this.clientes.push(retorno);
        this.cliente = new Client;
        alert("Customer registered successfully")
    })
  }

  selectClient(i:number):void{
    this.cliente = this.clientes[i];

    this.btn_cadastro = false;
    this.table = false;
  }

  edit():void{
    this.service.edit(this.cliente)
    .subscribe(retorno => {
      let i = this.clientes.findIndex(obj=>{ return obj.id == retorno.id});

      this.clientes[i] = retorno;

      this.btn_cadastro = true;
      this.table = true;

      this.cliente = new Client;
      alert("Client changed successfully");
    });
  }


  remove():void{
    this.service.remove(this.cliente.id)
    .subscribe(retorno => {
      let i = this.clientes.findIndex(obj=>{ return obj.id == this.cliente.id});

      this.clientes.splice(i,1);

      this.btn_cadastro = true;
      this.table = true;

      this.cliente = new Client;
      alert("Client successfully removed");
    });
  }


  cancel():void{
    this.cliente = new Client;
    this.btn_cadastro = true;
    this.table = true;
  }


  ngOnInit(){
    this.selectAllClients();
    //this.table = true;
    //this.btn_cadastro = true;
    //this.cliente = new Client();
  }
}
