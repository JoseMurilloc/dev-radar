import Dev from '../models/Dev';
import parserStringAsArray from '../utils/ParserStringAsArray';

class SeachController {
  async index(request, response) {
    const { lagitude, longitude, techs } = request.query;
    const techsArray = parserStringAsArray(techs);
 
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      }
    });

    return response.json(devs);
  }
}

export default new SeachController();