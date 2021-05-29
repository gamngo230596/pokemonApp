import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayLanguage: string = 'English';
  constructor() { }

  ngOnInit(): void {
  }

  onToggle(event: MatSlideToggleChange ): void {
    this.displayLanguage = event.checked ? 'Japanese' : 'English';
  }
}
