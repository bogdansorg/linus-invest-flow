import React, { useEffect, useState } from 'react';
import { SelectProjectStep } from "./SelectProjectStep/SelectProjectStep";


export const InvestFlow: React.FC = () => {
  const [stepIndex, setStep] = useState(1);

  let currentStep;
  switch (stepIndex) {
    case 1:
      currentStep = <SelectProjectStep/>
      break;

    default:
      currentStep = <SelectProjectStep/>
      break;
  }
  return (
    <>
      {currentStep}
    </>
  )
}
