import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]>{
    var url: string = 'http://localhost:3000/users';
    return this.http.get<User[]>(url).pipe(
      tap((retorno: User[]) => {
        console.log('Listando usuários service')
      }),//tratamento erro
      catchError(this.handleError<User[]>('erro ao listar eventos'))
    )
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return(error:any):Observable<T> => {
      console.error(error); //log to conssole instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`EventoService: ${message}`);
  }
}

export class User {
  public id: string = '';
  public firstName: string = '';
  public email: string = '';
  public phone: string = '';
  public cpf: string = '';
  public password: string = '';
  public dataNascimento: string = '';

}