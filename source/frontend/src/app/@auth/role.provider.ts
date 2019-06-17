
import { NbAuthService, NbAuthJWTToken, decodeJwtPayload } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleProvider extends NbRoleProvider {

  constructor(private authService: NbAuthService) {
    super();
  }

  private readonly ROLE_FIELD = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          const payload = decodeJwtPayload(token.toString());
          return token.isValid() && payload ? payload[this.ROLE_FIELD] : 'guest';
        }),
      );
  }
}
