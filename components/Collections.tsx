import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}
              className="relative">
              <div className="flex shadow-lg p-2">
                <div className="w-[100%] my-auto px-2">
                  <p className="capitalize">{collection.title}</p>
                </div>
                <Image
                  key={collection._id}
                  src={collection.image}
                  alt={collection.title}
                  width={50}
                  height={100}
                  objectFit="cover" // Legacy property
                  className="rounded-lg cursor-pointer"
                />

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
