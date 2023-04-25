import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/modules/components/Layout/main-layout";
import ModalProvider from "@/core/services/ModalProvider";
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <MainLayout>
        {" "}
        <Component {...pageProps} />
      </MainLayout>
    </ModalProvider>
  );
}

