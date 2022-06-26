export class MapDesign {
  coordinatesX:number = -472202;
  coordinatesY:number = 7530279;
  territoryMapList:TerritoryMap[] = [];
}

export class OsmStreet {
  coordinates:any[] = [];
  houseNumbers:string[] = [];
  streetName:string = '';
}

export class TerritoryMap {
  draft:boolean=true;
  territoryNumber:string='';
  territoryName:string='';
  simpleFeatureData:string='';
  simpleFeatureType:string='';
  note:string='';
  lastUpdate:Date=new Date();
  streetList:OsmStreet[] = [];
  url:string='';
}
