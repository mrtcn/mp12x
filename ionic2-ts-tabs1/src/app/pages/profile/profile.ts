import { Component } from '@angular/core';
import { Toast } from 'ionic-native';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AccountService } from '../../auth/shared/account.service';
import { UserInfo } from '../../auth/shared/account.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var window: any;

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {    
    sampleForm: FormGroup;
    private _userInfo = new BehaviorSubject<UserInfo>(null);
    userInfo = this._userInfo.asObservable();

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getUserInfo().subscribe(x => {
            this._userInfo.next(x);

            this.sampleForm = new FormGroup({
                Id: new FormControl(x.Id),
                HasRegistered: new FormControl(true),
                FirstName: new FormControl(x.FirstName),
                LastName: new FormControl(x.LastName),
                UserName: new FormControl(x.UserName),
                ImagePath: new FormControl(x.ImagePath),
                Email: new FormControl(x.Email),
                PopcornPoint: new FormControl(x.PopcornPoint),
                Level: new FormControl(x.Level)
            });

        }); 

        this.sampleForm = new FormGroup({
            Id: new FormControl(),
            HasRegistered: new FormControl(true),
            FirstName: new FormControl(),
            LastName: new FormControl(),
            UserName: new FormControl(),
            ImagePath: new FormControl(),
            Email: new FormControl(),
            PopcornPoint: new FormControl(),
            Level: new FormControl()
        });
    }

    changeUserInfoForm(formData) {

        Toast.show("Profile updated successfully", '5000', 'center').subscribe(
            toast => {
                console.log(toast);
            }
        );

        this.accountService.updateUser(formData).subscribe(x => {
            console.log("x = " + x);
            if (x) {
                
            }

        });

    }
}
