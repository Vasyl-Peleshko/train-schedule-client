import './globals.css';

export const metadata = {
  title: 'Train Schedule',
  description: 'Manage train schedules',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-floralwhite min-h-screen">{children}</body>
    </html>
  );
}
