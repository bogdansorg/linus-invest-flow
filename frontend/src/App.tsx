import React, { useState, useEffect } from 'react';
import { Step } from "./components";
import { Project } from "./models";
import { ListItem } from "./components/ListItem";
import * as jsonResponse from './api_response.json';

const App: React.FC = () => {
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

  const listElements = projects.map((project) => <ListItem id={project.id}
                                                           name={project.name}
                                                           location={project.location}/>);

  return (
    <div className="section">
      <div className='container is-max-desktop'>
        <div className='box'>
          <Step step={1}/>
          <h3 className='title is-3 has-text-centered'>
            Select the project you want to invest in
          </h3>
          <div className='block'>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
