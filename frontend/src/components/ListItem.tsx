import React from 'react';
import { Project } from "../models";

export const ListItem: React.FC<Project> = ({id, name, location }) => {
  return (
    <li key={id} style={{'margin': '0 0 5px 0'}}>
        <div className='box has-background-light'>
          <h1 className="title">{name}</h1>
          <h2 className="subtitle">{location}</h2>
        </div>
    </li>
  );
};
