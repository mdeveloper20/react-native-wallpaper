import React from 'react';
import HomePage from './src/HomePage';

import { AppLoading } from 'expo';
import { Container, Drawer, StyleProvider } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import SideBar from './src/SideBar';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  closeDrawer() {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this._drawer._root.open()
  };


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(material)} >
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar />} >
          <Container>
            <HomePage openDrawer={this.openDrawer.bind(this)} />

          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}