import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const myRequiredValidator: ValidatorFn = (
  control: FormControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value?.trim()) {
    return { required: true };
  }
  return null;
};
