export interface TokenDto {
    access_token:  string;
    refresh_token: string;
    idUsuario:     number;
    message:       string;
    expiresIn:     number; // Duración del token en segundos
}


export interface LoginDto{
    correoElectronico: string
    password: string
}