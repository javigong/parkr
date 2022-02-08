import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import AppStack from '../client/src/components/stacks/AppStack/AppStack.js'

const App = () => {
  return (
    <NativeBaseProvider>
      <AppStack />
      <StatusBar style='light' />
    </NativeBaseProvider>
  )
}

export default App


