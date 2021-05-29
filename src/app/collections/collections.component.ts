import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  pageIndex: number = 0;

  pageSize: number = 20;

  pokemonList: any[] = [];

  keySearch: string = '';
  
  constructor(
    private commonService: CommonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
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
    if (this.pokemonList) {
      const re = new RegExp(this.keySearch+'.+$', 'i');
      this.pokemonList = this.pokemonList.filter((e, i, a) => {
        return e.name.search(re) != -1;
      });
    }
  } 
}
