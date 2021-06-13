import { Component, OnInit } from '@angular/core';
import { VerifyRes } from '../interfaces/verify.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['phone', 'validity', 'country_code', 'Date Validated'];
  dataSource: VerifyRes[];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getHistory().subscribe((data: VerifyRes[]) => {
      this.dataSource = data;
    })
  }

}
