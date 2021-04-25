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
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/store'
import Form from './src/screens'

enableScreens()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'blue' : 'red',
  };

  return (
    <>
    <SafeAreaView style={[backgroundStyle], { flex: 0 }} />
    <SafeAreaView style={[backgroundStyle], { flex: 1 }}>
      <StatusBar style={backgroundStyle} 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ReduxProvider store={store}>
          {/* <Navigation /> */}
          <Form />
      </ReduxProvider>
    </SafeAreaView>
  </>
  );
};

export default App;
