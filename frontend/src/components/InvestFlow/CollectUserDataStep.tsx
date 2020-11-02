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
  const [amount, setAmount] = useState<number>(user.amount);

  const onSubmit = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    onContinue({email: email, amount: amount} as User)
  };

  return (
    <StepLayout number={2} subtitle={'Enter your information'}>
      <section className={'section pb-3 pl-0'}>
        <div className={'container'}>
          <button className='button is-light' type={'button'} onClick={() => onBack()}>Go Back</button>
        </div>
      </section>
      <form onSubmit={onSubmit}>
        <div className={'field'}>
          <label className={'label'}>
            <EmailInput value={email} onChange={(e) => setEmail(e)}/>
          </label>
          <div className={'field is-horizontal'}>
            <div className={'field-body'}>
              <div className={'field'}>
                <NumberInput value={amount} onChange={(a) => setAmount(a)}/>
              </div>
            </div>
            <div className={'field-label is-medium'}>
              <label className={'label is-pulled-left pl-2'}>EUR</label>
            </div>
          </div>
        </div>
        <div className={'container has-text-centered'}>
          <button className='button is-dark is-large' type="submit" onClick={onSubmit}>
            Continue
          </button>
        </div>
      </form>
    </StepLayout>
  )
}
