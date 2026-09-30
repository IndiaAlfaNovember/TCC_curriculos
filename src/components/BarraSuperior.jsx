export default function BarraSuperior(){
return(
    <div className="w-screen h-16 pr-10 pl-10 pt-3 bg-blue-500 flex justify-between">
        <div className=""><img src={null} alt="" /><h1 className="underline underline-offset-1 text-2xl text-white">Conta</h1></div>
        <div className="flex"><h1 className="text-3xl text-blue-600 font-bold">INFO</h1><h1 className="text-3xl text-white font-normal">trabalhos</h1></div>
        <div className=""><h1 className="underline underline-offset-1 text-2xl text-white">Adicionar currículo</h1></div>
        <div className=""><h1 className="underline underline-offset-1 text-2xl text-white">Ver currículos</h1></div>
    </div>       
)
}