import { LanguageService } from './../language.service';
import { CommonService } from './../common.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  pageIndex: number = 0;

  pageSize: number = 20;

  pokemonList: any[] = [];

  keySearch: string = '';

  currentLanguage: string = 'en';

  subscription: Subscription[] = [];

  isSpinner: boolean = true;

  pokemonListOrigin: any[] = [];
  
  constructor(
    private commonService: CommonService,
    private languageService: LanguageService,
    public dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.getPokemonList();
    this.currentLanguage = this.languageService.getDefaultLanguage;
    this.subscription.push(this.languageService.changLanguage$.subscribe(() => {
      this.currentLanguage = this.languageService.getDefaultLanguage;
    }));
  }

  getPokemonList(): void {
    this.isSpinner = true;
    this.commonService.getRequest(`https://pokeapi.co/api/v2/pokemon/?offset=${this.pageIndex * this.pageSize}&limit=${this.pageSize}`).pipe(
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
      this.pokemonListOrigin = this.pokemonList;
      this.isSpinner = false;
    }, () => {
      this.isSpinner = false;
    });
  }

  openDialog(item: object): void {
    this.dialog.open(PokemonDialogComponent, {
      width: 'auto',
      data: item
    });
  }

  handlePage(event: any): void {
    this.pageIndex = event['pageIndex'];
    this.pageSize = event['pageSize'];
    this.getPokemonList();
  }

  onSubmit(): void {
    if (this.pokemonListOrigin.length) {
      this.pokemonList = this.pokemonListOrigin;
    }
    if (this.pokemonList) {
      const re = new RegExp(this.keySearch+'.+$', 'i');
      this.pokemonList = this.pokemonList.filter((e, i, a) => {
        return e.name.search(re) != -1;
      });
    }
  } 
}
