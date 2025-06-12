import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SatelliteService } from '../../services/satellite';

@Component({
  selector: 'app-add-sat-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-sat-form.html',
  styleUrl: './add-sat-form.css'
})
export class AddSatForm {
  @Output() newSatelliteAdded = new EventEmitter<void>();

  satellite = { name: '', line1: '', line2: '' };

  constructor(private satelliteService: SatelliteService) {}

  onSubmit() {
    this.satelliteService.addUserSatellite(this.satellite.name, this.satellite.line1, this.satellite.line2);
    this.newSatelliteAdded.emit();
    this.satellite = { name: '', line1: '', line2: '' };
  }
}
