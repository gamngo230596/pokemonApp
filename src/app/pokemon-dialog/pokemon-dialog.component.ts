import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PokemonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
}
