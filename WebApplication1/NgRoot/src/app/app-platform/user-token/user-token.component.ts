import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { CreateToken } from '../models/CreateToken';

@Component({
  selector: 'app-user-token',
  templateUrl: './user-token.component.html',
  styleUrls: ['./user-token.component.scss']
})
export class UserTokenComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(protected route: ActivatedRoute, protected dsfac: DataSourceFactory) {
    this.formGroup = new FormGroup({
      ExpireTime: new FormControl(null),
      UserId: new FormControl(null, Validators.required),
      AutoRenewDays: new FormControl(null),
      EncodedToken: new FormControl(null),
      Token: new FormControl()
    })
    this.route.params.subscribe(params => {
      this.formGroup.get('UserId').setValue(params['userid']);
    });
  }
  public createToken() {
    this.dsfac.getDataSource(CreateToken).create(this.formGroup.value).subscribe(token => {
      this.formGroup.get('Token').setValue(token.Token);
      this.formGroup.get('EncodedToken').setValue(encodeURIComponent(token.Token));
    });
  }
  ngOnInit() {
  }

}
