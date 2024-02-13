import { Linking } from 'react-native';
import { schemeLinkConfig } from '@/presentation/schemeLink/schemeLinkConfig';

export const linking = {
  prefixes: ['gabojait://'],
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },

  subscribe(listener: (url: string) => void) {
    console.log('linking subscribe to ', listener);
    const onReceiveURL = (event: { url: string }) => {
      const { url } = event;
      console.log('link has url ', url, event);
      return listener(url);
    };

    Linking.addEventListener('url', onReceiveURL);
    return () => {
      console.log('linking unsubscribe to ', listener);
      Linking.removeAllListeners('url');
    };
  },
  schemeLinkConfig,
};
