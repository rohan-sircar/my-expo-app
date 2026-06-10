import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

// Browser-only hook — only works in react-native-web builds.
// Commented out in _layout.tsx since it doesn't work in native.
function useRouteTitle() {
  if (Platform.OS !== 'web') return null;

  const currentRoute = useNavigationState((state) => state.routes[state.index]);

  useEffect(() => {
    const updateTitle = (routeName: string) => {
      let params = currentRoute?.params as { screen?: string } | undefined;
      const title = params?.screen || 'Home';
      document.title = title ? `My Web App | ${title}` : 'My App';
    };

    if (currentRoute?.name) {
      updateTitle(currentRoute.name);
    }

    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      const routeName = path.split('/').pop();
      if (routeName) {
        updateTitle(routeName);
      }
    });

    return () => {
      window.removeEventListener('popstate', () => {});
    };
  }, [currentRoute]);

  return null;
}

export default useRouteTitle;
