import React from "react";


interface IStep {
  step: number
}

export const Step: React.FC<IStep> = ({step}) => {
  return (
    <h1 className='title is-1 has-text-centered'>Step {step}</h1>
  )
};
