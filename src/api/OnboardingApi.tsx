import { api } from './api';
import { IUserDiabetesProperties } from '../model/IUserDiabetesProperties';

export class OnboardingApi {
    static completeOnboarding(userId, diabetesProperties: IUserDiabetesProperties) {
        return api.post('onboarding/complete', { userId, diabetesProperties });
    }
}
