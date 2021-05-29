import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  items: any[] =[
    { 
      name:"Games",
      subItems:[]
    },
    {
      name:"Generations",
      subItems:[]
    },
    { 
      name:"Locations",
      subItems:[]
    },
    {
      name:"Items",
      subItems:[]
    }
  ];
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    forkJoin(
      [this.commonService.getRequest('https://pokeapi.co/api/v2/version?limit=34'),
      this.commonService.getRequest('https://pokeapi.co/api/v2/generation')]
    ).subscribe((result: any[]) => {
      this.items[0].subItems = result[0]['results'];
      this.items[1].subItems = result[1]['results'];
    });
   
  }

}
