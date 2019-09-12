import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-consent-management',
  templateUrl: './consent-management.component.html',
  styleUrls: ['./consent-management.component.css']
})
export class ConsentManagementComponent implements OnInit {

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.commonService.stopLoader();
  }

}
