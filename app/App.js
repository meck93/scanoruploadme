import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./src/reducers/index";

// global store
const store = createStore(reducers);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Provider store={store}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // tab bar font
        ...Icon.Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    // can be used to report the error to the error reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
