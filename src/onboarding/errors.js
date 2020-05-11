import { BaseError } from '../errors';

export class OnboardingError extends BaseError {}

export class OnboardingUserAlreadyHasPassword extends OnboardingError {}
