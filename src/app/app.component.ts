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
  constructor(private http: HttpClient, private covidService: CovidService) {}
  denemeDataModel;

  onKeyDownEvent(data) {
   this.denemeDataModel = data.target.value;
   if(data.target.value > 10){
    this.denemeDataModel = 11;
   }
  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  dataArray = new Array<Data>();
  saleData = [{ name: '', value: 0 }];
  saleData2 = [{ name: '', value: 0 }];
  saleData4 = [{ name: '', value: 0 }];
  saleData3 = [];
  countryTurkey: string = 'turkey';
  country: string = '';
  errorProvider = "No data for this country";
  errorProviderBool = false;
  view = [1000,400];

  ngOnInit(): void {
    this.view = [window.innerWidth / 1.35, 400];
    this.covidService.getCountry().subscribe((data) => {
      this.saleData3 = data;
    });
    this.covidService.getData().subscribe((data) => {
      // this.saleData = [{confirmed: , deaths:0 , recovered:0}];
      console.log(data, 'CONFİRMED');
      this.saleData = [
        { name: 'Global Onaylanan Sayısı', value: data.TotalConfirmed },
        { name: 'Global Ölüm Sayısı', value: data.TotalDeaths },
        { name: 'Global İyileşen Sayısı', value: data.TotalRecovered },
      ];
      console.log(this.saleData);
    });

    this.covidService.getDataTurkey(this.countryTurkey).subscribe((data) => {
      this.saleData2 = [
        {
          name: 'Türkiye Onaylanan Sayısı',
          value: data[data.length - 1].Confirmed,
        },
        { name: 'Türkiye Ölüm Sayısı', value: data[data.length - 1].Deaths },
        { name: 'Türkiye Aktif Sayısı', value: data[data.length - 1].Active },
        {
          name: 'Türkiye İyileşen Sayısı',
          value: data[data.length - 1].Recovered,
        },
      ];
    });
    console.log(this.saleData2, 'deneme');
  }

  countryFunc(item, itemCount) {
    this.country = itemCount;
    this.covidService.getDataTurkey(item).subscribe((data) => {
      console.log(data.length,"ARRAY LENGTH");
      if(data != [] && data != null && data.length != 0){
        console.log(data,"RESPONSE DATA IF");
        this.saleData4 = [
          {
            name: 'Onaylanan Sayısı',
            value: data[data.length - 1].Confirmed,
          },
          { name: 'Ölüm Sayısı', value: data[data.length - 1].Deaths },
          { name: 'Aktif Sayısı', value: data[data.length - 1].Active },
          {
            name: 'İyileşen Sayısı',
            value: data[data.length - 1].Recovered,
          },
        ];
        this.errorProviderBool = false;
      }else{
        this.saleData4 = [
          {
            name: 'Onaylanan Sayısı',
            value: 0,
          },
          { name: 'Ölüm Sayısı', value: 0 },
          { name: 'Aktif Sayısı', value: 0 },
          {
            name: 'İyileşen Sayısı',
            value: 0,
          },
        ];
        this.errorProviderBool = true;
      }

    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
