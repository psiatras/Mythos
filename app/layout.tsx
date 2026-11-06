import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = { title: 'MYTHOS QUEST', description: 'Explore Greece. Unlock the myths. Learn the language.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
