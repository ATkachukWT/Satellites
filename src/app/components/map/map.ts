import { Component, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { PositionService } from '../../services/position';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit, OnChanges {
  positions: any[] = [];
  @Input() highlighted: any | null = null;

  private view: MapView | null = null;
  private graphicsLayer = new GraphicsLayer();

  constructor(private positionService: PositionService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    const map = new Map({
      basemap: 'satellite',
      layers: [this.graphicsLayer]
    });

    this.view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [0, 0],
      zoom: 2,
      popupEnabled: true
    });

    this.positionService.getPositions().subscribe(data => {
      this.positions = [...data];
      this.cdRef.detectChanges();
      this.updateGraphics();
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlighted'] && this.positions?.length > 0) {
      console.log('ngOnChanges called', changes);
      this.updateGraphics();
    }
  }

  private updateGraphics() {
    this.graphicsLayer.removeAll();

    
    this.positions.forEach((data, index) => {
      const point = new Point({
        longitude: parseFloat(data.longitude),
        latitude: parseFloat(data.latitude)
      });

      const isHovered = this.highlighted === data;
      const isLatest = index === 0;

      let symbol;

      if (isHovered) {
        symbol = new SimpleMarkerSymbol({
          color: [255, 255, 0],
          size: "14px",
          outline: { color: [255, 255, 255], width: 2 }
        });
      } else if (isLatest) {
        symbol = new PictureMarkerSymbol({
          url: "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
          width: "36px",
          height: "36px"
        });
      } else {
        symbol = new SimpleMarkerSymbol({
          color: [0, 122, 255],
          size: "10px",
          outline: { color: [255, 255, 255], width: 1 }
        });
      }

      const popupTemplate = new PopupTemplate({
        title: `ISS Position ${isLatest ? '(Latest)' : `#${index + 1}`}`,
        content: `
          <div style="padding: 10px;">
            <p><strong>Posizione:</strong></p>
            <p>Latitudine: ${data.latitude}°</p>
            <p>Longitudine: ${data.longitude}°</p>
            <p><strong>Data:</strong> ${data.time}</p>
            ${isLatest ? '<p><em>Posizione più recente</em></p>' : ''}
          </div>
        `
      });

      const graphic = new Graphic({
        geometry: point,
        symbol: symbol,
        popupTemplate: popupTemplate,
        attributes: {
          index: index,
          isLatest: isLatest,
        }
      });

      this.graphicsLayer.add(graphic);

      // if (this.view && this.view.popup) {
      //   this.view.popup.open({
      //     location: point,
      //     title: `ISS Position ${isLatest ? '(Latest)' : `#${index + 1}`}`,
      //     content: `<p>Latitudine: ${data.latitude}°</p> <p>Longitudine: ${data.longitude}°</p>`
      //   });
      // }
    });

    // Add the polyline
    // const polylineGraphic = new Graphic({
    //   geometry: {
    //     type: "polyline",
    //     paths: path
    //   },
    //   symbol: {
    //     type: "simple-line",
    //     color: [226, 119, 40],
    //     width: 4
    //   },
    //   attributes: {
    //     Name: "ISS Path",
    //     Owner: "Space",
    //     Length: `27593 km/h`
    //   },
    //   popupTemplate: {
    //     title: "{Name}",
    //     content: [{
    //       type: "fields",
    //       fieldInfos: [
    //         { fieldName: "Name" },
    //         { fieldName: "Owner" },
    //         { fieldName: "Length" }
    //       ]
    //     }]
    //   }
    // });

    // this.graphicsLayer.add(polylineGraphic);

    // Center the view on the latest position

    const latest = this.positions[0];

    if (latest) {
      this.view?.goTo({
        center: [parseFloat(latest.longitude), parseFloat(latest.latitude)],
        zoom: 3
      }).catch(err => console.error("GoTo error:", err));
    }


  }


}
