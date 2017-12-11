import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { SystemInfomation } from '../models/SystemInfomation';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { Identity } from '@boss/services/Identity';
import { Login } from '../models/Login';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import * as SHA512 from 'crypto-js/sha512';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginPasswordHash } from 'app/tokens';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public get systemAvaliable(): boolean { return this.systemInfomations && this.systemInfomations.length && this.systemInfomations.filter(x => x.SystemAvaliable).length > 0; }
  public loginForm: FormGroup;
  public systemInfomations: SystemInfomation[];
  public get systemInfomation(): SystemInfomation {
    if (!this.loginForm || !this.systemInfomations) {
      return null;
    }
    return this.systemInfomations.filter(x => x.Id === this.loginForm.value.AccountSystemId)[0];
  }
  protected loginDs: IHttpDataSource<Login>;
  constructor(title: Title, @Inject(LoginPasswordHash) protected hashPassword: boolean, dsfac: DataSourceFactory, protected identity: Identity, protected router: Router, protected route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      Account: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
      AccountSystemId: new FormControl(null, Validators.required)
    });
    dsfac.getDataSource(SystemInfomation).toSubject().subscribe(info => {
      this.systemInfomations = info.data.filter(x => x.SystemAvaliable);
      if (this.systemInfomations.length === 1) {
        title.setTitle(info.data[0].Name);
        this.loginForm.get('AccountSystemId').setValue(info.data[0].Id);
      } else {
        title.setTitle('Bossinfo Platform');
      }
    })
    this.loginDs = dsfac.getDataSource(Login);
  }
  public login() {
    if (this.loginForm.valid) {
      this.loginDs.create({
        AccountSystemId: this.loginForm.value.AccountSystemId,
        Account: this.loginForm.value.Account,
        Password: this.hashPassword ? SHA512(this.loginForm.value.Password).toString() : this.loginForm.value.Password
      }).first().subscribe(response => {
        this.identity.login(response);
        this.route.queryParams.subscribe(p => {
          const returnUrl = p['returnUrl'];
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigate(['/']);
          }
        });

      });
    }
  }
  ngOnInit() {
  }

}
