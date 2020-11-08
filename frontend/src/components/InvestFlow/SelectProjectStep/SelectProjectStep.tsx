import React, { useEffect, useState } from 'react';
import { Project } from "../../../models";
import * as jsonResponse from "../../../mocks/api_response.json";
import { ListItem } from "./ListItem";
import { StepLayout } from "../../StepLayout";

interface ISelectProjectStep {
  onContinue(data: Project): void;
}

export const SelectProjectStep: React.FC<ISelectProjectStep> = ({onContinue}) => {
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    const getProjects = async () => {
      const url = `https://fullstack.linus-capital.com/projects`;  // TODO move to config
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': '*/*'
          },
        });
        const data = await response.json();
        if (isMounted) setProjects(data.projects as Project[]);
      } catch (e) {
        console.error(e);
        if (isMounted) setProjects(jsonResponse.projects as Project[]);
        //  TODO introduce status "failed" and stop rendering mock data, but a failure message instead
      } finally {
        if (isMounted) setStatus('resolved');
      }
    };
    getProjects();
    return () => {
      isMounted = false;
    }
  }, [])

  const selectProject = (id: number) => {
    const selected = projects.find((p) => p.id === id) as Project;
    onContinue(selected);
  }

  const listElements = projects.map((project) => <ListItem key={project.id}
                                                           project={project}
                                                           onSelect={selectProject}/>);
  return (
    <StepLayout number={1}
                subtitle={'Select the project you want to invest in'}>
      {status === 'loading' && (
        <button className={'button is-loading is-large is-fullwidth'}
                style={{'border': 'none'}}
                data-testid={'loading-button'}>
        </button>
      )
      }
      {status === 'resolved' && (
        <ul>
          {listElements}
        </ul>
      )
      }
    </StepLayout>
  );
}
