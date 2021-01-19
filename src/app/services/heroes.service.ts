import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://heroesapp-c2f60-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        }))
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroetemp = {
      ...heroe
    }
    delete heroetemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroetemp);
  }


  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1000)
      )
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObject: object) {
    const heroes: HeroeModel[] = []

    Object.keys(heroesObject).forEach(key => {
      const heroe: HeroeModel = heroesObject[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    if (heroesObject === null) { return [] }

    return heroes;
  }
}
