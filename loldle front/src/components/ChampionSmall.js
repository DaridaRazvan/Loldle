import classes from './ChampionSmall.module.css';

const ChampionSmall = (props) => {
    return (
        <div className={classes.champion}>
            <div className={classes.container} onClick={() => props.onClick(props.name)}>
                <div className={classes.image}>
                    <img src={props.image} width="50px" height="50px" alt="Loading" />
                </div>
                <div>
                    <span>{props.name}</span>
                </div>
            </div>
        </div>
    );
}

export default ChampionSmall;