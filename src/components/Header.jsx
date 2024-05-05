import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-orange-400 text-black mb-4">
      <div className="flex items-center">
        <Link href="http://localhost:3000">
          <button className="bg-orange-300 text-gray-900 hover:bg-orange-600 font-bold py-2 px-4 rounded font-mono">Accueil</button>
        </Link>
      </div>
      <div className="flex justify-between items-center p-4">
        <Link href="https://www.instagram.com/thoomvs_" target="_blank" rel="noopener noreferrer">
          <img src="/logo.png" alt="Logo" className="h-11 mr-6"></img>
        </Link>
        <h1 className="text-center flex-1 font-mono text-2xl italic">Find My Address </h1>
      </div>
      <div className="flex items-center justify-end">
        <Link href="http://localhost:3000/addresses/create">
          <button className="bg-orange-300 text-gray-900 hover:bg-orange-600 font-bold py-2 px-4 rounded font-mono">Créer</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
