import {Inter} from "next/font/google";
import Header from "@/_components/header";
import Footer from "@/_components/footer";
import 'bootstrap/dist/css/bootstrap.css'
import Sidebar from "@/_components/sidebar";
// import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Chat",
    description: "The best chat on Laravel + NextJS",
};

export default function RootLayout({children}) {
    return (
        <html lang="ru">

        <body>
        <Header/>

        <div className="container-fluid">
            <div className="content">
                <Sidebar/>
                {children}
            </div>
        </div>

        <Footer/>
        </body>

        </html>
    );
}
