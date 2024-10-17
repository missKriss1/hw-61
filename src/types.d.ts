export interface ICoutnryBlock{
  name: string;
  alpha3Code: string;
}

export interface ICountry{
  name: string;
  alpha3Code: string;
  capital: string;
  population: number;
  borders: string [];
  flag: string
}