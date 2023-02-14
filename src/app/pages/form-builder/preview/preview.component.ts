import { Component } from '@angular/core'
import { ShareDataService } from 'src/app/services/share-data.service'

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
    questions$ = this.shareDataService.questions$
    constructor(private shareDataService: ShareDataService) {}
}
