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
    const linkingSubscription = Linking.addEventListener('url', (event: { url: string }) => {
      initializeCache(event.url);
      listener(event.url);
    });
    return () => {
      linkingSubscription.remove();
    };
  },
  schemeLinkConfig,
};
