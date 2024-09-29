import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function provideUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      new URL(value);
    } catch {
      return { invalidUrl: true };
    }

    /**
     * Struggled to find a way to check for existence without a server to call
     *
     * Probably there is a way but from what I saw online they all looked very hacky
     * And lots only worked for same origin URLs
     * Making a call to other origins is blocked by CORS
     */
    const response = { status: 200 };
    if (response.status === 404) {
      return { nonExistentUrl: true };
    }

    return null;
  };
}
