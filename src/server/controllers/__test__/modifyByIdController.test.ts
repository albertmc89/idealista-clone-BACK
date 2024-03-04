import { type NextFunction, type Response, type Request } from "express";
import { type RequestWithBody } from "../../types";
import Property from "../../../database/models/Property";
import { propertyMock } from "../../mocks/propertiesMocks";
import { modifyByIdController } from "../propertiesControllers";

const propertyIdMock = "l3mdlfd0324n292";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<RequestWithBody> = {
  params: {
    idProperty: propertyIdMock,
  },
  body: {
    type: "Apartment",
    city: "Bsrcelona",
    address: "Calle Londres 9",
    price: 375.0,
    rooms: 3,
    meters: 80,
    year: 1985,
    bathrooms: 2,
    aircon: "Yes",
    consumption: 130,
    elevator: "Yes",
    parking: "Yes",
    heating: "Yes",
    emissions: 50,
    level: "first floor",
    isRented: false,
    description:
      "¡Bienvenido al paraíso de la vida en Alella!Descubre la comodidad y el lujo de vivir en uno de los mejores pueblos de Barcelona: Alella. Este exquisito piso de 78 metros cuadrados te brinda una experiencia de vida única que no querrás dejar escapar.Este encantador hogar cuenta con tres amplias habitaciones, perfectas para adaptarse a tus necesidades y brindarte el espacio que mereces. El piso también ofrece un baño completo y un aseo. Disfruta de las vistas panorámicas y la frescura del aire mediterráneo desde tu propio balcón privado. Un lugar perfecto para relajarte con una taza de café por la mañana o disfrutar de las puestas de sol de ensueño por la noche. El piso se encuentra semiamueblado, lo que te brinda la flexibilidad para personalizarlo a tu gusto y crear el ambiente perfecto para ti y tu familia. Pero eso no es todo, este complejo residencial ofrece una piscina comunitaria donde podrás darte un chapuzón y disfrutar del sol en los cálidos días de verano. Además, tendrás un trastero a tu disposición para almacenar tus pertenencias de forma organizada y sin complicaciones. Esta es tu oportunidad de vivir en uno de los lugares más codiciados a solo 20min de Barcelona, en un piso que lo tiene todo. No pierdas la oportunidad de hacer de este lugar tu nuevo hogar. ¡Llámanos ahora para programar una visita y experimentar la vida en Alella en su máxima expresión!",
    image1: ",",
  },
};

const next: NextFunction = jest.fn();

Property.findByIdAndUpdate = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue({
    ...propertyMock[0],
    isRented: true,
  }),
});

describe("Given a modifyById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await modifyByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method should respond with the property modified", async () => {
      await modifyByIdController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        property: {
          ...propertyMock[0],
          isRented: true,
        },
      });
    });
  });

  describe("when it receives a request without a idProperty, a response and a next function", () => {
    test("Then the next function should be called with 'Couldn't modify the property'", async () => {
      const error = new Error();

      Property.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue({}),
      });

      await modifyByIdController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
