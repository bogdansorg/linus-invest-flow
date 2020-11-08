import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export interface INumberInput {
  value: number;

  onChange(amount: number, valid: boolean): void;
}

export const NumberInput: React.FC<INumberInput> = ({value, onChange}) => {
  const [requiredError, setRequiredErr] = useState<boolean>()
  const [minAmountError, setMinAmountErr] = useState<boolean>()
  const [numberError, setNumberErr] = useState<boolean>()

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      onChange(value, inputRef.current.validity.valid);
    }
  })  // this will run only once when the component is initialized

  const onChangeNumber = (ev: ChangeEvent<HTMLInputElement>) => {
    const validity = ev.target.validity;
    const value = Number(ev.target.value);

    setNumberErr(isNaN(value))
    setMinAmountErr(validity.rangeUnderflow);
    setRequiredErr(validity.valueMissing);

    onChange(value, validity.valid);
  }

  return (
    <div className={'control'}>
      <input
        ref={inputRef}
        className={'input'}
        type="number"
        min={200000}
        required={true}
        name="amount"
        value={value || ''}
        placeholder={'Investment Amount'}
        onChange={onChangeNumber}
      />
      {requiredError && (
        <p className="help is-danger">An investment amount is required</p>
      )
      }
      {minAmountError && (
        <p className="help is-danger">The minimum investment amount is 200.000</p>
      )
      }
      {numberError && (
        <p className="help is-danger">Please type a valid number</p>
      )
      }
    </div>
  )
}
