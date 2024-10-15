import { useEffect, useState } from 'react';
import { ICoutryBlock } from '../../types';
import CountryItem from '../../Components/CountryItem/CountryItem.tsx';

const CountryBlock = () => {
  const urlAllCountry = 'https://restcountries.com/';
  const urlNameCountry ='v2/all?fields=alpha3Code,name';
  //const urlCodeCountry ='v2/alpha/';

  const [country, setCountry] = useState<ICoutryBlock[]>([]);

  const fetchCountry = async () => {
    const response = await fetch(urlAllCountry + urlNameCountry);

    if (response.ok) {
      const countryAll = await response.json();
      setCountry(countryAll);
    }
  }

  useEffect(() => {
    void fetchCountry()
  },[])

  return (

    <>
      <div className="container">

        <div className="mt-4 w-25">
          <h3 className="mb-4">Select a country</h3>
          {country.map((country) => (
            <CountryItem key={country.alpha3Code} country={country}/>
          ))}
        </div>
      </div>
    </>

  );
};

export default CountryBlock;