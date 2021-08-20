import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Handler } from '../exceptions/handler';
import { catchError, map } from 'rxjs/operators';
import { ServerResponse } from '../models';
import { DeliveryModel } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})

export class DeliveryAdministrationHttpService {

    API_APP_URL: string = environment.API_APP_URL;

  constructor(private httpClient: HttpClient) {
    
}

    getDeliveries():Observable<ServerResponse>{
      const url = this.API_APP_URL + '/deliveries';
      return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      )        
    }
    getDelivery(id: number): Observable<ServerResponse> {
      const url = this.API_APP_URL + '/deliveries/' + id;
      return this.httpClient.get<ServerResponse>(url)
        .pipe(
          map(response => response),
          catchError(Handler.render)
        );
    }
    storeDelivery(delivery: DeliveryModel): Observable<ServerResponse> {
      const url = this.API_APP_URL + '/deliveries';
      return this.httpClient.post<ServerResponse>(url, delivery)
        .pipe(
          map(response => response),
          catchError(Handler.render)
        );
    }
    updateDelivery(id: number | undefined, delivery: DeliveryModel): Observable<ServerResponse> {
      const url = this.API_APP_URL + '/deliveries/' + id;
      return this.httpClient.put<ServerResponse>(url, delivery)
        .pipe(
          map(response => response),
          catchError(Handler.render)
        );
    }
    deleteDelivery(id: number | undefined): Observable<ServerResponse> {
      const url = this.API_APP_URL + '/deliveries/' + id;
      return this.httpClient.delete<ServerResponse>(url)
        .pipe(
          map(response => response),
          catchError(Handler.render)
        );
    }
    deleteDeliveries(ids: (number | undefined)[]): Observable<ServerResponse> {
      const url = this.API_APP_URL + '/delivery/destroys';
      return this.httpClient.patch<ServerResponse>(url, {ids})
        .pipe(
          map(response => response),
          catchError(Handler.render)
      )

  }
}
