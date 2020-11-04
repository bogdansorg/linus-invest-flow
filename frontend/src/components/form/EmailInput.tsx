import React, { ChangeEvent, useState } from "react";

export interface IEmailInput {
  value: string;

  onChange(email: string, valid: boolean): void;
}

export const EmailInput: React.FC<IEmailInput> = ({value, onChange}) => {
  const [requiredError, setRequiredErr] = useState<boolean>()
  const [patternError, setPatternErr] = useState<boolean>()

  const onChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
    const validity = ev.target.validity;

    setRequiredErr(validity.valueMissing);
    setPatternErr(validity.typeMismatch);

    onChange(ev.target.value, validity.valid);
  }
  return (
    <div className={'control'}>
      <input
        className={'input'}
        type="email"
        name="email"
        required={true}
        value={value}
        placeholder={'Your email address'}
        onChange={onChangeEmail}
      />
      {requiredError && (
        <p className="help is-danger">An E-mail address is required</p>
      )
      }
      {patternError && (
        <p className="help is-danger">Please use a valid E-mail address</p>
      )
      }
    </div>
  )
}
