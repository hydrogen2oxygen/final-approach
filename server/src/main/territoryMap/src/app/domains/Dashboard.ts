export class Dashboard {
  uuid:string='';
  territories:TerritoryInfos[]=[];
}

export class TerritoryInfos {
  uuid:string='';
  number:string='';
  name:string='';
  assignDate:Date|undefined;
  returnDate:Date|undefined;
  registerRequest:Date|undefined;
  returnRequest:Date|undefined;
  simpleFeatureData: string = '';
}
