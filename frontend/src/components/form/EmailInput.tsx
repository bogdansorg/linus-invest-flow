import React, { ChangeEvent } from "react";

export interface IEmailInput {
  value: string;

  onChange(email: string): void;
}

export const EmailInput: React.FC<IEmailInput> = ({value, onChange}) => {
  const onChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log('email valid', ev.target.validity.valid)
    onChange(ev.target.value)
    //TODO: show validation errors
  }
  return (
    <div className={'control'}>
      <input
        className={'input'}
        type="email"
        name="email"
        value={value}
        placeholder={'Your email address'}
        onChange={onChangeEmail}
      />
    </div>
  )
}
