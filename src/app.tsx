import I18nProvider from "@/core/providers/i18n";
import { ToastProvider } from "@/core/providers/toast";
import GlobalStyle from "@/core/styles/global";
import Routes from "@/routes";
import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/core/services/queryClient";
import "@/core/styles/global-styles.css";
import { SETCTheme } from "@/core/theme";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Suspense fallback="">
          <ChakraProvider theme={SETCTheme}>
            <ToastProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </ToastProvider>
          </ChakraProvider>
        </Suspense>

        <GlobalStyle />
      </I18nProvider>
    </QueryClientProvider>
  );
};

export default App;
