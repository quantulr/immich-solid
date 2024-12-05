import { AssetOrder, getTimeBucket, TimeBucketSize } from "@immich/sdk";
import { createResource, createSignal, onMount } from "solid-js";
import dayjs from "dayjs";
import { inView } from "motion";
import { useNavigate } from "@solidjs/router";

interface TimeBucketOptions {
  albumId?: string;
  isArchived?: boolean;
  isFavorite?: boolean;
  isTrashed?: boolean;
  key?: string;
  order?: AssetOrder;
  personId?: string;
  size: TimeBucketSize;
  tagId?: string;
  timeBucket: string;
  userId?: string;
  withPartners?: boolean;
  withStacked?: boolean;
}

const TimeBucket = ({
  timeBucketOptions,
  count,
}: {
  timeBucketOptions: TimeBucketOptions;
  count: number;
}) => {
  const navigate = useNavigate();

  let el!: HTMLDivElement;

  const [isInView, setIsInView] = createSignal(false);

  onMount(() => {
    inView(el, (intersection) => {
      console.log(intersection.isIntersecting);
      if (intersection.isIntersecting) {
        setIsInView(true);
      }
    });
  });

  const [bucket] = createResource(
    () => (isInView() ? timeBucketOptions.timeBucket : null),
    () => getTimeBucket(timeBucketOptions),
  );
  return (
    <div class={"mt-8"} ref={el}>
      <h2 class={"text-sm font-bold"}>
        {dayjs(timeBucketOptions.timeBucket).format("YYYY年M月")}
      </h2>
      <div class={"mt-1 grid grid-cols-6 gap-1"}>
        {!bucket() &&
          [...Array(count).keys()].map(() => (
            <div class={"aspect-square rounded bg-blue-50"}></div>
          ))}
        {bucket() &&
          bucket()?.map((photo) => (
            <div
              class={"cursor-pointer"}
              onClick={() => {
                navigate(`./photos/${photo.id}`);
              }}
            >
              <img
                class={"aspect-square w-full rounded object-cover"}
                src={`/api/assets/${photo.id}/thumbnail?size=thumbnail&c=${photo.checksum}`}
                alt={""}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimeBucket;
