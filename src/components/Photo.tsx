import { useNavigate, useParams } from "@solidjs/router";
import { getAssetInfo } from "@immich/sdk";
import { createResource } from "solid-js";
import { TbChevronLeft } from "solid-icons/tb";

const Photo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [asset] = createResource(params.assetId, (id) =>
    getAssetInfo({
      id,
    }),
  );
  return (
    <div class={"relative h-screen bg-gray-950"}>
      <div
        class={
          "absolute top-0 flex h-16 w-full items-center justify-between bg-gradient-to-b from-black px-4"
        }
      >
        <button
          class={
            "btn btn-circle btn-ghost btn-sm hover:bg-white hover:bg-opacity-20"
          }
          onClick={() => {
            if (params.albumId) {
              navigate(`/albums/${params.albumId}`);
            } else {
              navigate(`/`);
            }
          }}
        >
          <TbChevronLeft class={"text-3xl text-white"} />
        </button>
      </div>
      {asset.loading && (
        <div class={"flex h-full items-center justify-center"}>
          <div class={"loading loading-infinity loading-lg"}></div>
        </div>
      )}
      {asset() && (
        <img
          class={"mx-auto h-full object-contain"}
          src={`/api/assets/${asset()?.id}/thumbnail?size=preview&c=${asset()?.checksum}`}
          alt={""}
        />
      )}
    </div>
  );
};

export default Photo;
