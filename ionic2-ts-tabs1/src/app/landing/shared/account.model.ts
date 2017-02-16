export class RegisterViewModel {
    constructor(
        public fullName: string,
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