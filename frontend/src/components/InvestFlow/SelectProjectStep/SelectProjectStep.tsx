import React, { useEffect, useState } from 'react';
import { Project } from "../../../models";
import * as jsonResponse from "../../../api_response.json";
import { ListItem } from "../../ListItem";
import { StepLayout } from "../../StepLayout";

export const SelectProjectStep: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('loading');
    const getProjects = async () => {
      const url = `https://fullstack.linus-capital.com/projects`;
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': '*/*'
          },
        });
        const data = await response.json();
        setProjects(data.projects as Project[]);
      } catch (e) {
        console.error(e);
        setProjects(jsonResponse.projects as Project[]);
      } finally {
        setStatus('resolved');
      }
    };
    getProjects();
  }, [])

  const listElements = projects.map((project) => <ListItem key={project.id}
                                                           project={project}
                                                           onSelect={(id) => {
                                                             console.log('Selected project ID:', id)
                                                           }}/>);
  return (
    <StepLayout number={1}
                subtitle={'Select the project you want to invest in'}>
      {status === 'loading' && (
        <button className={'button is-loading is-large is-fullwidth'}
                style={{'border': 'none'}}>
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
