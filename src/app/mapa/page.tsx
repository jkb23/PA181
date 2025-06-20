"use client";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { MapControlHandle } from "../../components/LeafletMap";

const LeafletMap = dynamic(() => import("../../components/LeafletMap"), {
  ssr: false,
});

export default function MapPage() {
  const [selectedWasteType, setSelectedWasteType] = useState("");
  const locationInputRef = useRef<HTMLInputElement>(null);
  const mapControlRef = useRef<MapControlHandle>(null);

  // Waste type change handler
  const handleWasteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWasteType(e.target.value);
  };

  // Location search handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const location = locationInputRef.current?.value;
    if (!location) return;

    try {
      // Construct a more specific search query for Brno
      const searchAddress = location.toLowerCase().includes("brno")
        ? location
        : `${location}, Brno`;
      console.log("Searching for address:", searchAddress);

      // Use only the allowed combination of parameters
      const params = new URLSearchParams({
        format: "json",
        q: searchAddress,
        limit: "5",
        addressdetails: "1",
        countrycodes: "cz",
      });

      // Add viewbox parameter to prioritize results in Brno area
      params.append("viewbox", "16.5,49.15,16.7,49.25");
      params.append("bounded", "1");

      const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
      console.log("Search URL:", url);

      const res = await fetch(url, {
        headers: {
          "User-Agent": "KamSTim_App/1.0", // Adding user agent as required by Nominatim
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Search results:", data);

      if (data && data.length > 0) {
        // Find the most relevant result in Brno
        const brnoResult =
          data.find((item: any) => {
            const address = item.address || {};
            const inBrno =
              address.city === "Brno" ||
              address.town === "Brno" ||
              (item.display_name || "").toLowerCase().includes("brno");
            console.log("Checking result:", { address, inBrno, item });
            return inBrno;
          }) || data[0];

        const { lat, lon, display_name } = brnoResult;
        console.log("Selected location:", { lat, lon, display_name });

        if (mapControlRef.current?.searchLocation) {
          mapControlRef.current.searchLocation([
            parseFloat(lat),
            parseFloat(lon),
          ]);
        }
      } else {
        alert("Adresa nenalezena. Zkuste prosím zadat přesnější adresu.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Chyba při vyhledávání. Zkuste to prosím znovu.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">
              Vyhledávání
            </h2>
            <form className="space-y-4" onSubmit={handleSearch}>
              <div>
                <label
                  htmlFor="waste-type"
                  className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
                >
                  Typ odpadu
                </label>
                <select
                  id="waste-type"
                  value={selectedWasteType}
                  onChange={handleWasteTypeChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                >
                  <option value="">Vyberte typ odpadu</option>
                  <option value="Plasty, nápojové kartony a hliníkové plechovky od nápojů">
                    Plast
                  </option>
                  <option value="Papír">Papír</option>
                  <option value="Sklo barevné">Sklo</option>
                  <option value="Kov">Kov</option>
                  <option value="Biologický odpad">Bioodpad</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
                >
                  Lokalita
                </label>
                <input
                  type="text"
                  id="location"
                  ref={locationInputRef}
                  placeholder="Zadejte ulici a číslo..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-600"
              >
                Hledat
              </button>
            </form>
          </div>
        </div>
        {/* Map container */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-white">
            <LeafletMap
              ref={mapControlRef}
              selectedWasteType={selectedWasteType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
