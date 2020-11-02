import React, { useState } from 'react';
import { SelectProjectStep } from "./SelectProjectStep/SelectProjectStep";
import { Project, User } from "../../models";
import { CollectUserDataStep } from "./CollectUserDataStep";


export const InvestFlow: React.FC = () => {
  const [stepIndex, setStep] = useState(1);
  const [selectedProject, setProject] = useState<Project>();
  const [user, setUser] = useState<User>({email: '', amount: 0});

  const firstStep = <SelectProjectStep
    onContinue={(project) => {
      setStep(2);
      setProject(project)
    }}/>

  let currentStep;
  switch (stepIndex) {
    case 1:
      currentStep = firstStep;
      break;

    case 2:
      currentStep = <CollectUserDataStep
        user={user}
        onContinue={(user: User) => {
          setStep(3);
          setUser(user);
        }}
        onBack={() => {
          setUser({email: '', amount: 0});
          setStep(1);
        }}/>;
      break;

    default:
      currentStep = firstStep;
      break;
  }

  return (<>
    {currentStep}
    </>
  )
}
