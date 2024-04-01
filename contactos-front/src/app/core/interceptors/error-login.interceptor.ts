import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import swal from 'sweetalert';
import { TokenDto } from "../../login/models/login.interface";

export const errorLoginInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
) => next(req)
.pipe(
    tap((event) => {
      if (req.url.includes('/login')) {
        if (event instanceof HttpResponse) {
          const responseBody: TokenDto = event.body as TokenDto; 
          const accessToken = responseBody.access_token;
          const idUsuario = responseBody.idUsuario; // Obtener el idUsuario del cuerpo de la respuesta

          localStorage.setItem('token', accessToken);
          // Almacena el idUsuario en el localStorage pero localStorage solo almacena string
          localStorage.setItem('idUsuario', idUsuario.toString()); 

          // Accede al tiempo de expiración del token
          const expiresIn = responseBody.expiresIn;
          // accedo al tiempo del token
          const expirationTime = new Date().getTime() + (expiresIn);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
          swal('¡Éxito!', 'Usuario validado', 'success');
        }
      }
       
    }),
    catchError((error: HttpErrorResponse) => {
        // Manejo de errores aquí
        
        swal('¡Error!', 'Usuario no validado', 'error');
        return throwError(error);
    })
);
