const Header = () => {
  return (
    <header className="h-20 px-12 flex items-center justify-between shadow-md">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2132/2132763.png"
        alt="Logo"
        className="h-14 cursor-pointer"
      />
      <h1 className="text-3xl font-bold text-center">Monitoring Screen</h1>
      <div className="flex items-center gap-3">
        <button className="text-white px-12 py-2 transition-colors duration-300 ease-in-out bg-blue-300 hover:bg-blue-400 rounded-md shadow-md">
          History
        </button>
        <button className="text-white px-12 py-2 transition-colors duration-300 ease-in-out bg-blue-300 hover:bg-blue-400 rounded-md shadow-md">
          Table
        </button>
      </div>
    </header>
  );
};

export default Header;
