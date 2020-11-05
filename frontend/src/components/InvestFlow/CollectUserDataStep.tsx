import React, { FormEvent, useState } from 'react';
import { StepLayout } from "../StepLayout";
import { User } from "../../models";
import { EmailInput } from "../form/EmailInput";
import { NumberInput } from "../form/NumberInput";


interface ICollectUserDataStep {
  user: User;

  onContinue(data: User): void;

  onBack(): void;
}

export const CollectUserDataStep: React.FC<ICollectUserDataStep> = ({onContinue, onBack, user}) => {
  const [email, setEmail] = useState<string>(user.email);
  const [emailValid, setEmailValidity] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(user.amount);
  const [amountValid, setAmountValidity] = useState<boolean>(false);

  const onSubmit = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    onContinue({email: email, amount: amount} as User)
  };

  return (
    <StepLayout number={2} subtitle={'Enter your information'} onBack={onBack}>
      <form onSubmit={onSubmit}>
        <div className={'field'}>
          <label className={'label'}>
            <EmailInput value={email} onChange={(e, v) => {
              setEmail(e);
              setEmailValidity(v);
            }}/>
          </label>
          <div className={'field is-horizontal'}>
            <div className={'field-body'}>
              <div className={'field'}>
                <NumberInput value={amount} onChange={(a, v) => {
                  setAmount(a);
                  setAmountValidity(v);
                }}/>
              </div>
            </div>
            <div className={'field-label is-medium'}>
              <label className={'label is-pulled-left pl-2'}>EUR</label>
            </div>
          </div>
        </div>
        <div className={'container has-text-centered'}>
          <button className='button is-dark is-large'
                  type="submit"
                  disabled={!(amountValid && emailValid)}
                  onClick={onSubmit}>
            Continue
          </button>
        </div>
      </form>
    </StepLayout>
  )
}
