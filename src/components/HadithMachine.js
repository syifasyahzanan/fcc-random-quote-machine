import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './style.css';
import { AnimateOnChange } from 'react-animation';

const HadithMachine = ({ assignNewHadithIndex, generateNewHadith, assignNewColorIndex, generateNewColor }, props) => (

    <Card style={{ padding: '1rem' }}>
        <CardContent>
            {
            generateNewHadith ?
            (
                <Typography
                    style={{ color: 'pink' }}
                    id="text">
                    <AnimateOnChange durationOut="1000" animationIn="fadeIn" animationOut="fadeOut">
                        {generateNewHadith.quote} <br /><br />- <span id="author">{generateNewHadith.reference}</span> -
                    </AnimateOnChange>
                </Typography>
            ) : null
            }    
        </CardContent>
        <CardActions style={{justifyContent:"space-between"}}>
            <Button
                style={{backgroundColor: 'pink', color: 'white'}}
                id="new-quote"
                size="large"
                onClick={() => {
                    assignNewHadithIndex();
                    assignNewColorIndex();
                    document.getElementById("text").style.color = generateNewColor;
                    document.getElementById("new-quote").style.backgroundColor = generateNewColor;
                    document.getElementById("tweet-quote").style.backgroundColor = generateNewColor;
                    document.getElementById("bg").style.backgroundColor = generateNewColor;
                }}
            >Next Hadith</Button>
            <IconButton
                style={{backgroundColor: 'pink', color: 'white', borderRadius: '10%'}}
                id="tweet-quote"
                target="_blank"
                href={encodeURI(`https://twitter.com/intent/tweet?text=${generateNewHadith.quote}&hashtags=hadith`)}
            >
                <TwitterIcon fontSize='small'></TwitterIcon>
            </IconButton>
        </CardActions>
    </Card>
);

export default HadithMachine