import "./globals.css";
import {EventsProvider} from "./context";
import Year from "./yearNav";

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
	  <body>
	  <EventsProvider>
	      <nav>
	      <Year/>
	      </nav>
	      {children}
	  </EventsProvider>
      </body>
      </html>
  );
}

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
