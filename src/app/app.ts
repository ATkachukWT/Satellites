import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { History } from './components/history/history';
import { MapComponent } from './components/map/map';
import { BehaviorSubject } from 'rxjs';
import { PositionService } from './services/position';
import { MapFeature } from './components/map-feature/map-feature';
import { Map3D } from './components/map-3-d/map-3-d';
import { AddSatForm } from './components/add-sat-form/add-sat-form';


@Component({
  selector: 'app-root',
  imports: [
    History, 
    MapComponent,
    MapFeature,
    AddSatForm,
    Map3D
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'iss-tracker';

  positions = new BehaviorSubject<any[]>([]);
  highlightedPosition: any = null;
  activeMap: string = 'map1';

  constructor(private http: HttpClient, private positionService: PositionService) { }

  ngOnInit() {
    this.loadISSPosition();
    setInterval(() => this.loadISSPosition(), 10000);
  }


  loadISSPosition() {
    this.http.get<any>('http://api.open-notify.org/iss-now.json').subscribe(res => {
      const timestamp = new Date();
      const lat = parseFloat(res.iss_position.latitude);
      const lon = parseFloat(res.iss_position.longitude);

      const newPosition = { latitude: lat, longitude: lon, time: timestamp };
      console.log('New position fetched:', newPosition);
      this.positionService.updatePositions(newPosition);
    });
  }

  switchMap(mapType: string) {
    this.activeMap = mapType;
  }

  highlight(position: any) {
    this.highlightedPosition = position;
  }
}
