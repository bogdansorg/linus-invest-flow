import React, { ChangeEvent, FormEvent, useState } from 'react';
import { StepLayout } from "../StepLayout";
import { User } from "../../models";


interface ICollectUserDataStep {
  user: User;

  onContinue(data: User): void;

  onBack(): void;
}

export const CollectUserDataStep: React.FC<ICollectUserDataStep> = ({onContinue, onBack, user}) => {
  const [email, setEmail] = useState<string>(user.email);
  const [amount, setAmount] = useState<number>(user.amount);

  const onChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log('email valid', ev.target.validity.valid)
    setEmail(ev.target.value)
    //TODO: show validation errors
  }

  const onChangeAmount = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log('amount valid', ev.target.validity.valid)
    try {
      setAmount(Number(ev.target.value));
    } catch (e) {
      console.error(e)
      //TODO: show validation errors
    }
  }

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
            <div className={'control'}>
              <input
                className={'input'}
                type="email"
                name="email"
                value={email}
                placeholder={'Your email address'}
                onChange={onChangeEmail}
              />
            </div>
          </label>
          <div className={'field is-horizontal'}>
            <div className={'field-body'}>
              <div className={'field'}>
                <div className={'control'}>
                  <input
                    className={'input'}
                    type="number"
                    min={200000}
                    name="amount"
                    value={amount || ''}
                    placeholder={'Investment Amount'}
                    onChange={onChangeAmount}
                  />
                </div>
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
