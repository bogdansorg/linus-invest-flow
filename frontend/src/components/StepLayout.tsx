import React from "react";


interface IStep {
  number: number,
  subtitle: string,
}

export const StepLayout: React.FC<IStep> = ({children, number, subtitle = ''}) => {
  return (
    <div className='box'>
      <h1 className='title is-1 has-text-centered'>Step {number}</h1>
      <h3 className='subtitle is-3 has-text-centered'>{subtitle}</h3>
      <div className='block'>
        {children}
      </div>
    </div>
  )
};
