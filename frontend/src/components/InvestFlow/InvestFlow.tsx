import React, { useState } from 'react';
import { SelectProjectStep } from "./SelectProjectStep/SelectProjectStep";
import { Project, User } from "../../models";
import { CollectUserDataStep } from "./CollectUserDataStep";
import { ConfirmationStep } from "./ConfirmationStep/ConfirmationStep";


const initialProjectState = {id: 0, name: '', location: ''};
const initialUserState = {email: '', amount: 0};

export const InvestFlow: React.FC = () => {
  const [stepIndex, setStep] = useState(1);
  const [selectedProject, setProject] = useState<Project>(initialProjectState);
  const [user, setUser] = useState<User>(initialUserState);

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
          setUser(initialUserState);
          setStep(1);
        }}/>;
      break;

    case 3:
      currentStep = <ConfirmationStep user={user}
                                      project={selectedProject}
                                      onBack={() => setStep(2)}/>
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
