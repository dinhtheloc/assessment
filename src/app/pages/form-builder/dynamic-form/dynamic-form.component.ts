import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms'
import { Question } from '../question'

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
    form!: FormGroup
    @Output('handleSubmit') submit = new EventEmitter<Question>()
    constructor(private formBuilder: FormBuilder) {}
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
            type: this.formBuilder.nonNullable.control('text'),
            itemRows: this.formBuilder.array([]),
            specifyAns: this.formBuilder.nonNullable.control(false),
            required: this.formBuilder.nonNullable.control(false),
        })
    }

    get itemRows() {
        return this.form.get('itemRows') as FormArray
    }

    get name() {
        return this.form.get('name') as FormControl
    }

    get type() {
        return this.form.get('type') as FormControl
    }

    get specifyAns() {
        return this.form.get('specifyAns') as FormControl
    }

    get required() {
        return this.form.get('required') as FormControl
    }

    get f() {
        return this.form.controls
    }

    createItemRow() {
        return this.formBuilder.group({
            answer: ['', Validators.required],
            value: false,
        })
    }

    addItemRow() {
        if (this.itemRows.value.length === 5) {
            return
        }
        this.itemRows.push(this.createItemRow())
    }

    onSubmit() {
        this.submit.emit(this.form.value)

    }

    onChange(value: string) {
        if (value === 'text') {
            this.itemRows.clear()
        } else {
            this.addItemRow()
        }
    }
}
