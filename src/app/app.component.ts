import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'optio-natia';
  displayedColumns: string[] = ['id', 'image', 'title', 'status', 'zoneId', 'startDate', 'endDate', 'labels'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}

export interface PeriodicElement {
  id: number;
  image: string;
  title: string;
  status: string;
  zoneId: number;
  startDate: string;
  endDate: string;
  labels: string[];
  

}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, image: 'Hydrogen', title: 'Banner 1', status: 'H', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll', 'social']},
  {id: 2, image: 'Helium', title: 'Banner 1', status: 'He', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 3, image: 'Lithium', title: 'Banner 1', status: 'Li', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 4, image: 'Beryllium', title: 'Banner 1', status: 'Be', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 5, image: 'Boron', title: 'Banner 1', status: 'B', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 6, image: 'Carbon', title: 'Banner 1', status: 'C', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 7, image: 'Nitrogen', title: 'Banner 1', status: 'N', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 8, image: 'Oxygen', title: 'Banner 1', status: 'O', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 9, image: 'Fluorine', title: 'Banner 1', status: 'F', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 10, image: 'Neon', title: 'Banner 1', status: 'Ne', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 11, image: 'Sodium', title: 'Banner 1', status: 'Na', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 12, image: 'Magnesium', title: 'Banner 1', status: 'Mg', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 13, image: 'Aluminum', title: 'Banner 1', status: 'Al', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 14, image: 'Silicon', title: 'Banner 1', status: 'Si', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 15, image: 'Phosphorus', title: 'Banner 1', status: 'P', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 16, image: 'Sulfur', title: 'Banner 1', status: 'S', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 17, image: 'Chlorine', title: 'Banner 1', status: 'Cl', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 18, image: 'Argon', title: 'Banner 1', status: 'Ar', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 19, image: 'Potassium', title: 'Banner 1', status: 'K', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
  {id: 20, image: 'Calcium', title: 'Banner 1', status: 'Ca', zoneId: 1, startDate: '1', endDate: '2', labels: ['payroll']},
];
