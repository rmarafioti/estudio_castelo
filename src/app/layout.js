import App_Wrapper from "./_components/App_Wrapper";

import "./globals.css";

export const metadata = {
  title: "Estúdio Castelo",
  description: "Tattooing and art by Felip de Sousa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <App_Wrapper>{children}</App_Wrapper>
      </body>
    </html>
  );
}
