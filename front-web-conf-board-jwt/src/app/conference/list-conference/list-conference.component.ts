import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference.model';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ConferenceService } from './../../shared/services/conference.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'ak-list-conference',
  templateUrl: './list-conference.component.html',
  styleUrls: ['./list-conference.component.scss']
})
export class ListConferenceComponent implements OnInit, AfterViewInit {

  public CONFERENCE_API = 'http://localhost:8080/conferences/';

  conferences: Conference[];
  conferencesVoteLoad: boolean = null;
  sub: Subscription;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Conference>();
  public displayedColumns = ['accordion'];

  constructor(private route: ActivatedRoute, private router: Router
            , private conferenceService: ConferenceService, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.conferenceService.getAll().subscribe(data => {
      if (data) {
        console.log(data);
        this.conferences = data.result;
        this.dataSource.data = this.conferences as Conference[];
        }
      },
      (error) => {
        this.errorService.handleError(error);
      });
    }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  clickToutes() {
    this.conferencesVoteLoad = null;
    this.conferenceService.getAll().subscribe(data => {
      if (data) {
        console.log(data);
        this.conferences = data.result;
        this.dataSource.data = this.conferences as Conference[];
        }
      },
      (error) => {
        this.errorService.handleError(error);
      });
    }

  clickVote() {
    this.conferencesVoteLoad = true;
    const vote = this.conferencesVoteLoad;
    console.log(vote);
    this.conferenceService.getByVoted(vote).subscribe(data => {
      if (data) {
        this.conferences = data.result;
        console.log(data);
        this.dataSource.data = this.conferences as Conference[];
      }
    },
    (error) => {
      this.errorService.handleError(error);
    });
  }

  clickNonVote() {
    this.conferencesVoteLoad = false;
    const vote = this.conferencesVoteLoad;
    console.log(vote);
    this.conferenceService.getByVoted(vote).subscribe(data => {
      if (data) {
        console.log(data);
        this.conferences = data.result;
        this.dataSource.data = this.conferences as Conference[];
      }
    },
    (error) => {
      this.errorService.handleError(error);
    });
  }

  remove(conference: Conference) {
    conference.href = this.CONFERENCE_API + conference.id;
    this.conferenceService.remove(conference.href).subscribe(result => {
      this.conferenceService.getAll().subscribe(data => {
        this.conferences = data.result;
        this.dataSource.data = this.conferences as Conference[];
      });
    }, error => console.error(error));
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  gotoList() {
    this.router.navigate(['/list-conference']);
  }
}
