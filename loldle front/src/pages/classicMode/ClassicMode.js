import classes from './ClassicMode.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { championActions } from '../../store/champion';
import { useEffect, useRef, useState } from 'react';

import Champion from '../../components/Champion';
import ChampionSmall from '../../components/ChampionSmall';
import { fetchChampion, getChampion, getChampions } from '../../services/ChampionService';

const ClassicMode = () => {
  const dispatch = useDispatch();
  const champion = useSelector(state => state.champion.champion);
  const championRef = useRef();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [championList, setChampionList] = useState([]);
  const [championInputList, setChampionInputList] = useState([]);

  const containsChampion = (name) => {
    for (const key in championList) {
      if (championList[key].name === name) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    fetchChampion().then(responseData => {
      dispatch(championActions.setChampion({
        id: responseData.id,
        name: responseData.name,
        image: responseData.image,
        gender: responseData.gender,
        position: responseData.position,
        rangeType: responseData.rangeType,
        region: responseData.region,
        releaseYear: responseData.releaseYear,
        resource: responseData.resource,
        species: responseData.species
      }));
    }).catch((error) => {
      console.log("Error: ", error)
    })
  }, [dispatch])

  const oneChampionInInputList = () => {
    if (championInputList.length === 1) {
      championRef.current.value = championInputList[0].name;
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const inputChampion = championRef.current.value;

    oneChampionInInputList();
    getChampion(inputChampion).then((responseData) => {
      setChampionList(championList => [responseData, ...championList]);

      if (inputChampion === champion.name) {
        setGameOver(true);
      }
    }).catch((error) => {
      console.log(error);
    });
    championRef.current.value = '';
    setChampionInputList([]);
  }

  const inputChangedHandler = (event) => {

    setChampionInputList([]);
    if (event.target.value === '')
      return;

    getChampions(event.target.value).then((responseData) => {
      const inputChampions = [];
      for (const key in responseData) {
        if (!containsChampion(responseData[key].name)) {
          inputChampions.push({
            id: responseData[key].id,
            image: responseData[key].image,
            name: responseData[key].name
          });
        }
      }

      setChampionInputList(inputChampions);
    }).catch((error) => {
      console.log(error);
    });

  }

  const smallChampionClicked = (name) => {
    championRef.current.value = name;
  }

  const inputChampions = championInputList.map(champion =>
    <ChampionSmall
      onClick={smallChampionClicked}
      key={champion.id}
      image={champion.image}
      name={champion.name}
    />);


  const champions = championList.map(champion =>
    <Champion
      key={champion.id}
      image={champion.image}
      gender={champion.gender}
      position={champion.position}
      region={champion.region}
      rangeType={champion.rangeType}
      releaseYear={champion.releaseYear}
      resource={champion.resource}
      species={champion.species}
    />);

  return (
    <div className={classes.container}>
      {!gameOver &&
        <form onSubmit={submitHandler}>
          <input stype="text" ref={championRef}
            onChange={inputChangedHandler}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
            onFocus={() => setIsInputFocused(true)}
          />
          <button>Submit</button>

          <div className={classes.inputList}> {isInputFocused && inputChampions}</div>
        </form>
      }
      {gameOver && <p>You guessed The Champion!</p>}

      <div className={classes.championTags}>
        <div>Champion</div>
        <div>Gender</div>
        <div>Postion(s)</div>
        <div>Species</div>
        <div>Resource</div>
        <div>Range Type</div>
        <div>Region(s)</div>
        <div>Release Year</div>
      </div>

      <div className={classes.champions}>
        {champions}
      </div>

    </div>

  );
};

export default ClassicMode;
