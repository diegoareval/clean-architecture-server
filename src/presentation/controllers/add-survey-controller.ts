import { Controller, HttpResponse, Validation } from '../protocols';
import { badRequest, serverError, noContent } from '../helpers';
import { AddSurvey } from '../../domain/usecases';

export class AddSurveyController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addSurvey: AddSurvey
    ) {}

    async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            await this.addSurvey.add({
                ...request,
                date: new Date()
            })
            return noContent()
        }
        catch (err) {
            return serverError(err)
        }
    }
}

export namespace AddSurveyController {
    export type Request = {
        question: string
        answers: Answer[]
    }

    type Answer = {
        image?: string
        answer: string
    }
}
