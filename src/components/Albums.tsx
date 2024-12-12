import { getAllAlbums } from "@immich/sdk";
import { createEffect, createResource, onCleanup } from "solid-js";
import savedPosition from "@/store/savedPosition.ts";

const Albums = () => {
  const [albums, {}] = createResource(() => getAllAlbums({}), {});
  const { top, updateTop } = savedPosition;

  let el!: HTMLDivElement;

  createEffect(() => {
    if (top() && albums()?.length) {
      el.scrollTo({
        top: top(),
      });
    }
  });
  onCleanup(() => {
    updateTop(el.scrollTop);
  });
  return (
    <div class={"flex h-full flex-col p-4"}>
      {albums.loading && (
        <div class={"flex h-full w-full items-center justify-center"}>
          <div class={"loading loading-infinity loading-lg"}></div>
        </div>
      )}
      {albums() && (
        <div class={"flex-1 overflow-y-auto"} ref={el}>
          <div class={"grid grid-cols-6 gap-2"}>
            {albums()?.map((album) => (
              <a
                // onClick={() => navigate(`/albums/${album.id}`)}
                href={`/albums/${album.id}`}
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
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
