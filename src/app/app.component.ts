import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from './services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'optio-natia';
  displayedColumns: string[] = ['image', 'name', 'active', 'zoneId', 'startDate', 'endDate', 'labels'];

  bannersData = null;

  channelsData: any = [];

  zoneData: any = [];

  languageData: any = [];

  labelData: any = [];

  bannerForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.bannerForm = this.fb.group({
      id: [null],
      image: [null, Validators.required],
      name: [null, Validators.required],
      active: [null, Validators.required],
      zoneId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      labels: [null],
      channelId: [null, Validators.required],
      language: [null, Validators.required],
      priority: [null, Validators.required],
      url: [null, Validators.required],
      

    })


    this.fetchBannersData()

    this.fetchChannels()

    this.fetchZones()

    this.fetchLanguages()

    this.fetchLabels()

  }


  submit() {
    console.log(this.bannerForm.value);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  private fetchBannersData(): void {
    const url = 'https://development.api.optio.ai/api/v2/banners/find'
    const data = {
      pageIndex: 0,
      pageSize: 20,

    }
    this.httpService.post(url, data).subscribe((response) => {
      this.bannersData = response?.data?.entities
    })
  }

  private fetchSingleBannerData(bannerId: string): void {
    const url = 'https://development.api.optio.ai/api/v2/banners/find-one'
    const data = {
      id: bannerId,

    }
    this.httpService.post(url, data).subscribe((response) => {
      this.bannerForm.patchValue(response?.data)
    })
  }

  private fetchChannels(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Channels).subscribe((response) => {
      this.channelsData = response?.data?.entities

    })
  }

  private fetchZones(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Zones).subscribe((response) => {
      this.zoneData = response?.data?.entities

    })
  }

  private fetchLanguages(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Languages).subscribe((response) => {
      this.languageData = response?.data?.entities

    })
  }

  private fetchLabels(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Labels).subscribe((response) => {
      this.labelData = response?.data?.entities

    })
  }

  

  private fetchReferenceDatas(referenceDataId: ReferenceDatasEnum): Observable<any> {
    const url = 'https://development.api.optio.ai/api/v2/reference-data/find';
    const data = {
      typeId: referenceDataId
    }

    return this.httpService.post(url, data)
  }

  editBanner(bannerId: string) {
    this.fetchSingleBannerData(bannerId);
  }

}

export interface PeriodicElement {
  id: number;
  image: string;
  name: string;
  active: boolean;
  zoneId: number;
  startDate: string;
  endDate: string;
  labels: string[];
  

}

enum ReferenceDatasEnum{
  Channels = 1600,
  Zones = 1700,
  Labels = 1900,
  Languages = 2900
}

