import { Component, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-sat-form',
  imports: [BrowserModule, FormsModule],
  templateUrl: './add-sat-form.html',
  styleUrl: './add-sat-form.css'
})
export class AddSatForm {
  newSatellite: string = '';
  @Output() newSatelliteAdded: (satellite: string) => void = () => {};

  satellite = {
    name: '',
    line1: '',
    line2: '',
  };

  onSubmit() {
    // You can hook this up to your satellite service or list
    console.log('New satellite added:', this.satellite);
    // Reset the form if needed:
    this.satellite = { name: '', line1: '', line2: '' };
  }

}
