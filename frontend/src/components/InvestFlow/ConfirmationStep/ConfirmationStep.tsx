import React, { ChangeEvent, FormEvent, useState } from 'react';
import { StepLayout } from "../../StepLayout";
import { Project, User } from "../../../models";
import { SummaryItem } from "./SummaryItem";


interface IConfirmationStep {
  user: User;
  project: Project;

  onBack(): void;
}

interface Data {
  email: string;
  amount: number;
  project_id: number;
}

export const ConfirmationStep: React.FC<IConfirmationStep> = ({onBack, user, project}) => {
  const [termsAccepted, setTerms] = useState(false);
  const [status, setSubmitStatus] = useState('');

  const onSubmit = (event: MouseEvent | FormEvent) => {
    setSubmitStatus('sending');
    const sendToBackend = async (data: Data) => {
      const url = 'http://localhost:8000/investments/';
      const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (!response.ok) console.error(response.statusText);
    };
    sendToBackend({email: user.email, amount: user.amount, project_id: project.id} as Data)
    setSubmitStatus('submitted');
  }

  return (
    <StepLayout number={3} subtitle={'Confirm your information'} onBack={onBack}>
      <div className={'container mb-3'}>
        <SummaryItem name={'Project'} value={project.name}/>
        <SummaryItem name={'Email'} value={user.email}/>
        <SummaryItem name={'Amount'} value={user.amount}/>
      </div>
      <div className='has-text-centered mb-3'>
        <label className="checkbox">
          <input type="checkbox"
                 className={'mr-2'}
                 name={'terms'}
                 disabled={status === 'submitted'}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => setTerms(event.target.checked)}/>
          I accept the terms an conditions
        </label>
      </div>
      <div className={'container has-text-centered'}>
        <button className={`button is-dark is-large ${status === 'sending' && `is-loading`}`}
                type="submit"
                disabled={!termsAccepted || status === 'submitted'}
                onClick={onSubmit}>
          Invest
        </button>
      </div>
    </StepLayout>
  )
}
