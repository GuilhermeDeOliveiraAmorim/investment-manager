import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
        Bem-vindo ao Gerenciamento de Ativos e Clientes
      </h1>
      <p className="text-indigo-600 max-w-xl mb-10">
        Aqui você pode criar e gerenciar seus usuários, além de visualizar e
        acompanhar seus ativos financeiros de forma simples e eficiente.
      </p>

      <div className="flex gap-8">
        <Link href="/clients/new">
          <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition inline-block text-center">
            Criar Clientes
          </div>
        </Link>

        <Link href="/clients">
          <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition inline-block text-center">
            Gerenciar Clientes
          </div>
        </Link>

        <Link href="/assets">
          <div className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition inline-block text-center">
            Ver Ativos
          </div>
        </Link>
      </div>
    </div>
  );
}
