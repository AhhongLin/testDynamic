import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  private existingUsernames = ['user1', 'user2', 'user3'];

  checkUsername(username: string): Observable<boolean> {
    const isTaken = this.existingUsernames.includes(username);
    return of(isTaken).pipe(delay(1000)); // 模擬異步請求
  }
}
