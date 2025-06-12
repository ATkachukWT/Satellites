import { Injectable } from '@angular/core';
import { Satellite } from '../utils/types';
import esriRequest from '@arcgis/core/request';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {
  private satellitesSubject = new BehaviorSubject<Satellite[]>([]);
  satellites$ = this.satellitesSubject.asObservable();

  private satellites: Satellite[] = [];

  async loadBaseSatellites(url: string): Promise<void> {
    const response = await esriRequest(url, { responseType: 'text' });
    const lines = response.data.split('\n');
    const count = Math.floor(lines.length / 3);
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const name = lines[i * 3].trim();
      const line1 = lines[i * 3 + 1].trim();
      const line2 = lines[i * 3 + 2].trim();

      if (!name || !line1 || !line2) continue;

      if (name.includes('COSMOS')) {
        this.satellites.push({
          name,
          line1,
          line2,
          time: now,
          origin: 'base'
        });
      }
    }

    this.satellitesSubject.next([...this.satellites]);
        
  }

  addUserSatellite(name: string, line1: string, line2: string) {
    const sat: Satellite = { name, line1, line2, time: Date.now(), origin: "user" };
    this.satellites.push(sat);
    this.satellitesSubject.next([...this.satellites]);
  }

  getAllSatellites() {
    return this.satellites;
  }

}
