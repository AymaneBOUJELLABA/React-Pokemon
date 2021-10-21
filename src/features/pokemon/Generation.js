import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentGen, selectGens, selectStatus, selectError, fetchGens, changeGen,changeUrl, selectUrl, } from './generationSlice';
import Pokemon from './Pokemon.js';
import { setChangedStatus } from './pokemonSlice';

function Generation()
{
    const dispatch = useDispatch();

    const gens = useSelector(selectGens);
    const currentGen = useSelector(selectCurrentGen);
    const gensStatus = useSelector(selectStatus);
    const error = useSelector(selectError);
    const url = useSelector(selectUrl);

    useEffect(() => {
        if(gensStatus === 'idle')
        {
            dispatch(fetchGens());
        }
    }, [gensStatus, dispatch])

    const handleChange = (event) => {

        let genName = event.target.value;
        let genNum = event.target.selectedIndex +1 ;

        dispatch(changeGen(genName));
        dispatch(changeUrl(genNum));
        dispatch(setChangedStatus());
    }
    let content;

    if(gensStatus === 'loading')
    {
        content = <p>Loading...</p>
    }else if(gensStatus === 'succeeded')
    {
        content =
        <div>
            <h2>Generation : {currentGen}</h2>
            <select value={currentGen} onChange={(e) => handleChange(e)}>
                {gens.map((el,i) => (
                    <option key={i} value={el.name} name={el.name}>{el.name}</option>
                ))}
            </select>
        </div>
    }else if(gensStatus === 'failed')
    {
        <p>{error}</p>
    }

    return (
        <div className="generations">
            <div className="gen-selector">    
                {content}
            </div>
            <div className="gen-poks">
                <Pokemon url={url}/>
            </div>
        </div>
     );
}

export default Generation;