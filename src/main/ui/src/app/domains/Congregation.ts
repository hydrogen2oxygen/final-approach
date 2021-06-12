export class Congregation {
  lastUpdate:Date = new Date();
  territoryList:Territory[] = [];
  preacherList:Preacher[] = [];
}

export class Preacher {
  name:string = '';
  territoryListNumbers:number[] = [];
  group:string[] = [];
  softdelete:boolean = false;
  harddelete:boolean = false;
  showPreacherActions:boolean = false;
  css:string = ""
}

export class Territory {
  number: number = 0;
  name:string = '';
  date:Date = new Date();
  registryEntryList:RegistryEntry[] = [];
  notes:string[]=[];
  noContacts:boolean=false;
  archive:boolean=false;
  url:string|undefined='';
  uuid:string|undefined;
  newPreacherAssigned:boolean=false;
}

export class RegistryEntry {
  territoryNumber:number = 0;
  territoryName:string = "";
  preacher:Preacher = new Preacher();
  assignDate:Date = new Date();
  returnDate:Date | null = new Date();
  territory:Territory = new Territory();
}
