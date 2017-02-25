export class RegisterViewModel {
    constructor(
        public fullName: string,
        public email: string,
        public userName: string,
        public password: string,
        public confirmPassword: string
    ) { }
}

export class RegisterApiModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public userName: string,
        public password: string,
        public confirmPassword: string
    ) { }
}

export class LoginViewModel {
    constructor(
        public userName: string,
        public password: string
    ) { }
}

export class UserInfo {
    constructor(
        public Email: string,
        public HasRegistered: boolean,
        public LoginProvider: string
    ) { }    
}

export class AccessTokenModel
{
    public access_token: string;
    public token_type: string;
    public expires_in: string;
    public userName: string;
    public '.issued': string;
    public '.expires': string
}