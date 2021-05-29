import { Observable } from 'rxjs/internal/Observable';
import { CommonService } from './../common.service';
import { LanguageService } from './../language.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent implements OnInit {

  currentLanguage: string = 'en';
  pokemonSpecies: any = {};
  constructor(
    public dialogRef: MatDialogRef<PokemonDialogComponent>,
    private languageService: LanguageService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getDefaultLanguage;
    this.getSpeciesById(this.data.id);
  }

  getSpeciesById(id: number): any {
    this.commonService.getRequest('https://pokeapi.co/api/v2/pokemon-species/' + id).subscribe(result => {
      this.pokemonSpecies = result;
    });
  }

  getGenera(): string {
    if (this.pokemonSpecies && this.pokemonSpecies.genera) {
      return this.pokemonSpecies.genera.filter((x: any) => x.language.name === 'en')[0].genus;
    }
    return '';
  }

  getFlavor(): string {
    if (this.pokemonSpecies && this.pokemonSpecies['flavor_text_entries']) {
      return this.pokemonSpecies.flavor_text_entries[0].flavor_text;
    }

    return '';
  }

  getColor(): string {
    if (this.pokemonSpecies && this.pokemonSpecies.color) {
      return this.pokemonSpecies.color.name;
    }

    return '';
  }
}
