import {
  AssetOrder,
  getTimeBuckets,
  TimeBucketResponseDto,
  TimeBucketSize,
} from "@immich/sdk";
import { createResource } from "solid-js";
import TimeBucket from "./TimeBucket.tsx";

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
  const [buckets] = createResource(() => getTimeBuckets(bucketsOptions));
  return (
    <>
      {buckets.loading && (
        <div class={"flex h-full w-full items-center justify-center"}>
          <div class={"loading loading-infinity loading-lg"}></div>
        </div>
      )}
      {buckets.error && <div>error</div>}
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
