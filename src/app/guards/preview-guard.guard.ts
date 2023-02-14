import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { first, firstValueFrom, map, Observable } from 'rxjs'
import { ShareDataService } from '../services/share-data.service'

@Injectable({
    providedIn: 'root',
})
export class PreviewGuardGuard implements CanActivate {
    constructor(
        private shareDataService: ShareDataService,
        private router: Router
    ) {}
    async canActivate(): Promise<boolean> {
        const questions = await firstValueFrom(this.shareDataService.questions$)
        if (questions.length > 0) {
            return true
        } else {
            this.router.navigate(['/form/builder'])
            return false
        }

        // return this.shareDataService.questions$.pipe(
        //   first(),
        //   map(item => {
        //     if (item) {
        //       this.router.navigate(['/form/builder'])
        //       return false;
        //     } else {
        //       return true;
        //     }
        //   })
        // );
    }
}
