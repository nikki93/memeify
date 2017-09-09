import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  CameraRoll,
} from 'react-native';

export default class App extends React.Component {
  state = {
    imageUri: 'http://i0.kym-cdn.com/photos/images/original/000/008/504/Philosoraptor_template.jpg',
    topText: '',
    bottomText: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ topText: text })}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ bottomText: text })}
        />

        <View
          style={{ margin: 5 }}
          ref={(ref) => this.memeView = ref}>
          <Image
            source={{ uri: this.state.imageUri }}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={[styles.text, { top: 5 }]}>
            {this.state.topText}
          </Text>
          <Text
            style={[styles.text, { bottom: 5 }]}>
            {this.state.bottomText}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPick}>
            <Text>pick a pic!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onTake}>
            <Text>take a pic!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onSave}>
            <Text>save!</Text>
          </TouchableOpacity>
        </View>
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

  _onTake = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
    }
  }

  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.memeView);
    await CameraRoll.saveToCameraRoll(uri);
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    margin: 5,
    padding: 5,
  },
  text: {
    position: 'absolute',
    left: 5, right: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
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
