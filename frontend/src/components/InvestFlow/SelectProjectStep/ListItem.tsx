import React from 'react';
import { Project } from "../../../models";

interface IListItem {
  project: Project,

  onSelect(projectId: number): void
}

export const ListItem: React.FC<IListItem> = ({project, onSelect}) => {
  return (
    <li style={{'margin': '0 0 5px 0', 'cursor': 'pointer'}}
        data-testid={'project'}
        onClick={() => onSelect(project.id)}>
        <div className='box has-background-light'>
          <h1 className="title">{project.name}</h1>
          <h2 className="subtitle">{project.location}</h2>
        </div>
    </li>
  );
};
