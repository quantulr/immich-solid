import { AssetOrder, getTimeBucket, TimeBucketSize } from "@immich/sdk";
import { createEffect, createResource, createSignal, onMount } from "solid-js";
import dayjs from "dayjs";
import { inView } from "motion";
import { useNavigate } from "@solidjs/router";
import justifiedLayout from "justified-layout";
import livePhotoIcon from "@/assets/live.svg";

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

interface Box {
  width: number;
  height: number;
  top: number;
  left: number;
  aspectRatio: number;
}

interface LayoutResult {
  boxes: Box[];
  containerHeight: number;
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
      if (intersection.isIntersecting) {
        setIsInView(true);
      }
    });
  });

  const [bucket] = createResource(
    () => (isInView() ? timeBucketOptions.timeBucket : null),
    () => getTimeBucket(timeBucketOptions),
  );
  const [layout, setLayout] = createSignal<LayoutResult>();

  createEffect(() => {
    if (bucket()) {
      const items = bucket()!.map((item) => {
        if (["5", "6", "7", "8"].includes(item.exifInfo?.orientation ?? "")) {
          return {
            width: item.exifInfo?.exifImageHeight ?? 0,
            height: item.exifInfo?.exifImageWidth ?? 0,
          };
        } else {
          return {
            width: item.exifInfo?.exifImageWidth ?? 0,
            height: item.exifInfo?.exifImageHeight ?? 0,
          };
        }
      });
      const _layout = justifiedLayout(items, {
        containerPadding: 0,
        containerWidth: 1494,
        boxSpacing: 2,
        // maxNumRows:5
      });
      setLayout(_layout);
      console.log(_layout);
    }
  });

  const [playingLivePhotoId, setPlayingLivePhotoId] = createSignal<string>();
  return (
    <div class={"mt-8"} ref={el}>
      <h2 class={"text-sm font-bold"}>
        {dayjs(timeBucketOptions.timeBucket).format("YYYY年M月")}
      </h2>
      {!bucket() && (
        <div class={"mt-1 grid grid-cols-6 gap-1"}>
          {[...Array(count).keys()].map(() => (
            <div class={"aspect-square rounded bg-blue-50"}></div>
          ))}
        </div>
      )}
      {layout() && bucket() && (
        <div
          class={"relative mt-1"}
          style={{
            height: `${layout()?.containerHeight}px`,
          }}
        >
          {bucket()?.map((photo, index) => (
            <a
              onClick={() => {
                navigate(`./photos/${photo.id}`);
              }}
              class={"relative cursor-pointer overflow-hidden"}
              style={{
                position: "absolute",
                width: `${layout()!.boxes[index].width}px`,
                height: `${layout()!.boxes[index].height}px`,
                left: `${layout()!.boxes[index].left}px`,
                top: `${layout()!.boxes[index].top}px`,
                // "aspect-ratio": `1 / ${layout()!.boxes[index].aspectRatio}`
              }}
            >
              {photo.livePhotoVideoId && (
                <div
                  class={
                    "absolute left-1 top-1 z-40 flex items-center rounded bg-white bg-opacity-50 px-1 py-0.5"
                  }
                  onMouseOver={() => {
                    console.log("开始播放live");
                    // setLivePhotoPlaying(true);
                    if (photo.livePhotoVideoId)
                      setPlayingLivePhotoId(photo.livePhotoVideoId);
                  }}
                  onMouseLeave={() => {
                    console.log("停止播放live");
                    setPlayingLivePhotoId(undefined);
                    // setLivePhotoPlaying(false);
                  }}
                >
                  <img src={livePhotoIcon} alt={""} class={"h-4 w-4"} />
                  <span class={"ml-1 text-xs"}>LIVE</span>
                </div>
              )}
              {photo.livePhotoVideoId &&
                playingLivePhotoId() === photo.livePhotoVideoId && (
                  <video
                    autoplay={true}
                    style={{
                      width: `${layout()!.boxes[index].width}px`,
                      height: `${layout()!.boxes[index].height}px`,
                    }}
                    class={"absolute left-0 top-0"}
                    src={`/api/assets/${photo.livePhotoVideoId}/video/playback?c=${photo.checksum}`}
                  />
                )}
              <img
                style={{
                  width: `${layout()!.boxes[index].width}px`,
                  height: `${layout()!.boxes[index].height}px`,
                }}
                src={`/api/assets/${photo.id}/thumbnail?size=thumbnail&c=${photo.checksum}`}
                alt={""}
              />
            </a>
          ))}
        </div>
      )}
      {/*<div class={"mt-1 grid grid-cols-6 gap-1"}>
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
      </div>*/}
    </div>
  );
};

export default TimeBucket;
