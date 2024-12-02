import TimeBuckets from "./TimeBuckets.tsx";
import { AssetOrder, TimeBucketSize } from "@immich/sdk";

const Library = () => {
  return (
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
  );
};

export default Library;
