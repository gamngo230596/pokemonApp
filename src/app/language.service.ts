import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  changLanguage$: Subject<void> = new Subject(); 

  private defaultLanguage: string = 'en';


  constructor() { }

  get getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

  set setDefaultLanguage(lang: string) {
    this.defaultLanguage = lang;
  }
}
