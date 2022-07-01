export class Congregation {
  lastUpdate:Date = new Date();
  territoryList:Territory[] = [];
  territoriesNoContacts:Territory[] = [];
  territoriesOlder8Months:Territory[] = [];
  territoriesOlder4Months:Territory[] = [];
  territoriesAssigned:Territory[] = [];
  territoriesToBeAssigned:Territory[] = [];
  territoriesArchived:Territory[] = [];
  preacherList:Preacher[] = [];
}

export class Preacher {
  name:string = '';
  territoryListNumbers:string[] = [];
  group:string[] = [];
  softdelete:boolean = false;
  harddelete:boolean = false;
  showPreacherActions:boolean = false;
  css:string = ""
}

export class Territory {
  number: string = '';
  name:string = '';
  date:Date = new Date();
  registryEntryList:RegistryEntry[] = [];
  notes:string[]=[];
  noContacts:boolean=false;
  archive:boolean=false;
  url:string | null='';
  uuid:string|undefined;
  newPreacherAssigned:boolean=false;
  ftpExported:boolean=false;
  ftpDeactived:boolean=false;
}

export class RegistryEntry {
  territoryNumber:string = '';
  territoryName:string = '';
  preacher:Preacher = new Preacher();
  assignDate:Date = new Date();
  returnDate:Date | null = new Date();
  territory:Territory = new Territory();
}

export class Version {
  revision:string = '';
  counterTerritories:number = 0;
  counterPreachers:number = 0;
  counterPreacherWithTerritories:number = 0;
}
