import {Component, OnInit} from '@angular/core';
import olMap from "ol/Map";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke, Style, Text} from "ol/style";
import {WKT} from "ol/format";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {TerritoryData} from "../../domains/TerritoryData";
import {Extent} from "ol/extent";
import {FormControl} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StreetsOverviewComponent} from "../streets-overview/streets-overview.component";
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "angular-web-storage";
import {Feature, Geolocation} from "ol";
import {Coordinate} from "ol/coordinate";
import {toLonLat} from "ol/proj";
import CircleStyle from "ol/style/Circle";
import {Point} from "ol/geom";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  id: string = '';
  dashboardMode:boolean = false;
  extent: Extent | undefined = undefined;
  map: olMap | null = null;
  view: View = new View();
  source = new VectorSource();
  osmLayer = new TileLayer();
  opnvLayer = new TileLayer();
  bingLayer = new TileLayer();
  vectorLayer = new VectorLayer();
  wktFormat = new WKT();
  territoryData: TerritoryData = new TerritoryData(undefined);
  message: string | undefined;
  showMenu: boolean = false;

  showButtons: boolean = false;
  showMessageDialog: boolean = false;
  textMessage = new FormControl('');
  dynamicUrl: string = '';
  currentLayer: string = 'OSM';
  geoLocation: Geolocation | undefined;
  positionFeature = new Feature();
  accuracyFeature = new Feature();
  tracking:boolean = false;
  howOld:number = 0;

  styleRedOutline: Style = new Style({
    fill: new Fill({
      color: [0, 0, 0, 0.1]
    }),
    stroke: new Stroke({
      color: [255, 0, 0, 0.5],
      width: 5
    }),
    text: new Text({
      text: '',
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: '#000',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3,
      }),
    })
  });



  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private title: Title,
    private local: LocalStorageService
  ) {
  }

  ngOnInit(): void {

    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    this.osmLayer = new TileLayer({
      source: new OSM(),
    });
    // @ts-ignore
    this.osmLayer.getSource().setAttributions([]);
    this.source.addFeature(this.positionFeature);
    this.source.addFeature(this.accuracyFeature);
    let that = this;

    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: function (feature: any) {
        let style = that.styleRedOutline;
        // @ts-ignore
        if (that.map.getView().getZoom() > 10) {
          style.getText().setText(feature.get('name'));
        } else {
          style.getText().setText('');
        }
        return style;
      }
    });

    this.opnvLayer = new TileLayer({
      source: new XYZ({
        url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png'
      })
    });

    this.view = new View({
      center: [-472202, 7530279],
      zoom: 12
    });
    this.map = new olMap({
      layers: [
        this.osmLayer,
        this.vectorLayer
      ],
      view: this.view,
      controls: []
    });

    this.map?.setTarget('map');

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        if (this.id.startsWith("dashboard")) {
          this.dashboardMode = true;
          this.loadDashboardData(this.id)
        } else {
          this.loadTerritoryData(this.id);
        }
      }

      if (params['message']) {
        this.message = params['message'];
      }
    });
  }

  private loadDashboardData(uuid:string) {
    this.dataService.loadDashboardData(uuid).subscribe( dashboard => {
      dashboard.territories.forEach(terr => {
        console.log(terr)
        if (terr.simpleFeatureData != null) {
          this.readTerritoryMap(terr.number, terr.name, terr.simpleFeatureData);
        }
      })
      this.extent = this.source.getExtent();
      this.map?.getView().fit(this.extent);
      this.map?.getView().setZoom(13)
      this.title.setTitle('DASHBOARD TERRITORIES');
    })
  }

  private loadTerritoryData(uuid:string) {

    this.dataService.loadTerritoryData(uuid).subscribe(territoryData => {

      console.log(territoryData)
      this.territoryData = new TerritoryData(territoryData);

      if (!this.territoryData.active) {
        this.map = null;
        return;
      }

      if (territoryData.simpleFeatureData != null) {
        this.readTerritoryMap(territoryData.number, territoryData.name, territoryData.simpleFeatureData);
      } else if (territoryData.territories.length > 0) {
        this.title.setTitle(territoryData.name);

        territoryData.territories.forEach(t => {
          let feature = this.wktFormat.readFeature(t.simpleFeatureData, {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          });

          feature.set('number', t.number);
          feature.set('name', t.number + ' ' + t.name);
          feature.setId(t.number);
          this.source.addFeature(feature);
        });
      }

      const today = new Date();
      const assigned = new Date(territoryData.assignDate)
      // Calculate the difference in milliseconds
      const diffTime = today.getTime() - assigned.getTime();
      // Convert milliseconds to days
      this.howOld = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      this.extent = this.source.getExtent();
      this.map?.getView().fit(this.extent);
      this.map?.getView().setZoom(16)
    });
  }

  private readTerritoryMap(number:string,name:string,simpleFeatureData:string) {
    let feature = this.wktFormat.readFeature(simpleFeatureData, {
      dataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3857'
    });

    feature.set('number', number);
    feature.set('name', number + ' ' + name);
    feature.setId(number);
    this.source.addFeature(feature);
    this.title.setTitle(number + ' ' + name);

    this.territoryData.streetList.forEach(street => {
      let value: boolean = this.local.get(this.territoryData.number + ' ' + street.streetName);
      if (value == null) value = false;
      street.checked = value;
    });
  }

  removeMessage() {
    this.message = undefined;
  }

  switchMenu() {
    this.showMenu = !this.showMenu;
  }

  openMessageDialog() {
    this.showMessageDialog = !this.showMessageDialog;
  }

  generateMessageLink() {
    // FIXME read HOST value from settings
    let link = encodeURI(`https://HOST/map?id=${this.id}%26%0Amessage=${this.textMessage.value}`);
    this.dynamicUrl = `https://wa.me?text=${link}`;
    console.log(link)
  }

  openStreetsOverview() {
    const modalRef = this.modalService.open(StreetsOverviewComponent);
    modalRef.componentInstance.territoryData = this.territoryData;
    modalRef.componentInstance.calculateDate();

    modalRef.closed.subscribe((e: string) => {
      if (e != 'Close click') return;

      //territory.noContacts = modalRef.componentInstance.noContacts.value;

      /* this.congregationService.saveCongregation(this.congregation).subscribe(c => {
         this.congregation = c;
         this.collectLastRegistryEntries();
       })*/
    });
  }

  centerMap() {
    if (this.extent != undefined) {
      this.map?.getView().fit(this.extent);
    }
  }

  switchLayer() {

    if (this.currentLayer == 'OSM') {
      this.currentLayer = 'OPNV';
      this.map?.removeLayer(this.vectorLayer);
      this.map?.removeLayer(this.osmLayer);
      this.map?.addLayer(this.opnvLayer);
      this.map?.addLayer(this.vectorLayer);
    } else {
      this.currentLayer = 'OSM';
      this.map?.removeLayer(this.vectorLayer);
      this.map?.removeLayer(this.opnvLayer);
      this.map?.addLayer(this.osmLayer);
      this.map?.addLayer(this.vectorLayer);
    }

    /*if (this.currentLayer == 'OSM') {
      this.currentLayer = 'OPN';
      this.map?.addLayer(this.opnvLayer);
      this.map?.removeLayer(this.osmLayer);
    } else if (this.currentLayer == 'OPN') {
      this.currentLayer = 'BING';
      this.map?.addLayer(this.bingLayer);
      this.map?.removeLayer(this.opnvLayer);
    } else {
      this.currentLayer = 'OSM';
      this.map?.addLayer(this.osmLayer);
      this.map?.removeLayer(this.bingLayer);
    }*/
  }

  getCoordinates(coordinates: number[] | undefined): Coordinate {
    if (coordinates == undefined) return [0, 0];
    return toLonLat(coordinates)
  }

  centerGeoLocation() {
    if (!this.geoLocation && this.map) {

      console.log("init geolocation ...")

      this.geoLocation = new Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.map.getView().getProjection(),
      });

      this.geoLocation.on('change:position', () => {
        if (this.geoLocation) {
          this.setCurrentPositionPoint(this.geoLocation.getPosition())
          this.setCurrentAccuracyGeometry(this.geoLocation.getAccuracyGeometry());
        }
      });

    }

    if (this.geoLocation) {
      this.getCenterAndPosition();
      this.geoLocation.setTracking(true);
      this.tracking = true;
    }
  }

  getCenterAndPosition() {
    if (this.geoLocation) {
      this.setCurrentPositionPoint(this.geoLocation.getPosition())
      this.setCurrentAccuracyGeometry(this.geoLocation.getAccuracyGeometry());
    }
  }

  setCurrentPositionPoint(currentPos:any) {
    if (currentPos) {
      this.positionFeature.setGeometry(new Point(currentPos));
      this.map?.getView().setCenter(currentPos);
    }
  }

  setCurrentAccuracyGeometry(accuracy:any) {
    if (accuracy) {
      this.accuracyFeature.setGeometry(accuracy);
    }
  }

  stopTracking() {
    this.tracking = false;
    if (this.geoLocation) {
      this.geoLocation.setTracking(false);
    }

    if (this.extent) {
      this.map?.getView().fit(this.extent);
    }
  }

  switchButtons() {
    this.showButtons = !this.showButtons;
  }

  getAssignDateStyle() {
    // Define transition points
    const green = [0, 255, 0];       // Start: Bright Green
    const yellow = [255, 255, 0];     // 4 Months: Yellow
    const orange = [255, 165, 0];     // 8 Months: Orange
    const red = [255, 0, 0];          // 1 Year: Red

    let color: number[];

    if (this.howOld < 120) {
      // Green to Yellow (0 - 120 days)
      color = this.interpolateColor(green, yellow, this.howOld / 120);
    } else if (this.howOld < 240) {
      // Yellow to Orange (120 - 240 days)
      color = this.interpolateColor(yellow, orange, (this.howOld - 120) / 120);
    } else if (this.howOld < 365) {
      // Orange to Red (240 - 365 days)
      color = this.interpolateColor(orange, red, (this.howOld - 240) / 125);
    } else {
      // Beyond 1 year: Stay Red
      color = red;
    }

    // Font size logic: starts at 16px, increases 1px per week after 365 days
    let fontSize = 16; // Base size
    let bolder = ""
    if (this.howOld > 365) {
      fontSize += Math.floor((this.howOld - 365) / 7);
    }

    if (fontSize > 80) {
      fontSize = 80
      bolder = ";fontWeight: bolder"
    }

    return `color: rgb(${color[0]}, ${color[1]}, ${color[2]})!important; fontSize: ${fontSize}px${bolder}`;
  }

  // Color interpolation function
  interpolateColor(start: number[], end: number[], factor: number): number[] {
      return start.map((s, i) => Math.round(s + (end[i] - s) * factor));
  }
}
