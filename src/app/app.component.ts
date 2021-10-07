import { Component, OnInit } from '@angular/core';
import { DataElement } from './models/dataElement';
import { Indicator } from './models/indicators';
import { OrgUnit } from './models/organizationUnit';
import { RestApiService } from './services/rest-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'metadata-web';

  dataElements: DataElement[] = [];
  indicators: Indicator[] = [];
  orgUnits: OrgUnit[] = [];

  isIndicator = false;
  isOrgUnit = false;
  isDataelement = true;


  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadDataElements()
    this.loadIndicators()
    this.loadOrgUnits()
  }

  // Get data element list
  loadDataElements() {
    return this.restApi.getDataElements().subscribe((data: any) => {
      console.log(data);
      this.dataElements = data.dataElements.map((dataItem: any) => {
        return dataItem;
      });
    })
  }

  loadIndicators() {
    return this.restApi.getIndicators().subscribe((data: any) => {
      this.indicators = data.indicators.map((data: any) => {
        return data;
      });
      console.log("indicators", this.indicators)
    })
  }

  loadOrgUnits() {
    return this.restApi.getOrganisationUnits().subscribe((data: any) => {
      this.orgUnits = data.organisationUnits.map((singledata: any) => {
        return singledata;
      });
      console.log("Org Unit", this.orgUnits)
    })
  }
  toggleDataElement() {
    this.isDataelement = true;
    this.isOrgUnit = false;
    this.isIndicator = false;
  }
   
  toggleIndicator(){
    this.isIndicator = true;
    this.isDataelement = false;
    this.isOrgUnit = false;
  }

  toggleOrgUnit(){
    this.isOrgUnit = true;
    this.isIndicator = false;
    this.isDataelement = false;
  }



}



