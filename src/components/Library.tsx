import TimeBuckets from "./TimeBuckets.tsx";
import { AssetOrder, TimeBucketSize } from "@immich/sdk";
import { useParams } from "@solidjs/router";
import { Portal } from "solid-js/web";
import Photo from "./Photo.tsx";

const Library = () => {
  const params = useParams();
  return (
    <>
      {params.assetId && (
        <Portal>
          <div class={"absolute left-0 top-0 w-screen"}>
            <Photo />
          </div>
        </Portal>
      )}
      <div class={"h-full overflow-y-auto p-4"}>
        <TimeBuckets
          bucketsOptions={{
            isArchived: false,
            size: TimeBucketSize.Month,
            withPartners: true,
            withStacked: true,
          }}
          bucketOptions={{
            order: AssetOrder.Desc,
            size: TimeBucketSize.Month,
          }}
        />
      </div>
    </>
  );
};

export default Library;
