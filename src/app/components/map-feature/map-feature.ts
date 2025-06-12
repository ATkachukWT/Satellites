import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { PositionService } from '../../services/position';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'app-map-feature',
  templateUrl: './map-feature.html',
  styleUrl: './map-feature.css'
})
export class MapFeature implements OnInit, OnChanges {
  positions: any[] = [];
  map: Map | null = null;
  @Input() highlighted: any | null = null;

  private view: MapView | null = null;
  private featureLayer: FeatureLayer | null = null;

  constructor(private positionService: PositionService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeMap();
    this.loadPositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlighted'] && this.positions?.length > 0) {
      this.updateGraphics();
    }
  }

  private initializeMap() {
    this.map = new Map({ basemap: 'satellite' });

    this.view = new MapView({
      container: 'viewDiv',
      map: this.map,
      center: [0, 0],
      zoom: 2,
      popupEnabled: true
    });
  }

  private loadPositions() {
    this.positionService.getPositions().subscribe(data => {
      this.positions = [...data];
      this.cdRef.detectChanges();
      this.createFeatureLayer();
    });
  }

  private createFeatureLayer() {
    if (this.featureLayer) {
      this.map?.remove(this.featureLayer);
    }

    const graphics = this.createGraphicsFromPositions();

    const fields: __esri.FieldProperties[] = [
      { name: "ObjectID", alias: "ID", type: "oid" },
      { name: "latitude", alias: "Latitude", type: "double" },
      { name: "longitude", alias: "Longitude", type: "double" },
      { name: "formatted", alias: "Date", type: "string" },
      { name: "symbolType", alias: "Symbol Type", type: "string" }
    ];

    this.featureLayer = new FeatureLayer({
      source: graphics,
      fields,
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      title: "ISS Positions",
      renderer: {
        type: "unique-value",
        field: "symbolType",
        uniqueValueInfos: [
          {
            value: "latest",
            symbol: new PictureMarkerSymbol({
              url: "/satellite.svg",
              width: "24px",
              height: "24px"
            })
          },
          {
            value: "highlighted",
            symbol: new SimpleMarkerSymbol({
              color: [255, 255, 0],
              size: "14px",
              outline: { color: [255, 255, 255], width: 2 }
            })
          },
          {
            value: "normal",
            symbol: new SimpleMarkerSymbol({
              color: [0, 122, 255],
              size: "10px",
              outline: { color: [255, 255, 255], width: 1 }
            })
          }
        ]
      },
      popupTemplate: new PopupTemplate({
        title: "ISS Position",
        content: `
          <div style="padding: 10px;">
            <p><strong>Latitude:</strong> {latitude}&#176;</p>
            <p><strong>Longitude:</strong> {longitude}&#176;</p>
            <p><strong>Date:</strong> {formatted}</p>
          </div>
        `
      })
    });

    this.map?.add(this.featureLayer);
    this.goToLatestPosition();
  }

  private createGraphicsFromPositions(): Graphic[] {
    return this.positions.map((data, index) => {
      const point = new Point({
        longitude: parseFloat(data.longitude),
        latitude: parseFloat(data.latitude)
      });

      const isLatest = index === 0;
      const isHighlighted = this.highlighted?.time === data.time;

      let symbolType = "normal";
      if (isLatest) symbolType = "latest";
      if (isHighlighted) symbolType = "highlighted";

      return new Graphic({
        geometry: point,
        attributes: {
          ObjectID: index + 1,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          formatted: data.time,
          symbolType
        }
      });
    });
  }

  private updateGraphics() {
    if (!this.featureLayer || !this.positions.length) return;

    const updatedGraphics = this.createGraphicsFromPositions();

    this.featureLayer.applyEdits({
      deleteFeatures: this.featureLayer.source.toArray(),
      addFeatures: updatedGraphics
    }).catch(err => console.error("ApplyEdits error:", err));
  }

  private goToLatestPosition() {
    const latest = this.positions[0];
    if (latest && this.view) {
      this.view.goTo({
        center: [parseFloat(latest.longitude), parseFloat(latest.latitude)],
        zoom: 3
      }).catch(err => console.error("GoTo error:", err));
    }
  }

  public highlightPosition(position: any) {
    this.highlighted = position;
    this.updateGraphics();

    if (position && this.view) {
      this.view.goTo({
        center: [parseFloat(position.longitude), parseFloat(position.latitude)],
        zoom: 5
      }).catch(err => console.error("GoTo error:", err));
    }
  }

  public clearHighlight() {
    this.highlighted = null;
    this.updateGraphics();
  }
}
