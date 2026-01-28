import PackCard from "./PackCard";

interface Pack {
  id: number;
  name: string;
  price: number;
  image: string;
}

const packsData: Pack[] = [
  { id: 1, name: "Standard Anamons Pack", price: 20, image: "/anamon-packs.png" },
  { id: 2, name: "Elite Anamons Pack", price: 50, image: "/anamon-packs.png" },
  { id: 3, name: "Legendary Anamons Pack", price: 100, image: "/anamon-packs.png" },
  { id: 4, name: "Prime Anamons Pack", price: 200, image: "/anamon-packs.png" },
  { id: 5, name: "OG Anamons Pack", price: 10, image: "/anamon-packs.png" },
];

export default function PacksGrid() {
  return (
    <div className="w-full bg-[#1D1D1D] rounded-xl sm:rounded-[14px] border border-[#2A2A2A] p-3 sm:p-4 md:p-5 lg:p-[18px]">
      {/* Responsive wrapping grid - 2 cols on mobile for better use of space */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {packsData.map((pack) => (
          <PackCard
            key={pack.id}
            name={pack.name}
            price={pack.price}
            image={pack.image}
          />
        ))}
      </div>
    </div>
  );
}
