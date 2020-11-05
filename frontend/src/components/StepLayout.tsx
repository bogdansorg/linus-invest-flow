import React from "react";


interface IStep {
  number: number,
  subtitle: string,

  onBack?(): void;
}

export const StepLayout: React.FC<IStep> = ({children, number, subtitle = '', onBack}) => {
  return (
    <div className='box'>
      <h1 className='title is-1 has-text-centered'>Step {number}</h1>
      <h3 className='subtitle is-3 has-text-centered'>{subtitle}</h3>
      <div className='block'>
        {onBack && (
          <section className={'section pb-3 pl-0'}>
            <div className={'container'}>
              <button className='button is-light' type={'button'} onClick={() => onBack()}>Go Back</button>
            </div>
          </section>
        )}
        {children}
      </div>
    </div>
  )
};
