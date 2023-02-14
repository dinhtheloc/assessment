import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Question } from '../pages/form-builder/question'

@Injectable({
    providedIn: 'root',
})
export class ShareDataService {
    data: Subject<Question[]> = new Subject<Question[]>()

    subject$ = this.data.asObservable()

    questions = new BehaviorSubject<Question[]>([])

    questions$ = this.questions.asObservable()

    constructor() {}

    setQuestion(questions: Question[]) {
        this.questions.next(questions)
    }

}
