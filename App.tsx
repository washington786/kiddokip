import useLoadAppFonts from '@/hooks/loadFonts/useLoadAppFonts';
import ProviderWraper from './src/components/common/ProviderWraper';
import WalkthroughPage from './src/ui/pages/WalkthroughPage';
import { RSplash } from '@/components/common';

export default function App() {

  /* loading application fonts */
  const { loadedApplicationFonts } = useLoadAppFonts();
  if (!loadedApplicationFonts) return <RSplash />
  /* end  */


  return (
    <ProviderWraper>
      <WalkthroughPage />
    </ProviderWraper>
  );
}
