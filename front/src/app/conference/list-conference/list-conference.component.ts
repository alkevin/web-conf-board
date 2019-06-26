import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference.model';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ConferenceService } from './../../shared/services/conference.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'ak-list-conference',
  templateUrl: './list-conference.component.html',
  styleUrls: ['./list-conference.component.scss']
})
export class ListConferenceComponent implements OnInit, AfterViewInit {

  public CONFERENCE_API = 'http://localhost:8080/conferences/';

  conferences: Conference[];

  sub: Subscription;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Conference>();
  public displayedColumns = ['accordion'];

  constructor(private conferenceService: ConferenceService, private router: Router, private errorService: ErrorHandlerService ) { }

  ngOnInit() {
    this.conferenceService.getAll().subscribe(data => {
      if (data) {
        console.log(data);
        this.conferences = data as Conference[];
        this.dataSource.data = data as Conference[];
        }
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  remove(conference: Conference) {
    conference.href = this.CONFERENCE_API + conference.id;
    this.conferenceService.remove(conference.href).subscribe(result => {
      this.conferenceService.getAll().subscribe(data => {
        this.conferences = data as Conference[];
        this.dataSource.data = data as Conference[];
      });
    }, error => console.error(error));
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  gotoList() {
    this.router.navigate(['/sinistre-list']);
  }

}