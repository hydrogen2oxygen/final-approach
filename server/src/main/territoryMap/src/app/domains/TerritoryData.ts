export class OsmStreet {
   coordinates:string[][] = [];
   houseNumbers:string[] = []
   houseNumberButtons:HouseNumber[] = [];
   streetName:string = '';
   showHouseNumbers:boolean=false;
   checked:boolean=false;

   constructor(s:any) {
     this.coordinates = s.coordinates;
     this.houseNumbers = s.houseNumbers;
     this.streetName = s.streetName;

     this.init();
   }

   init() {
     this.houseNumberButtons = [];
     this.houseNumbers.forEach( houseNumber => {
       let h = new HouseNumber();
       h.houseNumber = houseNumber;
       this.houseNumberButtons.push(h);
     })
   }
}

export class HouseNumber {
  houseNumber:string = '';
  selected:boolean = false;
}

export class TerritoryData {
  UUID:string = '';
  preacherUUID:string = '';
  simpleFeatureData: string = '';
  number: number = 0;
  name: string = '';
  notes: string = '';
  lastUpdate: Date = new Date();
  assignDate: Date = new Date();
  returnDate: Date = new Date();
  streetList: OsmStreet[] = [];
  active: boolean = true;
  territories:TerritoryData[] = [];

  constructor(t:any) {

    if (t == undefined) return;

    this.UUID = t.UUID;
    this.preacherUUID = t.preacherUUID;
    this.simpleFeatureData = t.simpleFeatureData;
    this.number = t.number;
    this.name = t.name;
    this.notes = t.notes;
    this.lastUpdate = t.lastUpdate;
    this.assignDate = t.assignDate;
    this.returnDate = t.returnDate;
    this.active = t.active;
    this.territories = t.territories;

    if (t.streetList == null) return;
    t.streetList.forEach( (street: any) => this.streetList.push(new OsmStreet(street)));
  }
}
