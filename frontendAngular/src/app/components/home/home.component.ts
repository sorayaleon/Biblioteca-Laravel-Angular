import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../Services/establecimiento.service';
import { LibroService } from '../../Services/libro.service';
import { PrestamoService } from '../../Services/prestamo.service';
import { UsuarioService } from '../../Services/usuario.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Valoracion } from '../../models/valoracion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[EstablecimientoService, LibroService, PrestamoService]
})
export class HomeComponent implements OnInit {
  public establecimiento: any;
  public libro: any;
  pageActual: number = 1;
  filterLibro = '';
  filterEstablecimiento = '';
  public numInac = 0;
  public estInac = 0;
  public solicitud: any;
  public prestamos: any;
  public fechaHoy: any;
  public numPrestamos = 0;
  public idUsu;
  public prestamo;
  public numLibros;
  public usuario;
  public filtro: any = { cp: ''};
  public establecimientoAct = [];
  
  public valoracion: Valoracion;
  public valoracionLibro;
  public numValoracion = 0;
  public puntuacionTotal;
  public votos;
  public estrellas;
  public puntos;
  
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _libroService: LibroService,
    private _prestamoService: PrestamoService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
  ) { 
    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');
    // this.fechaDosDias = this.calcularFecha();
    // this.fechaDosDias = moment(this.fechaDosDias).format('YYYY-MM-DD hh:mm:ss');
    
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idUsu = sessionStorage.getItem("id");
    });

    this._libroService.getLibros().subscribe(
      result => {
       this.libro = result;
       for (let index = 0; index < this.libro.length; index++) {
        if(this.libro[index]["estado"]=="activo" ){
           this.numInac += 1;
        }
      }
       console.log(<any>result);

     },
     error => {
       console.log(<any>error);
     }
  );

    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       for (let index = 0; index < this.establecimiento.length; index++) {
        if(this.establecimiento[index]["estado"]=="activo" ){
           this.estInac += 1;
           this.establecimientoAct.push(this.establecimiento[index]);
        }
      }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );

  this._prestamoService.getSolicitudes().subscribe(
    response => {
      
      console.log(<any>response);
      this.solicitud = response;
      console.log(this.solicitud);
      for (let index = 0; index < this.solicitud.length; index++) {
        if(this.solicitud[index]["tipo"]=="prestamo" && this.solicitud[index]["fecha"]<this.fechaHoy){
            this.controlRetraso(this.solicitud[index]["idUsu"]);
            
            
        }

      if(this.solicitud[index]["tipo"]=="prestamo" && this.solicitud[index]["fecha"]<this.fechaHoy 
      && this.solicitud[index]["idUsu"]==this.idUsu){
            return this.numPrestamos+=1;
         }
      }
      
      for (let index = 0; index < this.solicitud.length; index++) {
        if(this.solicitud[index]["tipo"]=="solicitud" && this.solicitud[index]["fecha"]<this.fechaHoy){
            this.controlLibro(this.solicitud[index]["idL"], this.solicitud[index]["id"]);
            this.restaLibro(this.solicitud[index]["idUsu"]);
        }
      }
    }, error => {
      console.log(<any>error);
    }
  )
}

controlRetraso(id){
  let estado = "penalizado";
  console.log(estado);
  this._usuarioService.updateEstadoUsuario(id, estado).subscribe(
    result => {
      console.log(<any>result);
      console.log(estado);
    }, error => {
      console.log(<any>error);
    }
  )
  }

  controlLibro(id, idR){
    this._libroService.updateEstadoLibro(id, "activo").subscribe(
      result => {
        console.log(<any>result);
      }, error => {
        console.log(<any>error);
      }
    )
    this._prestamoService.deleteReserva(idR).subscribe(
    result => {
      console.log(<any>result);
    }, error => {
      console.log(<any>error);
    }
  )
  }


  restaLibro(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        console.log(<any>response);
        this.usuario = response;
        this.numLibros = this.usuario.numLibros;

        this.numLibros-=1;
    this._usuarioService.UpdateNumLibros(id, this.numLibros).subscribe(
      response =>{
        console.log(<any>response);
      }, error => {
        console.log(<any>error);
      }
    )
      }, error => {
        console.log(<any>error);
      }
    )
    
  }

  

  }
