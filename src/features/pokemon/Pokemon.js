import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrl } from './generationSlice';
import { fetchPoks, selectError, selectGames, selectPoks, selectStatus } from './pokemonSlice';

function Pokemon(props)
{
    const dispatch = useDispatch();

    const poks = useSelector(selectPoks);
    const games = useSelector(selectGames);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    useEffect(() =>
    {
        if(status === 'idle' || status === 'changed')
        {
            console.log(" props : url ==> " + props.url);
            dispatch(fetchPoks(props.url));
        }
        
    }, [props,status, dispatch])


    let content;

    if(status === 'loading')
    {
        content = <p>Loading...</p>
    }else if(status === 'succeeded')
    {
        content =
        <div>
            <h2>Games : </h2>
            <ul>
                {games.map((el,i)=>(
                    <li key={i}>{el.name}</li>
                ))}
            </ul>
            <h2>Pokemons : </h2>
            <ul>
                {poks.map((el,i)=>(
                    <li key={i}>{el.name}</li>
                ))}
            </ul>
        </div>
    }else if(status === 'failed')
    {
        content = <p>{error}</p>
    }

    return ( 
        <div className="pokemons">
            {content}
        </div>
    );
}

export default Pokemon;