import "../styles/global.css";

export const metadata = {
  title: "Optimus Prime Fan Club",
  description:
    "A server-rendered fan tribute to Optimus Prime, battling Megatron on Cybertron.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
