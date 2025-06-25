import useLoadAppFonts from '@/hooks/loadFonts/useLoadAppFonts';
import { RSplash } from '@/components/common';
import ProviderWraper from '@/components/common/ProviderWraper';
import MainNavigation from '@/navigation/MainNavigation';

export default function App() {

  /* loading application fonts */
  const { loadedApplicationFonts } = useLoadAppFonts();
  if (!loadedApplicationFonts) return <RSplash />
  /* end  */

  return (
    <ProviderWraper>
      <MainNavigation />
    </ProviderWraper>
  );
}
