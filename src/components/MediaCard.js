import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import '../index.css';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./playerImages', false,  /\.(jpg)$/));

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(`${date} UTC`);
  newDate.toString()
  return newDate;
}


const theme = createMuiTheme();

theme.typography.h5 = {
  '@media (max-width:370px)': {
    fontSize: '0.1rem',
  },
  '@media (max-width:700px)': {
    fontSize: '7px',
  },
};



export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <div>
      {
        props.ele &&
      <Card className={classes.root}>
      <CardActionArea>
        {images[`${props.ele.Id}.jpg`] !==undefined ?
        <CardMedia
          component="img"
          image={images[`${props.ele.Id}.jpg`].default}
          title={props.ele.PFName}
        />
        :
        <></>
}
        <CardContent>
        <ThemeProvider theme={theme}>
        <Typography variant="h5" component="h2">
        {props.ele.PFName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {props.ele.SkillDesc}
        </Typography>
        <Typography variant="body2" component="p">
          ${props.ele.Value}
        </Typography>
          {props.ele.UpComingMatchesList.map((lst,key)=>
          <Typography variant="body2" component="p">
          <b>Upcoming Match:</b> {lst.CCode} Vs {lst.VsCCode} <br/>
          <b>Time:</b> {convertUTCDateToLocalDate(lst.MDate).toTimeString()}
          </Typography>
          )}
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
      }
    </div>
    
  );
}
