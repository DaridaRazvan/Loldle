import classes from './ClassicMode.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { championActions } from '../../store/champion';
import { useEffect, useRef, useState } from 'react';

import Champion from '../../components/Champion';
import ChampionSmall from '../../components/ChampionSmall';

const ClassicMode = () => {
  const dispatch = useDispatch();
  const champion = useSelector(state => state.champion.champion);
  const championRef = useRef();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [championList, setChampionList] = useState([]);
  const [championInputList, setChampionInputList] = useState([]);

  useEffect(() => {
    const fetchChampion = async () => {
      const response = await fetch('http://localhost:8080/api/champion/random');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();
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
    }

    fetchChampion().catch((error) => {
      console.log("Error: ", error)
    })

  }, [dispatch])

  const oneChampionInInputList = () => {
    if(championInputList.length === 1){
      championRef.current.value = championInputList[0].name;
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const getChampion = async () => {
      
      const inputChampion = championRef.current.value;
      const response = await fetch(`http://localhost:8080/api/champion/get/${inputChampion}`);

      if (!response.ok) {
        throw new Error(response.status)
      }
      console.log(response.status);
      const responseData = await response.json();


      setChampionList(championList => [responseData, ...championList]);

      if (inputChampion === champion.name) {
        setGameOver(true);
      }
    }

    oneChampionInInputList();
    getChampion().catch((error) => {
      console.log(error);
    });
    championRef.current.value = '';
    setChampionInputList([]);
  }

  const inputChangedHandler = (event) => {

    const getChampions = async () => {
      const response = await fetch(`http://localhost:8080/api/champion/get/prefix/${event.target.value}`);

      if (!response.ok) {
        throw new Error(response.status)
      }
      const responseData = await response.json();

      //setChampionInputList([]);
      const inputChampions = [];
      for (const key in responseData) {
        inputChampions.push({
          id: responseData[key].id,
          image: responseData[key].image,
          name: responseData[key].name
        });
      }

      setChampionInputList(inputChampions);
    }

    setChampionInputList([]);
    if (event.target.value !== '') {
      getChampions().catch((error) => {
        console.log(error);
      });
    }
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
      {!gameOver && <form onSubmit={submitHandler}>
        <input type="text" ref={championRef}
          onChange={inputChangedHandler}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
          onFocus={() => setIsInputFocused(true)}
        />
        <button>Submit</button>
        {isInputFocused && inputChampions}

      </form>}
      {gameOver && <p>You guessed The Champion!</p>}

      <div className={classes.champions}>
        {champions}
      </div>

    </div>

  );
};

export default ClassicMode;
