import BarraSuperior from "@/components/BarraSuperior.jsx"
import './globals.css'
export default function HomeLayout({children}){
   
    return (
        <html>
            <body>
                <BarraSuperior/>
                {children}
            </body>
        </html>
    )
}


