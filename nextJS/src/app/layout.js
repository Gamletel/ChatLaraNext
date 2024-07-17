import {Inter} from "next/font/google";
import Header from "@/_components/header";
import Footer from "@/_components/footer";
// import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Chat",
    description: "The best chat on Laravel + NextJS",
};

export default function RootLayout({children}) {
    return (
        <html lang="ru">

        <body className={inter.className}>
        <Header/>

        <div className="container-fluid">
            {children}
        </div>

        <Footer/>
        </body>

        </html>
    );
}
