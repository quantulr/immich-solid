import {
  AssetOrder,
  getTimeBuckets,
  TimeBucketResponseDto,
  TimeBucketSize,
} from "@immich/sdk";
import { createResource } from "solid-js";
import TimeBucket from "@/components/TimeBucket.tsx";
import { Portal } from "solid-js/web";
import Photo from "@/components/Photo.tsx";
import { useParams } from "@solidjs/router";

interface BucketsOptions {
  albumId?: string;
  isArchived?: boolean;
  isFavorite?: boolean;
  isTrashed?: boolean;
  key?: string;
  order?: AssetOrder;
  personId?: string;
  size: TimeBucketSize;
  tagId?: string;
  userId?: string;
  withPartners?: boolean;
  withStacked?: boolean;
}

interface BucketOptions {
  albumId?: string;
  isArchived?: boolean;
  isFavorite?: boolean;
  isTrashed?: boolean;
  key?: string;
  order?: AssetOrder;
  personId?: string;
  size: TimeBucketSize;
  tagId?: string;
  timeBucket?: string;
  userId?: string;
  withPartners?: boolean;
  withStacked?: boolean;
}

const TimeBuckets = ({
  bucketsOptions,
  bucketOptions,
}: {
  bucketsOptions: BucketsOptions;
  bucketOptions: BucketOptions;
}) => {
  const params = useParams();

  const [buckets] = createResource(() => getTimeBuckets(bucketsOptions));
  return (
    <>
      {buckets.loading && (
        <div class={"flex h-full w-full items-center justify-center"}>
          <div class={"loading loading-infinity loading-lg"}></div>
        </div>
      )}
      {buckets.error && <div>error</div>}

      {params.assetId && (
        <Portal>
          <div class={"absolute left-0 top-0 z-50 w-screen transition"}>
            <Photo />
          </div>
        </Portal>
      )}

      {buckets()?.map((bucket: TimeBucketResponseDto) => (
        <TimeBucket
          timeBucketOptions={{
            ...bucketOptions,
            timeBucket: bucket.timeBucket,
            albumId: bucketsOptions.albumId,
          }}
          count={bucket.count}
        />
      ))}
    </>
  );
};

export default TimeBuckets;
