import { useCallback, useEffect, useState } from "react";
import { ICountry, ICoutnryBlock } from "../../types";
import CountryItem from "../../Components/CountryItem/CountryItem.tsx";
import {
  urlAllCountry,
  urlCodeCountry,
  urlNameCountry,
} from "../../constsnts.ts";
import axios from "axios";
import DisplayDescCountry from "../../Components/DisplayDescCountry/DisplayDescCountry.tsx";

const CountryBlock = () => {
  const [countries, setCountries] = useState<ICoutnryBlock[]>([]);
  const [cliclCountry, setCliclCountry] = useState<null | string>(null);

  const fetchCountry = useCallback(async () => {
    const response = await axios<ICoutnryBlock[]>(
      urlAllCountry + urlNameCountry,
    );
    const responseCount = response.data;

    const promises = responseCount.map(async (country) => {
      const responseCountry = await axios<ICountry>(
        urlAllCountry + urlCodeCountry + country.alpha3Code,
      );
      return responseCountry;
    });

    const descriptionCountries = await Promise.all(promises);
    setCountries(descriptionCountries.map((res) => res.data));
  }, []);

  useEffect(() => {
    void fetchCountry();
  }, [fetchCountry]);

  return (
    <>
      <div className="container row">
        <div className="mt-4 w-25 col-3">
          <h3 className="mb-4">Select a country</h3>
          {countries.map((country) => (
            <CountryItem
              key={country.alpha3Code}
              country={country}
              onClick={() => setCliclCountry(country.alpha3Code)}
            />
          ))}
        </div>
        {cliclCountry === null ? (
          <div className="mt-4 col-9">
            <p className="text-center">Unselcted country</p>
          </div>
        ) : (
          <div className="ml-3 col-9">
            <DisplayDescCountry alpha3Code={cliclCountry} />
          </div>
        )}
      </div>
    </>
  );
};

export default CountryBlock;
