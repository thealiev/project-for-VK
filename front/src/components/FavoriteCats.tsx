import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { FaTrash } from "react-icons/fa";
import { fetchFavorites, removeFavorite } from "../store/favoritesSlice";

interface FavoriteCatsProps {
  userId: string;
}

const FavoriteCats: React.FC<FavoriteCatsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { favorites, status, error } = useAppSelector(
    (state) => state.favorites
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [userId, dispatch]);

 const handleRemoveFavorite = (favoriteId: string) => {
   dispatch(removeFavorite(favoriteId));
 };



  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Любимые котики</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="border rounded-lg shadow-lg p-4 bg-white flex flex-col items-center"
          >
            <img
              src={fav.cat.url}
              alt={fav.cat.id}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold mb-2">
              {fav.cat.breeds?.[0]?.name || "Unknown Breed"}
            </h3>
            <button
              onClick={() => handleRemoveFavorite(fav.id.toString())}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash className="mr-2" />
              Удалить из любимых
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCats;
