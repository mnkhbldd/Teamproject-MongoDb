import {JSX} from "react";

import {MapPinIcon, Volleyball} from "lucide-react";

type Hall = {
  id: number;
  name: string;
  address: string;
  imageSrc: string;
  sports: string[];
};

const sportsIconMap: Record<string, JSX.Element> = {
  volleyball: <Volleyball className="w-4 h-4" />,
};

const sportsHalls: Hall[] = [
  {
    id: 1,
    name: "M23 спорт заал",
    address:
      "ЧД, Зурагт Буурал ээж автобусны буудлын Миний сүлжээ дэлгүүрийн зүүн доод талд гадаа тал нь шар өнгөтэй",
    imageSrc:
      "https://t4.ftcdn.net/jpg/14/86/85/17/240_F_1486851777_Yq2nqpOBWaApusfSF0RS2UyGomp61v5p.jpg",
    sports: ["volleyball", "basketball"],
  },
  {
    id: 2,
    name: "Цайз 148 спорт заал",
    address:
      "БЗД, Цайзын 19 рүү хойшоо явсан засмал замаар яваад зам дагуу замынхаа зүүн талд 148-р сургууль",
    imageSrc:
      "https://t4.ftcdn.net/jpg/14/86/85/17/240_F_1486851777_Yq2nqpOBWaApusfSF0RS2UyGomp61v5p.jpg",
    sports: ["volleyball", "basketball"],
  },
  {
    id: 3,
    name: "Амгалан спорт заал",
    address:
      "БЗД, Чулуун овоо Офицерийн нохойтой хөшөөтэй тойргоос зүүн яваад Жанжин клубын урд замынхаа баруун талд зам дагуу",
    imageSrc:
      "https://t4.ftcdn.net/jpg/14/86/85/17/240_F_1486851777_Yq2nqpOBWaApusfSF0RS2UyGomp61v5p.jpg",
    sports: ["volleyball", "basketball"],
  },
  {
    id: 4,
    name: "Зорчигч Тээвэр 5 спорт заал",
    address:
      "БЗД,Офицероос Улаанхуаран руу эргээд Комфорт хотхоны баруун урд талд төв замаас ойрхон хуучин Тэнүүн Огоо",
    imageSrc:
      "https://t4.ftcdn.net/jpg/14/86/85/17/240_F_1486851777_Yq2nqpOBWaApusfSF0RS2UyGomp61v5p.jpg",
    sports: ["volleyball", "basketball"],
  },
  {
    id: 5,
    name: "Содон A спорт заал",
    address:
      "СХД, 21-р хороолол Содон хорооллын хойд засмал замаар зүүн тийш 100м яваад замынхаа урд талд",
    imageSrc:
      "https://t4.ftcdn.net/jpg/14/86/85/17/240_F_1486851777_Yq2nqpOBWaApusfSF0RS2UyGomp61v5p.jpg",
    sports: ["volleyball", "basketball"],
  },
];
export default function Home() {
  return (
    <div className="p-4 space-y-2 border-gray-200 border-1 w-[450px] rounded-md">
      <h2 className="text-xl font-bold text-gray-800">Similar Items:</h2>
      {sportsHalls.map((hall) => (
        <div
          key={hall.id}
          className="flex gap-4 border-t pt-4 border-gray-200 w-full cursor-pointer hover:scale-105 ease-in-out duration-300 hover:bg-gray-300 rounded-md"
        >
          <img
            src={hall.imageSrc}
            alt={hall.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{hall.name}</h3>
            <div className="flex text-gray-600 mt-1 gap-1 text-[12px] place-items-center-safe">
              <MapPinIcon className="size-20 text-orange-500 mt-0.5" />
              <p>{hall.address}</p>
            </div>
            <div className="flex gap-1 mt-2">
              {hall.sports.map((sport) => (
                <div key={sport}>{sportsIconMap[sport]}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
