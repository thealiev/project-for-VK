import { useState } from "react";
import CatList from "./components/CatList";
import FavoriteCats from "./components/FavoriteCats";
import { FaRegHeart } from "react-icons/fa";
import { TiThSmall } from "react-icons/ti";

const App: React.FC = () => {
  const [userId] = useState('');
  const [view, setView] = useState("cats");

  return (
    <div className="">
      <div className="bg-blue-500 p-8 flex gap-20 mb-8">
        <button
          className="p-3 bg-white rounded-xl hover:bg-red-500 hover:text-white flex items-center gap-4"
          onClick={() => setView("cats")}
        >
          <TiThSmall size={20}/>
          Все котики
        </button>
        <button
          className="p-3 bg-white rounded-xl hover:bg-red-500 hover:text-white flex items-center gap-4"
          onClick={() => setView("favorites")}
        >
          <FaRegHeart size={20} />
          Любимые котики
        </button>
      </div>

      {view === "cats" && <CatList userId={userId} />}
      {view === "favorites" && <FavoriteCats userId={userId} />}
    </div>
  );
};

export default App;
