import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContactDto, ResponseDto } from './models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactConnectorService {
  private httpClient = inject(HttpClient);

  public sendContactMessage(contactDto: ContactDto): Observable<ResponseDto> {
    return this.httpClient.post<ResponseDto>(`${environment.apiRoot}/api/ContactUs`, contactDto);
  }
}
