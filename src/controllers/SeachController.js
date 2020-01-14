import Dev from '../models/Dev';
import parserStringAsArray from '../utils/ParserStringAsArray';

class SeachController {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    const techsArray = parserStringAsArray(techs);
 
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json(devs);
  }
}

export default new SeachController();