import React from 'react';
import './SummaryItem.css'

interface ISummaryItem {
  name: string;
  value: string | number;
}

export const SummaryItem: React.FC<ISummaryItem> = ({name, value}) => {
  return (
    <div className='has-text-centered'>
      <div className={'name pr-2'}>
        <strong>{name}</strong>
      </div>
      <div className={'value pl-2'}>
        {value}
      </div>
    </div>
  )
}
