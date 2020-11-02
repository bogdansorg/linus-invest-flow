import React, { ChangeEvent } from "react";

export interface INumberInput {
  value: number;

  onChange(amount: number): void;
}

export const NumberInput: React.FC<INumberInput> = ({value, onChange}) => {
  const onChangeNumber = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log('amount valid', ev.target.validity.valid)
    try {
      onChange(Number(ev.target.value));
    } catch (e) {
      console.error(e)
      //TODO: show validation errors
    }
  }

  return (
    <div className={'control'}>
      <input
        className={'input'}
        type="number"
        min={200000}
        name="amount"
        value={value || ''}
        placeholder={'Investment Amount'}
        onChange={onChangeNumber}
      />
    </div>
  )
}
