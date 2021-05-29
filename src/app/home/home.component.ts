import { LanguageService } from './../language.service';
import { CommonService } from './../common.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  videoTrailerUrl: string[] = [
    'https://youtu.be/D0zYJ1RQ-fs',
    'https://youtu.be/1roy4o4tqQM',
    'https://youtu.be/bILE5BEyhdo',
    'https://youtu.be/uBYORdr_TY8'
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      760: {
        items: 2
      },
      1000: {
        items: 3
      }
    },
    nav: true
  }

  safeURL: SafeResourceUrl[] = [];

  pokemonList: any[] = [];

  itemList: any[] = [];

  currentPage: number = 0;

  limitPerPage: number = 10;

  subscription: Subscription[] = [];

  currentLanguage: string = 'en';

  constructor(
    private _sanitizer: DomSanitizer,
    private commonService: CommonService,
    private languageService: LanguageService,
    public dialog: MatDialog
  ) { 
    this.safeURL = this.videoTrailerUrl.map(url => {
      return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url.split('https://youtu.be/')[1]);
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.getPokemonList();
    this.getItemList();
    this.currentLanguage = this.languageService.getDefaultLanguage;
    this.subscription.push(this.languageService.changLanguage$.subscribe(() => {
      this.currentLanguage = this.languageService.getDefaultLanguage;
    }));
  }

  getMoreList() {
    this.currentPage+=1;
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.commonService.getRequest(`https://pokeapi.co/api/v2/pokemon/?offset=${this.currentPage * this.limitPerPage}&limit=${this.limitPerPage}`).pipe(
      switchMap((result: {results: any[]}) => {
        const requestArray$: Observable<any>[] = [];
        result['results'].forEach(item => {
          const request$: Observable<any> = this.commonService.getRequest(item.url);
          requestArray$.push(request$);
        });
        return forkJoin(requestArray$);
      })
    ).subscribe(result => {
      this.pokemonList = result.map(item => Object.assign(item, { image: item.sprites.other['official-artwork']['front_default']}));
    });
  }

  getItemList(): void {
    this.commonService.getRequest('https://pokeapi.co/api/v2/item/?limit=10').pipe(
      switchMap((result: {results: any[]}) => {
        const requestArray$: Observable<any>[] = [];
        result['results'].forEach(item => {
          const request$: Observable<any> = this.commonService.getRequest(item.url);
          requestArray$.push(request$);
        });
        return forkJoin(requestArray$);
      })
    ).subscribe(result => {
      this.itemList = result;
    });
  }

  openDialog(item: object): void {
    this.dialog.open(PokemonDialogComponent, {
      width: 'auto',
      data: item
    });
  }
}
