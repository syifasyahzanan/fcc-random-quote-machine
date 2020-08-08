import React, { Component } from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import HadithMachine from './components/HadithMachine';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hadith: [],
      selectedHadithIndex: null,
      themeColor: 'pink',
      colorArray: ['#2F5682','#515F94','#7468A2','#976FAC','#BA76B1','#DB7EB1','#007CA4','#00A3AF','#00C6A0','#6587B7','#4A4E8D','#952C54','#77E9B3','#952C54','#CF6185','#828310','#4D9F43','#B492AD'],
    }
    this.assignNewColorIndex = this.assignNewColorIndex.bind(this)
    this.generateNewColorIndex= this.generateNewColorIndex.bind(this)
    this.assignNewHadithIndex = this.assignNewHadithIndex.bind(this);
    this.generateNewHadithIndex = this.generateNewHadithIndex.bind(this);
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/syifasyahzanan/0d4da0bc11bb6b052f0d56f270070c33/raw/18c26594deefe281e2ac6b2c39caf597d341c67f/hadith.json')
      .then(data => data.json())
      .then(quotes => this.setState({ hadith: quotes }, this.assignNewHadithIndex));
  }

  get generateNewHadith() {
    if (!this.state.hadith.length || !Number.isInteger(this.state.selectedHadithIndex)) {
      return undefined;
    }
    return this.state.hadith[this.state.selectedHadithIndex];
  }

  generateNewHadithIndex() {
    if (!this.state.hadith.length) {
      return undefined;
    }
    return random(0, this.state.hadith.length - 1);
  }

  assignNewHadithIndex() {
    this.setState({ 
      selectedHadithIndex: this.generateNewHadithIndex()
    });
  }


/*
 * This code for generating random color 
 */
  generateNewColorIndex() {
    if (!this.state.colorArray.length) {
      return undefined;
    }
    return random(0, this.state.colorArray.length - 1)
  }

  assignNewColorIndex() {
    this.setState({
      themeColor: this.state.colorArray[this.generateNewColorIndex()]
    })
  }

  get generateNewColor() {
    if (!this.state.colorArray.length) {
      return undefined;
    }
    return this.state.colorArray[this.generateNewColorIndex()]
  }



  render() {
    return (
      <div style={{backgroundColor: "pink"}}
           id="bg"
           >
        <Grid className={this.props.classes.container}
              id="quote-box"
              justify="center"
              container>
            <Grid xs={11} lg={7} item>
              {
                this.generateNewHadith
                ? <HadithMachine generateNewHadith={this.generateNewHadith} assignNewHadithIndex={this.assignNewHadithIndex} generateNewColor={this.generateNewColor} assignNewColorIndex={this.assignNewColorIndex} />
                : null
              }
            </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(App);
