import { getAllAlbums } from "@immich/sdk";
import { createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Albums = () => {
  const [albums, {}] = createResource(() => getAllAlbums({}), {});
  const navigate = useNavigate();
  return (
    <div class={"flex h-full flex-col p-4"}>
      {albums.loading && <div class={"h-full w-full flex justify-center items-center"}>
        <div class={"loading loading-infinity loading-lg"}></div>
      </div>}
      {albums() && (
        <div class={"flex-1 overflow-y-auto"}>
          <div class={"grid grid-cols-6 gap-2"}>
            {albums()?.map((album) => (
              <div
                onClick={() => navigate(`/albums/${album.id}`)}
                class={"cursor-pointer"}
              >
                <img
                  class={"aspect-square w-full rounded-lg object-cover"}
                  src={`/api/assets/${album.albumThumbnailAssetId}/thumbnail`}
                  alt={""}
                />
                <h2 class={"mt-1 truncate text-center font-bold"}>
                  {album.albumName}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
