import App_Wrapper from "./_components/App_Wrapper";

import "./globals.css";

export const metadata = {
  title: "Frontend Scaffold",
  description: "Frontend web app starter code",
  icons: {
    icon: "/favicon.svg",
  },
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
