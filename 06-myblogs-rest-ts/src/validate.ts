import { Post } from "./posts.js";

export type ValidationConfig<T> = {
    [P in keyof T]?: ValidatorFactory | ValidatorFactory[]
}

export type ValidationResult<T> = {
    [P in keyof T]: string[]
}

export type Validator = (value: string, field: string) => void; 

export type ValidatorFactory = (...args: any) => Validator

type PostValidationConfig = ValidationConfig<Post>

type PostValidationResult = ValidationResult<Post>

//Standard Validators
export class Validators {
    static required: ValidatorFactory =  (() => { return ((value: string, field: string) => {
        if(value.trim().length === 0){
            throw `The field ${field} is required`;
        }
    })
})

static pattern: ValidatorFactory =  (ValidationPattern: RegExp) => { return (value: string, field: string) => {
    if(ValidationPattern.test(value)){
        throw `The field ${field} does not match pattern ${ValidationPattern}`;
    }
}
}

static len: ValidatorFactory =  (min: number, max: number) => { return (value: string, field: string) => {
    if(value.length < min){
        throw `The field ${field} should be at least ${min} characters long`;
    } else if(value.length > max){
        throw `The field ${field} should be at most ${max} characters long`;
}
}

}
}
