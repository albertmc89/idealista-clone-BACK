import mongoose from "mongoose";
import { type PropertyStructure } from "../../types";

export const propertyMock: PropertyStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    address: "Carrer Londres, Alella",
    price: 375.0,
    rooms: 3,
    meters: 80,
    year: 1985,
    bathrooms: 2,
    aircon: false,
    consumption: 130,
    elevator: false,
    parking: false,
    heating: true,
    emissions: 50,
    level: "first floor",
    description:
      "¡Bienvenido al paraíso de la vida en Alella!Descubre la comodidad y el lujo de vivir en uno de los mejores pueblos de Barcelona: Alella. Este exquisito piso de 78 metros cuadrados te brinda una experiencia de vida única que no querrás dejar escapar.Este encantador hogar cuenta con tres amplias habitaciones, perfectas para adaptarse a tus necesidades y brindarte el espacio que mereces. El piso también ofrece un baño completo y un aseo. Disfruta de las vistas panorámicas y la frescura del aire mediterráneo desde tu propio balcón privado. Un lugar perfecto para relajarte con una taza de café por la mañana o disfrutar de las puestas de sol de ensueño por la noche. El piso se encuentra semiamueblado, lo que te brinda la flexibilidad para personalizarlo a tu gusto y crear el ambiente perfecto para ti y tu familia. Pero eso no es todo, este complejo residencial ofrece una piscina comunitaria donde podrás darte un chapuzón y disfrutar del sol en los cálidos días de verano. Además, tendrás un trastero a tu disposición para almacenar tus pertenencias de forma organizada y sin complicaciones. Esta es tu oportunidad de vivir en uno de los lugares más codiciados a solo 20min de Barcelona, en un piso que lo tiene todo. No pierdas la oportunidad de hacer de este lugar tu nuevo hogar. ¡Llámanos ahora para programar una visita y experimentar la vida en Alella en su máxima expresión!",
    image1: ",",
    image2: ",",
    image3: ",",
    image4: ",",
    image5: ",",
    user: new mongoose.Types.ObjectId().toString(),
  },
];
