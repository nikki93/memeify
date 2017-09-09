import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class App extends React.Component {
  state = {
    imageUri: 'http://i0.kym-cdn.com/photos/images/original/000/008/504/Philosoraptor_template.jpg',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ margin: 5 }}>
          <Image
            source={{ uri: this.state.imageUri }}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={{
              position: 'absolute',
              left: 5, top: 5, right: 5,
              color: 'white',
              backgroundColor: 'transparent',
              fontSize: 28,
              fontWeight: '900',
              textAlign: 'center',
            }}>
            hello, world
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this._onPick}>
          <Text>pick a pic!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPick = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
    }
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: '#ddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
