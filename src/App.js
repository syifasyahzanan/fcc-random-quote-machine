import React, { Component } from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core'
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
      selectedHadithIndex: null
    }
    this.assignNewHadithIndex = this.assignNewHadithIndex.bind(this)
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

  assignNewHadithIndex () {
    this.setState({ selectedHadithIndex: this.generateNewHadithIndex() })
  }


  render() {
    return (
      <Grid className={this.props.classes.container} id="quote-box" justify="center" container>
        <Grid xs={11} lg={4} item>
          {
            this.generateNewHadith
            ? <HadithMachine generateNewHadith={this.generateNewHadith} assignNewHadithIndex={this.assignNewHadithIndex} />
            : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
