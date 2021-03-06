import {AfterViewInit, Component, OnInit} from '@angular/core';
import olMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';
import {FormControl} from "@angular/forms";
import {fromLonLat, toLonLat} from 'ol/proj';
import {Coordinate} from "ol/coordinate";
import {Draw, Modify, Select} from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style, Text} from "ol/style";
import {MapDesign, TerritoryMap} from "../../domains/MapDesign";
import {CongregationService} from "../../services/congregation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MapDesignService} from "../../services/map-design.service";
import {Congregation, Territory} from "../../domains/Congregation";
import {Geometry} from "ol/geom";
import {Feature} from "ol";
import {WKT} from "ol/format";
import {ToastrService} from "ngx-toastr";
import {Extent} from "ol/extent";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit, AfterViewInit {

  map: olMap | null = null;
  view: View = new View();
  coordinateX = new FormControl(48.6974947);
  coordinateY = new FormControl(9.1506559);
  source = new VectorSource();
  interaction: any = null;
  lastSelectedFeature:Feature | undefined = undefined;
  lastSelectedTerritoryMap:TerritoryMap | undefined = undefined;
  lastSavedTerritoryName:string = '';

  styleRedOutline:Style = new Style({
    fill: new Fill({
      color: [0,0,0,0.1]
    }),
    stroke: new Stroke({
      color: [255,0,0,0.5],
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

  styleRedOutlineActive:Style = new Style({
    fill: new Fill({
      color: [0,255,0,0.1]
    }),
    stroke: new Stroke({
      color: [0,100,0,0.5],
      width: 5
    }),
    text: new Text({
      text: '',
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: '#007700',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    })
  });

  mapDesign:MapDesign = new MapDesign();
  congregation:Congregation = new Congregation();
  note = new FormControl('');
  territoryNumber = new FormControl('');
  territoryCustomNumber = new FormControl('');
  territoryCustomName = new FormControl('');
  selectInteraction = new Select();
  wktFormat = new WKT();
  featureModified = false;
  modeSelected = '';

  constructor(
    private congregationService:CongregationService,
    private mapDesignService:MapDesignService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.congregationService.getCongregation().subscribe( c => this.congregation = c );

    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    osmLayer.getSource().setAttributions([]);

    let that = this;

    const vectorLayer = new VectorLayer({
      source: this.source,
      style: function(feature) {
        let style = that.styleRedOutline;

        if (feature.get('draft') == false) {
          style = that.styleRedOutlineActive;
        }

        // @ts-ignore
        if (that.map.getView().getZoom() > 14) {
          style.getText().setText(feature.get('name'));
        } else {
          style.getText().setText('');
        }
        return style;
      }
    });

    const xyzLayer = new TileLayer({
      source: new XYZ({
        url: 'http://tile.osm.org/{z}/{x}/{y}.png'
      })
    });

    this.view = new View({
      center: [-472202, 7530279],
      zoom: 12
    });
    this.map = new olMap({
      layers: [
        osmLayer,
        vectorLayer
      ],
      view: this.view,
      controls: []
    });

  }

  ngAfterViewInit(): void {
    this.map?.setTarget('map');
    this.map?.addInteraction(this.selectInteraction);

    this.selectInteraction.on('select', e => {
      if (e.deselected) {
        this.lastSelectedFeature = undefined;
        //return;
      }

      this.lastSelectedFeature = e.selected[0];
      this.territoryCustomNumber.setValue(this.lastSelectedFeature.get('territoryNumber'));
      this.territoryCustomName.setValue(this.lastSelectedFeature.get('territoryName'));

      this.mapDesign.territoryMapList.forEach( t => {
        if (t.territoryNumber == this.territoryCustomNumber.value) {
          this.lastSelectedTerritoryMap = t;
        }
      })
    });

    this.loadMap(true);
  }

  loadMap(centerView?:boolean) {

    this.source.clear();

    this.mapDesignService.getMapDesign().subscribe(mapDesign => {
      this.mapDesign = mapDesign;
      console.log(mapDesign);

      let format = new WKT();

      mapDesign.territoryMapList.forEach( territoryMap => {

        let feature = format.readFeature(territoryMap.simpleFeatureData,{
          dataProjection: 'EPSG:3857',
          featureProjection: 'EPSG:3857'
        });

        feature.set('territoryNumber', territoryMap.territoryNumber);
        feature.set('territoryName', territoryMap.territoryName);
        feature.set('name', '' + territoryMap.territoryNumber);
        feature.set('draft', territoryMap.draft);
        feature.setId(territoryMap.territoryNumber);
        this.source.addFeature(feature);
      })

      if (centerView) this.map?.getView().setCenter([this.mapDesign.coordinatesX,this.mapDesign.coordinatesY]);
      this.featureModified = false;
      this.modeSelected = '';
    })
  }

  saveMap() {

    if (this.territoryNumber.value.length == 0) {
      this.territoryNumber.setValue(this.territoryCustomNumber.value)
    }

    if (this.lastSelectedFeature != undefined) {
      this.lastSelectedFeature?.setProperties([{'territoryNumber': this.territoryNumber.value}]);

      let territoryMap = new TerritoryMap();
      territoryMap.draft = true;
      territoryMap.lastUpdate = new Date();
      territoryMap.territoryNumber = this.territoryNumber.value;
      territoryMap.territoryName = this.territoryCustomName.value;
      this.lastSavedTerritoryName = territoryMap.territoryNumber + ' ' + territoryMap.territoryName;
      let data = this.wktFormat.writeGeometry(<Geometry>this.lastSelectedFeature?.getGeometry());

      if (data == null || data == undefined) {
        data = '';
      }

      territoryMap.simpleFeatureData = data;
      this.mapDesign.territoryMapList.push(territoryMap);

      console.log(this.mapDesign);

      this.lastSelectedFeature = undefined;
    }

    this.mapDesignService.saveMapDesign(this.mapDesign).subscribe( m => {
      this.territoryNumber.setValue('');
      this.loadMap();
    })
  }

  setCoordinates() {
    let webMercatorCoordinates = fromLonLat([this.coordinateY.value, this.coordinateX.value]);
    this.map?.getView().setCenter(webMercatorCoordinates);
  }

  getCoordinates(coordinates: number[] | undefined): Coordinate {
    if (coordinates == undefined) return [0, 0];
    return toLonLat(coordinates)
  }

  drawPolygon() {
    this.territoryNumber.setValue('');
    this.addInteraction(GeometryType.POLYGON);
    this.modeSelected = 'polygon';
  }

  drawLine() {
    this.territoryNumber.setValue('');
    this.addInteraction(GeometryType.LINE_STRING);
    this.modeSelected = 'line';
  }

  drawPoint() {
    this.territoryNumber.setValue('');
    this.addInteraction(GeometryType.POINT);
    this.modeSelected = 'point';
  }

  editFeature() {

    if (this.interaction != null) {
      this.removeInteraction();
    }

    this.interaction = new Modify({
      source: this.source
    });

    let modify:Modify = this.interaction;

    modify.on('modifyend', evt => {

      let modifiedFeature = evt.features.getArray()[0];
      this.territoryCustomNumber.setValue(modifiedFeature.get('territoryNumber'));
      this.territoryCustomName.setValue(modifiedFeature.get('territoryName'));
      this.lastSavedTerritoryName = this.territoryCustomNumber.value + ' ' + this.territoryCustomName.value;

      this.mapDesign.territoryMapList.forEach( t => {
        if (t.territoryNumber == this.territoryCustomNumber.value) {
          let data = this.wktFormat.writeGeometry(<Geometry> modifiedFeature.getGeometry());
          t.simpleFeatureData = data;
          t.draft = true; // it remains a "draft" until you activate it
          t.lastUpdate = new Date();
          this.featureModified = true;
        }
      })

    });

    this.map?.addInteraction(this.interaction);
    this.modeSelected = 'edit';
  }

  setNavigateMode() {
    this.territoryNumber.setValue('');
    this.removeInteraction();
  }

  private addInteraction(type: GeometryType) {
    this.removeInteraction();
    this.interaction = new Draw({
      type: type,
      source: this.source
    });
    let draw:Draw = this.interaction;
    draw.on('drawend', evt => {
      console.log('draw ended');
      this.lastSelectedFeature = evt.feature;
    });

    this.map?.addInteraction(this.interaction);
    this.modeSelected = 'navigate';
  }

  private removeInteraction() {
    this.map?.removeInteraction(this.interaction);
    this.interaction = null;
  }

  setHomeCoordinates() {
    // @ts-ignore
    let center = this.map?.getView().getCenter();

    if (center != undefined) {
      this.mapDesign.coordinatesX = center[0];
      this.mapDesign.coordinatesY = center[1];
      this.mapDesignService.saveMapDesign(this.mapDesign).subscribe( m => {
        this.loadMap();
        this.toastr.info("New center was set!","Map Service")
      })
    }
  }

  deleteMap() {
    console.log(this.lastSelectedFeature?.get('number'));
    let territoryNumber = this.lastSelectedFeature?.get('number');
    this.mapDesignService.deleteTerritoryMap(territoryNumber).subscribe( data => {});
    this.loadMap();
  }

  setMapData(territory: Territory) {
    this.territoryCustomNumber.setValue(territory.number);
    this.territoryCustomName.setValue(territory.name);
  }

  exportKml() {
    this.mapDesignService.exportKml().subscribe( v => {
      this.toastr.info("KML(s) exported!","Map Service")
    });
  }

  importKml() {
    console.log('import.kml')
  }

  importStreetNames() {
    this.mapDesignService.importStreetNames().subscribe( v => {
      this.toastr.info("Street data imported from OSM","Map Service")
    });
  }

  setActive() {

    if (this.lastSelectedTerritoryMap != undefined) {

      console.log(this.lastSelectedTerritoryMap)

      this.mapDesign.territoryMapList.forEach( t => {
        if (t.territoryNumber == this.lastSelectedTerritoryMap?.territoryNumber) {
          t.draft = false;

          this.mapDesignService.saveMapDesign(this.mapDesign).subscribe( m => {
            this.territoryNumber.setValue('');
            this.loadMap();
          });
        }
      });

      let territoryNumber = this.lastSelectedTerritoryMap.territoryNumber;
      let territoryName = this.lastSelectedTerritoryMap.territoryName;

      this.mapDesignService.setActiveTerritory(territoryNumber,territoryName).subscribe( e => {
        this.toastr.success(territoryNumber + ' ' + territoryName + ' is now active!','Map Service');
        this.loadMap();
      })

      this.lastSelectedFeature = undefined;
      this.lastSelectedTerritoryMap = undefined;
    }
  }

  navigateToTerritoryMap(number:any) {
    let feature:Feature = this.source.getFeatureById(number);
    if (feature != undefined && feature.getGeometry() != undefined) {
      // @ts-ignore
      let extent: Extent = feature.getGeometry().getExtent();
      this.map?.getView().fit(extent);
    }
  }
}

