import { useSelector } from 'react-redux';
import classes from './Champion.module.css';

const Champion = (props) => {
    const champion = useSelector(state => state.champion.champion);

    const comparePositions = () => {
        if(champion.position === props.position){
            return classes.valid;
        }
        const positionsGoodChamp = champion.position.split(", ");
        const positionChoosenChamp = props.position.split(", ");

        for(const element in positionChoosenChamp){
            if(positionsGoodChamp.includes(positionChoosenChamp[element])){
                return classes.half;
            }
        }
        return classes.invalid;
    } 

    const compareRegions = () => {
        if(champion.region === props.region){
            return classes.valid;
        }
        const regionsGoodChamp = champion.region.split(", ");
        const regionChoosenChamp = props.region.split(", ");

        for(const element in regionChoosenChamp){
            if(regionsGoodChamp.includes(regionChoosenChamp[element])){
                return classes.half;
            }
        }
        return classes.invalid;
    } 

    const compareYears = () => {
        if(champion.releaseYear ===props.releaseYear){
            return classes.valid;
        }

        if(props.releaseYear < champion.releaseYear){
            return classes.superior;
        }
        return classes.inferior;
    }

    const genderControlClasses = `${classes.control} ${champion.gender === props.gender? classes.valid : classes.invalid}`;
    const positionControlClasses = `${classes.control} ${comparePositions()}`;
    const speciesControlClasses = `${classes.control} ${champion.species === props.species? classes.valid : classes.invalid}`;
    const resourceControlClasses = `${classes.control} ${champion.resource === props.resource? classes.valid : classes.invalid}`;
    const rangeTypeControlClasses = `${classes.control} ${champion.rangeType === props.rangeType? classes.valid : classes.invalid}`;
    const regionControlClasses = `${classes.control} ${compareRegions()}`;
    const releaseYearControlClasses = `${classes.control} ${compareYears()}`;

    return (
        <div className={classes.champion}>
            <div className={classes.imgControl}>
                <img src={props.image} alt="Loading" />
            </div>
            <div className={genderControlClasses}>
                <span>{props.gender}</span>
            </div>
            <div className={positionControlClasses}>
                <span>{props.position}</span>
            </div>
            <div className={speciesControlClasses}>
                <span>{props.species}</span>
            </div>
            <div className={resourceControlClasses}>
                <span>{props.resource}</span>
            </div>
            <div className={rangeTypeControlClasses}>
                <span>{props.rangeType}</span>
            </div>
            <div className={regionControlClasses}>
                <span>{props.region}</span>
            </div>
            <div className={releaseYearControlClasses}>
                <span>{props.releaseYear}</span>
            </div>


        </div>
    )
}

export default Champion;