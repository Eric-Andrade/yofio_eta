import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { Provider as ReduxProvider } from 'react-redux'
// import { store } from './src/store'
import Form from './src/screens'

enableScreens()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle],{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {/* <ReduxProvider store={store}> */}
          {/* <Navigation /> */}
          <Form />
      {/* </ReduxProvider> */}
{/*       
      <Text
                style={{ color: 'white' }}>
				Hola.
			</Text>  */}
    </SafeAreaView>
  );
};

export default App;
