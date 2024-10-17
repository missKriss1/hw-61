import { ICoutnryBlock } from '../../types';
import * as React from 'react';

interface CountryItem {
  country: ICoutnryBlock;
  onClick:  React.MouseEventHandler;
}
const CountryItem: React.FC <CountryItem> = ({country, onClick}) => {
  return (
    <div onClick={onClick}>
      <p>{country.name}</p>
    </div>
  );
};

export default CountryItem;