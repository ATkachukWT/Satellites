

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import esriRequest from '@arcgis/core/request';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Popup from '@arcgis/core/widgets/Popup';
import { watch } from '@arcgis/core/core/reactiveUtils';

// @ts-ignore
import * as satellite from 'satellite.js';
import { SatelliteService } from '../../services/satellite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-3-d',
  templateUrl: './map-3-d.html',
  styleUrl: './map-3-d.css'
})
export class Map3D implements AfterViewInit {
  private subscription!: Subscription;

  @ViewChild('viewDiv', { static: true }) viewDiv!: ElementRef<HTMLDivElement>;

  constructor(private satelliteService: SatelliteService) { }


  async ngAfterViewInit() {
    const satelliteLayer = new GraphicsLayer();
    const satelliteTracks = new GraphicsLayer();

    const map = new Map({
      basemap: 'satellite',
      layers: [satelliteLayer, satelliteTracks],
    });

    const view = new SceneView({
      container: this.viewDiv.nativeElement,
      map: map,
      constraints: {
        altitude: { max: 12000000000 },
      },
      popup: new Popup({ dockEnabled: true, dockOptions: { breakpoint: false } }),
      environment: { lighting: { type: 'virtual' } },
    });

    watch(() => view.popup?.selectedFeature, () => satelliteTracks.removeAll());

    view.popup?.on('trigger-action', (event) => {
      if (event.action.id === 'track') {
        satelliteTracks.removeAll();
        const graphic = view.popup?.selectedFeature;
        const trackFeatures: number[][] = [];

        for (let i = 0; i < 60 * 24; i++) {
          const loc = this.getSatelliteLocation(
            new Date(graphic?.attributes.time + i * 60 * 1000),
            graphic?.attributes.line1,
            graphic?.attributes.line2
          );
          if (loc) trackFeatures.push([loc.x, loc.y, loc.z]);
        }

        const track = new Graphic({
          geometry: { type: 'polyline', paths: [trackFeatures] },
          symbol: {
            type: 'line-3d',
            symbolLayers: [{ type: 'line', material: { color: [192, 192, 192, 0.5] }, size: 3 }],
          },
        });


        satelliteTracks.add(track);
      }
    });


    const tleUrl = 'https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/brightest.txt';
    console.log('Loaded base satellites!');

    this.subscription = this.satelliteService.satellites$.subscribe(satellites => {
      
      console.log('Received satellites:', satellites);

      satelliteLayer.removeAll();
      satelliteTracks.removeAll();

      for (let sat of satellites) {
        const time = Date.now();

        const designator = sat.line1.substring(9, 16);
        const launchYear = Number(designator.substring(0, 2)) >= 57 ? `19${designator.substring(0, 2)}` : `20${designator.substring(0, 2)}`;
        const launchNum = Number(designator.substring(2, 5)).toString();
        const noradId = Number(sat.line1.substring(2, 7));

        const loc = this.getSatelliteLocation(new Date(time), sat.line1, sat.line2);
        if (!loc) continue;

        const popupTemplate = {
          title: '{name}',
          content: 'Launch number {number} of {year}',
        };

        satelliteLayer.add(
          new Graphic({
            geometry: loc,
            symbol: {
              type: 'picture-marker',
              url: 'https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png',
              width: 48,
              height: 48,
            },
            attributes: { name: sat.name, line1: sat.line1, line2: sat.line2, time, year: launchYear, number: launchNum, id: noradId },
            popupTemplate,
          })
        );

        const trackCoords: number[][] = [];
        const days = 15;
        for (let j = 0; j < days * 24; j++) {
          const futureDate = new Date(time + j * days * 1000);
          const futureLoc = this.getSatelliteLocation(futureDate, sat.line1, sat.line2);
          if (futureLoc) {
            trackCoords.push([futureLoc.x, futureLoc.y, futureLoc.z]);
          }
        }

        const trackLine = new Graphic({
          geometry: {
            type: 'polyline',
            paths: [trackCoords],
          },
          symbol: {
            type: 'line-3d',
            symbolLayers: [{
              type: 'line',
              material: { color: [192, 192, 192, 0.5] },
              size: 2
            }]
          }
        });

        satelliteTracks.add(trackLine);

      }
    });

    await this.satelliteService.loadBaseSatellites(tleUrl);

  }

  getSatelliteLocation(date: Date, line1: string, line2: string) {
    try {
      const satrec = satellite.twoline2satrec(line1, line2);
      const positionAndVelocity = satellite.propagate(
        satrec,
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );

      if (!positionAndVelocity || !positionAndVelocity.position) {
        return null;
      }

      const position = positionAndVelocity.position;
      const gmst = satellite.gstime(date);
      const positionGd = satellite.eciToGeodetic(position, gmst);
      const rad2deg = 180 / Math.PI;
      return {
        type: "point" as const,
        x: rad2deg * positionGd.longitude,
        y: rad2deg * positionGd.latitude,
        z: positionGd.height * 1000,
      };
    } catch {
      return null;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
