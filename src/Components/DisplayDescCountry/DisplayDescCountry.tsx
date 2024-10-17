import * as React from 'react';
import { useEffect, useState } from 'react';
import { urlAllCountry, urlCodeCountry } from '../../constsnts.ts';
import { ICountry } from '../../types';
import axios from 'axios';

interface Props{
  alpha3Code : string | null,
}
const  urlGetOnePost = urlAllCountry + urlCodeCountry;
const DisplayDescCountry: React.FC <Props> = ({alpha3Code}) => {
  const [post, setPost] = useState<ICountry | null>(null);
  const [borderName, setBorderName] = useState<string[]>([]);

  useEffect(() => {

    const getPostByCode = async () =>{
      const response: {data: ICountry} = await axios <ICountry>(urlGetOnePost + alpha3Code);
      const responseCount = response.data
      setPost(responseCount);

      let bordersName: (string | null)[] = [];

      if(responseCount.borders && responseCount.borders.length){
        bordersName = await Promise.all(
          responseCount.borders.map(async (code) => {
            try{
              const responseBorder = await axios<ICountry>(urlGetOnePost + code);
              return responseBorder.data.name;
            }catch(error) {
              return null;
            }
          })
        );
      }

      const noName :string[] = [];
      for(let i = 0; i < bordersName.length; i++){
        const name = bordersName[i];

        if(name !== null) {
          noName.push(name);
        }
      }

      setBorderName(noName)
    }

    if(alpha3Code !== null) void getPostByCode();

  },[alpha3Code]);
  return post && (
    <div className="mt-4 border border-gray p-4 bg-secondary-subtle">

      <div className="row p-5">
        <div className="col-4">
          <h3>{post.name}</h3>
          <strong>Capital: <p>{post.capital}</p></strong>
          <strong>Population: <p>{post.population}</p></strong>
        </div>
        <div className="col-7">
          <img className="w-50" alt={post.flag} src={post.flag}/>
        </div>
      </div>

      <div>
        <strong>Borders:</strong>
        {borderName.length === 0 ? (
          <p>No borders</p>
          ): (
          <ul>
            {borderName.map((border, index) => (
              <li className="ms-5" key={index}>{border}</li>
            ))}
          </ul>

          )}
      </div>

    </div>
  );
};

export default DisplayDescCountry;