import axios from 'axios';
import Dev from '../models/Dev';


class DevController {
  async create(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    const techsArray = techs.split(', ').map(tech => tech.trim());
  
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
}

export default new DevController();