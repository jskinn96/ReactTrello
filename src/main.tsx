// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { DarkMode, LightMode } from './styles/theme';
import Reset from './styles/resetCSS';
import { ThemeAtom } from './recoil';

const ThemedEl = () => { 
  
  const ThemeMode = useRecoilValue(ThemeAtom) === "dark" 
                  ? DarkMode
                  : LightMode;

  return (
    <ThemeProvider theme={ThemeMode}>
      <Reset />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <>
    <RecoilRoot>
      <ThemedEl />
    </RecoilRoot>
  </>,
)