import Navbar from "./components/Navbar";
import SearchProvidervider from "./components/SearchProvider";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white dark:bg-black dark:text-gray-100 w-full justify-center">
      <div className="w-[90%] max-w-screen-lg">
        <Navbar font="serif" darkMode={false} />
        <SearchProvidervider/>
      </div>
    </main>
  );
}
