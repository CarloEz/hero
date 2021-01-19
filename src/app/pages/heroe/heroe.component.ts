import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel()

  constructor(private heroesService: HeroesService, private route:ActivatedRoute) { }

  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id'); //Capturo el parametro por la url 
    console.log(id);

    if(id!=='nuevo'){
      this.heroesService.getHeroe(id)
      .subscribe((res:HeroeModel)=>{
        this.heroe=res;
        this.heroe.id=id;
      })
    }
   }

  guardar(f: NgForm) {
    if (f.invalid) { console.log("Formulario no valido"); return }

    swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    })

    swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {

      peticion = this.heroesService.actualizarHeroe(this.heroe)

    } else {
      peticion = this.heroesService.crearHeroe(this.heroe)
    }

    peticion.subscribe(resp=>{
      swal.fire({
        title:this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon:'success',
      })
    })
  }
}
