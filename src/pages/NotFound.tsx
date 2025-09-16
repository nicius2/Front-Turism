export function NotFound() {
    return (
        <div className="w-screen h-screen bg-[url('/src/assets/backgroundNotFound.svg')] bg-cover bg-center bg-no-repeat">
            <div className="w-full h-full flex items-center text-white justify-center flex-col">
                <h1 className="text-3xl mt-40">Página não Encontrada</h1>
                <h2 className="text-9xl">404</h2>
            </div>
        </div>
    )
}