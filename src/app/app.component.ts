import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { HttpClient } from '@angular/common/http';
import { CovidService } from 'src/services/covid.service';
import { stringify, newArray } from '@angular/compiler/src/util';
import { Data } from './classes/data';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient, private covidService: CovidService) {
  
  }
  dataArray = new Array<Data>();
  saleData = [{name:'', value: 0 }];

  ngOnInit(): void {
    this.covidService.getData().subscribe((data) => {
      // this.saleData = [{confirmed: , deaths:0 , recovered:0}];
      console.log(data.TotalConfirmed,'CONFİRMED');
      this.saleData = [
        { name : 'Global Onaylanan Sayısı' , value :data.TotalConfirmed },
        { name : 'Global Ölüm Sayısı' , value :data.TotalDeaths },
        { name : 'Global İyileşen Sayısı' , value :data.TotalRecovered }
    ];

    });
  }


  // saleData = [
  //   { name: "Mobiles", value: 105000 ,data:1},
  //   { name: "Laptop", value: 55000 ,data:2},
  //   { name: "AC", value: 15000 ,data:3},
  //   { name: "Headset", value: 150000 ,data:4},
  //   { name: "Fridge", value: 20000 ,data:5}
  // ];
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C'],
  // };
// options





  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
