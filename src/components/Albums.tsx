import { AlbumResponseDto, getAllAlbums } from "@immich/sdk";
import { createEffect, createResource, onCleanup } from "solid-js";
import savedPosition from "@/store/savedPosition.ts";
import dayjs from "dayjs";

const Albums = () => {
  const [albums, {}] = createResource(() => getAllAlbums({}), {});
  const [albumsGroupByYear] = createResource(albums, (_albums) => {
    const albumsMap = new Map();
    for (const album of _albums.sort((a, b) =>
      dayjs(a.endDate).isAfter(b.endDate) ? -1 : 1,
    )) {
      const year = dayjs(album.endDate).year();
      if (!albumsMap.has(year)) {
        albumsMap.set(year, []);
      }
      albumsMap.get(year).push(album);
    }
    return Array.from(albumsMap.values());
  });

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
    <div class={"flex h-full flex-col p-8"}>
      {albums.loading && (
        <div class={"flex h-full w-full items-center justify-center"}>
          <div class={"loading loading-infinity loading-lg"}></div>
        </div>
      )}
      {albumsGroupByYear() && (
        <div class={"flex-1 overflow-y-auto"} ref={el}>
          {albumsGroupByYear()?.map((ay: AlbumResponseDto[]) => (
            <div class={"mt-8"}>
              <h3 class={"text-3xl font-bold"}>
                {dayjs(ay[0].endDate).format("YYYY")}
                <span class={"ml-2 text-base font-medium"}>
                  ({ay.length} 个相册)
                </span>
              </h3>
              <div class={"divider my-1 h-2"}></div>
              <div class={"grid grid-cols-6"}>
                {ay.map((album) => (
                  <a
                    href={`/albums/${album.id}`}
                    class={
                      "cursor-pointer rounded-lg p-4 transition hover:bg-gray-100 hover:shadow"
                    }
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
          ))}
        </div>
      )}
      {/*{albums() && (
        <div class={"flex-1 overflow-y-auto"} ref={el}>
          <div class={"grid grid-cols-6"}>
            {albums()
              ?.sort((a, b) => (dayjs(a.endDate).isAfter(b.endDate) ? -1 : 1))
              ?.map((album) => (
                <a
                  // onClick={() => navigate(`/albums/${album.id}`)}
                  href={`/albums/${album.id}`}
                  class={
                    "cursor-pointer rounded-lg p-6 transition hover:bg-gray-100 hover:shadow"
                  }
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
      )}*/}
    </div>
  );
};

export default Albums;
