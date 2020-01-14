import axios from 'axios';
import Dev from '../models/Dev';


import parserStringAsArray from '../utils/ParserStringAsArray';

class DevController {

  async index(request, response) {
    const devs = await Dev.find();
    return  response.json(devs);
  }

  async create(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    
    const existDev = await Dev.findOne({ github_username });

    if(existDev) {
      return response.json(existDev);
    }
    
    const techsArray = parserStringAsArray(techs);
  
    const { data } = await axios.get(`https://api.github.com/users/${github_username}`);
    
    const { name = login, avatar_url, bio } = data;
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
  
    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });
  
    return response.json(dev);
  }

  // Exercicio Omnisctack
  async update() {

  }

  async destroy() {

  }
}

export default new DevController();