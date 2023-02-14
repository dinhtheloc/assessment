export interface Question {
    name: string
    text: string
    type: 'text' | 'checkbox'
    itemRows?: Array<Answer>
    specifyAns: boolean
    required: boolean
    other: Answer
}

export interface Answer { 
    answer: string,
    value: boolean
}