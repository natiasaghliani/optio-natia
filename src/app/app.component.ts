import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { HttpService } from './services/http.service';

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

  pageInfo = {
    pageIndex: 0,
    pageSize: 10,
  }

  totalPages = 0;

  sortInfo = {
    sortBy: "",
    sortDirection: "",
  }

  searchText: string = '';

  bannerForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.bannerForm = this.fb.group({
      id: [null],
      fileId: [null, Validators.required],
      name: [null, Validators.required],
      active: [false],
      zoneId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      labels: [null],
      channelId: [null, Validators.required],
      language: [null, Validators.required],
      priority: [null, Validators.required],
      url: [null, Validators.required],
    })

    this.fetchBannersData();
    this.fetchChannels();
    this.fetchZones();
    this.fetchLanguages();
    this.fetchLabels();
  }

  saveForm() {
    const url = 'https://development.api.optio.ai/api/v2/banners/save';

    this.httpService.post(url, this.bannerForm.value).subscribe((response) => {
      this.fetchBannersData();
      this.closeDrawer();
    })
  }

  private fetchBannersData(): void {
    const url = 'https://development.api.optio.ai/api/v2/banners/find'
    const data = {
      ...this.pageInfo,
      ...this.sortInfo,
      search: this.searchText
    }

    this.httpService.post(url, data).subscribe((response) => {
      this.bannersData = response?.data?.entities;
      this.totalPages = response?.data?.total;
    })
  }

  private fetchSingleBannerData(bannerId: string): void {
    const url = 'https://development.api.optio.ai/api/v2/banners/find-one'
    const data = {
      id: bannerId,
    }
  
    this.httpService.post(url, data).subscribe((response) => {
      this.bannerForm.patchValue(response?.data);
    })
  }

  private fetchChannels(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Channels).subscribe((response) => {
      this.channelsData = response?.data?.entities;
    })
  }

  private fetchZones(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Zones).subscribe((response) => {
      this.zoneData = response?.data?.entities;
    })
  }

  private fetchLanguages(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Languages).subscribe((response) => {
      this.languageData = response?.data?.entities;
    })
  }

  private fetchLabels(): void {
    this.fetchReferenceDatas(ReferenceDatasEnum.Labels).subscribe((response) => {
      this.labelData = response?.data?.entities;
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

  uploadImage(event: any): void {
    const formData = new FormData();
    const image = event?.target?.files?.[0];
    formData.set('blob', image);
    const url = 'https://development.api.optio.ai/api/v2/blob/upload';

    this.httpService.post(url, formData).subscribe((response) => {
      this.bannerForm.get('fileId')?.setValue(response?.data?.id)
    })

  }

  pageChange(event: any): void {
    this.pageInfo.pageIndex = event?.pageIndex;
    this.pageInfo.pageSize = event?.pageSize;
    this.fetchBannersData();
  }

  sortChange(event: any): void {
    this.sortInfo.sortBy = event?.active
    this.sortInfo.sortDirection = event?.direction
    this.fetchBannersData();
  }

  filterText(event: any): void {
    this.searchText = event?.target?.value;
    this.fetchBannersData()
  }

  drawerStateChange(open: boolean): void {
    if (!open) {
      this.bannerForm.reset();
    }
  }

  openDrawer(): void {
    this.drawer?.open();
  }

  closeDrawer(): void {
    this.drawer?.close();
  }

}

enum ReferenceDatasEnum {
  Channels = 1600,
  Zones = 1700,
  Labels = 1900,
  Languages = 2900
}

