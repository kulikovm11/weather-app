import BlockFlippedIcon from '@mui/icons-material/BlockFlipped';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Button from '@mui/material/Button';

import style from '../ErrorPage/ErrorPage.module.css'

function ErrorPage({onRetry}) {
    return(
        <div className={style.wrap}>
            <BlockFlippedIcon fontSize='large'/>
            <h1>Something went wrong</h1>
            <h3>We couldn't connect to the server (API error). Please try again in a few moments.</h3>
            <Button 
                variant="outlined" 
                sx={{color:'hsl(0, 0%, 100%)', 
                backgroundColor:'hsl(243, 27%, 20%)'}} 
                size='large'
                onClick={onRetry} 
                ><AutorenewIcon fontSize='large'/> Retry</Button>
        </div>
    )    
}


export {ErrorPage};
