import { Injectable } from '@angular/core';
import { Satellite } from '../utils/types';
import esriRequest from '@arcgis/core/request';

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {
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

      this.satellites.push({
        name,
        line1,
        line2,
        time: now,
        origin: 'base'
      });
    }
  }

  addUserSatellite(name: string, line1: string, line2: string) {
    this.satellites.push({
      name,
      line1,
      line2,
      time: Date.now(),
      origin: 'user'
    });
  }

  getAllSatellites() {
    return this.satellites;
  }

}
