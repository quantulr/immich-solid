import { useParams } from "@solidjs/router";
import { AssetOrder, getAlbumInfo, TimeBucketSize } from "@immich/sdk";
import { createResource } from "solid-js";
import dayjs from "dayjs";
import TimeBuckets from "./TimeBuckets.tsx";
import Photo from "./Photo.tsx";
import { Portal } from "solid-js/web";

const Album = () => {
  const params = useParams();

  const [albumInfo] = createResource(params.albumId, (id: string) =>
    getAlbumInfo({
      id,
    }),
  );

  return (
    <>
      {params.assetId && (
        <Portal>
          <div class={"absolute left-0 top-0 w-screen transition"}>
            <Photo />
          </div>
        </Portal>
      )}
      <div class={"flex h-full flex-col p-4"}>
        {albumInfo() && (
          <div>
            <h2 class={"text-lg font-bold"}>{albumInfo()?.albumName}</h2>
            <p class={"mt-1 text-sm"}>
              <span>{albumInfo()?.assetCount}</span>
              <span>项</span>
              <span class={"ml-3"}>
                {dayjs(albumInfo()?.startDate).format("YYYY年M月D日")}
              </span>
              <span class={"mx-1"}>-</span>
              <span>{dayjs(albumInfo()?.endDate).format("YYYY年M月D日")}</span>
            </p>
          </div>
        )}
        <div class={"flex-1 overflow-y-auto"}>
          <TimeBuckets
            bucketsOptions={{
              albumId: params.albumId,
              order: AssetOrder.Desc,
              size: TimeBucketSize.Month,
            }}
            bucketOptions={{
              order: AssetOrder.Desc,
              size: TimeBucketSize.Month,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Album;
