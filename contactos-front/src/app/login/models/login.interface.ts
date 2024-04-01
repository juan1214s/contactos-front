export interface Token {
    access_token:  string;
    refresh_token: string;
    idUsuario:     number;
    message:       string;
}

export interface LoginDto{
    correoElectronico: string
    password: string
}