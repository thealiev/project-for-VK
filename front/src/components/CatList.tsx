import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCats } from "../store/catsSlice";
import { RootState, AppDispatch } from "../store/store";
import { Cat } from "../types";
import { addFavorite } from "../store/favoritesSlice";
import { FaHeart } from "react-icons/fa";

interface CatListProps {
  userId: string;
}

const CatList: React.FC<CatListProps> = ({ userId }) => {
  const dispatch: AppDispatch = useDispatch();
  const cats = useSelector((state: RootState) => state.cats.cats);
  const status = useSelector((state: RootState) => state.cats.status);
  const error = useSelector((state: RootState) => state.cats.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCats());
    }
  }, [status, dispatch]);

  const handleAddFavorite = (cat: Cat) => {
    console.log("Adding favorite cat:", cat);
    dispatch(addFavorite({ userId, catId: cat.id }));
  };


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-12 h-12 border-t-8 border-violet-800 border-solid rounded-full animate-spin"
          style={{ animation: `spin 1s linear infinite` }}
        ></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-500">
        {error || "Failed to load cats."}
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cat List</h1>
      {cats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cats.map((cat: Cat) => (
            <div
              key={cat.id}
              className="border rounded-lg overflow-hidden shadow-lg relative"
            >
              <img
                className="object-cover rounded-lg w-full h-48"
                src={cat.url}
                alt={cat.id}
              />
              <div className="p-3">
                {cat.breeds && cat.breeds.length > 0 && (
                  <div>
                    <p className="font-semibold">Breed: {cat.breeds[0].name}</p>
                    <p className="text-sm">
                      Description: {cat.breeds[0].description}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => handleAddFavorite(cat)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <FaHeart size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-3xl text-red-500">No cats available :(</p>
      )}
    </div>
  );
};

export default CatList;
