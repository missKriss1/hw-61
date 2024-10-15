import { ICoutryBlock } from '../../types';
import * as React from 'react';

interface CountryItem {
  country: ICoutryBlock;
}
const CountryItem: React.FC <CountryItem> = ({country}) => {
  return (
    <div>
      <strong>{country.name}</strong>
      <hr/>
    </div>
  );
};

export default CountryItem;