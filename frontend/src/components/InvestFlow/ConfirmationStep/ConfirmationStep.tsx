import React, { FormEvent, useState } from 'react';
import { StepLayout } from "../../StepLayout";
import { Project, User } from "../../../models";
import { SummaryItem } from "./SummaryItem";


interface IConfirmationStep {
  user: User;
  project: Project;

  onBack(): void;
}

export const ConfirmationStep: React.FC<IConfirmationStep> = ({onBack, user, project}) => {
  return (
    <StepLayout number={3} subtitle={'Confirm your information'} onBack={onBack}>
      <SummaryItem name={'Project'} value={project.name}/>
      <SummaryItem name={'Email'} value={user.email}/>
      <SummaryItem name={'Amount'} value={user.amount}/>
    </StepLayout>
  )
}
