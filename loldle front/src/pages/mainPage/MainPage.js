import classes from './MainPage.module.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
    const navigate = useNavigate();

    const redirectToClassic = () => {
        navigate("/classic");
    }

    return (
        <Fragment>
            <div className={classes.align}>
                <button onClick={redirectToClassic}>Classic</button>
            </div>
        </Fragment>
    );
}

export default MainPage;