import { Component } from '@angular/core';
import { Body } from './body/body';

@Component({
  selector: 'app-home',
  imports: [Body],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
