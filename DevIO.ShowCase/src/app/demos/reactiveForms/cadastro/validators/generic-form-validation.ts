import { FormGroup } from "@angular/forms";

export class GenericValidator {
  constructor(private validationMessages: ValidationMessages) {}

  processarMensagens(formGroup: FormGroup): { [key: string]: string } {
    let messages: { [key: string]: string } = {};
    for (let controlKey in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlKey)) {
        let c = formGroup.controls[controlKey];

        if (c instanceof FormGroup) {
          let childMessages = this.processarMensagens(c);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = "";
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map((messageKey) => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messageKey];
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}

export interface DisplayMessage {
  [key: string]: string
}

export interface ValidationMessages {
  [key: string]: { [key: string]: string };
}