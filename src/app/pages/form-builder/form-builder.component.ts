import { Component, OnInit, ViewChild } from '@angular/core'
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { ModalDirective } from 'ngx-bootstrap/modal'
import { ShareDataService } from 'src/app/services/share-data.service'
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'
import { Answer, Question } from './question'

const requiredItemRowsValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const required = control.get('required')?.value
    const type = control.get('type')?.value

    if (!required || type !== 'checkbox') {
        return null
    }

    const itemRows = control.get('itemRows')?.value
    const other = control.get('other')?.value

    if (other.value === true && other.answer) {
        return null
    }

    let count = 0

    for (const iterator of itemRows) {
        if (iterator.value === false) {
            count++
        }
    }
    return count !== itemRows.length ? null : { required: true }
}

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
    questions$ = this.shareDataService.questions$

    form!: FormGroup
    @ViewChild('staticModal') staticModal!: ModalDirective
    @ViewChild('DynamicFormComponent')
    DynamicFormComponent!: DynamicFormComponent

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private shareDataService: ShareDataService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            questions: this.formBuilder.array([]),
        })

        this.questions$.subscribe((question: Array<Question>) => {
            this.form?.reset()
            question.forEach((question) => {
                this.questions.push(this.createItem(question))
            })
        })
    }
    get questions() {
        return this.form.get('questions') as FormArray
    }

    itemRows(index: number): FormArray {
        return this.questions.at(index).get('itemRows') as FormArray
    }

    specifyAns(index: number): FormControl {
        return this.questions.at(index).get('specifyAns') as FormControl
    }

    isShow(index: number) {
        return this.questions
            .at(index)
            .get('other')
            ?.get('value') as FormControl
    }

    handleSubmit(question: Question) {
        this.questions.push(this.createItem(question))

        this.staticModal.hide()
    }

    createItem(question: Question) {
        const { name, text, type, itemRows, specifyAns, required, other } =
            question
        return new FormGroup(
            {
                name: new FormControl(name),
                text: new FormControl(
                    text,
                    required && type === 'text' ? [Validators.required] : []
                ),
                type: new FormControl(type),
                itemRows: this.formBuilder.array(
                    this.createItemCheckBox(itemRows)
                ),
                specifyAns: new FormControl(specifyAns),
                required: new FormControl(required),
                other: this.formBuilder.group({
                    answer: [other ? other.answer : ''],
                    value: [other ? other.value : false],
                }),
            },
            { validators: requiredItemRowsValidator }
        )
    }

    createItemCheckBox(itemRows: Array<Answer> | undefined): FormGroup[] {
        if (itemRows) {
            const arr = []
            for (const ans of itemRows) {
                const fg = this.formBuilder.group({
                    answer: [ans.answer],
                    value: [ans.value],
                })
                arr.push(fg)
            }
            return [...arr]
        } else {
            return []
        }
    }

    reviewAnswers() {
        console.log(this.form)
        this.shareDataService.setQuestion(this.form.value.questions)
        this.router.navigate(['form/preview'])
    }

    openModal() {
        this.DynamicFormComponent.form.reset()
        this.staticModal.show()
    }
}
