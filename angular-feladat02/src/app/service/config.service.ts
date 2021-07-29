import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = `http://localhost:3000/`;

  navigation: {label: string, href: string, role: number}[] = [
    {label: 'Home', href: '', role: 0},
    {label: 'Editor', href: '/editor', role: 2},
    {label: 'Admin', href: '/admin', role: 3},
    {label: 'Movie', href: '/movie', role: 0},
  ];

  movieColumns: {key: string, label: string}[] = [
    {key: 'id', label: '#'},
    {key: 'producer', label: 'Rendező'},
    {key: 'title', label: 'Cím'},
  ];


  constructor() { }
}
