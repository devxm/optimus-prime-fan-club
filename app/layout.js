import "../styles/global.css";
import Nav from "./components/Nav";

export const metadata = {
  title: "Optimus Prime Fan Club",
  description:
    "A server-rendered fan tribute to Optimus Prime and his eternal battle with Megatron.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
