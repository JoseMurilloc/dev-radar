import axios from 'axios';
import Dev from '../models/Dev';
import { findConection, sendMessage } from '../websocket'

import parserStringAsArray from '../utils/ParserStringAsArray';

class DevController {

  async index(request, response) {
    const devs = await Dev.find();
    return  response.json(devs);
  }

  async create(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    
    const existDev = await Dev.findOne({ github_username });

    if(!existDev) {
      
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

      // Filtrar as conexões qeue estão as 10 km de distância e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendMessageTo = findConection({ latitude, longitude }, techsArray)
      console.log(sendMessageTo); // Já sabemos para quem precisamos enviar a mensagem só não enviamos de fato.

      sendMessage(sendMessageTo, 'new-dev', dev);
      
      return response.json(dev);
    }
    
  }

  // Exercicio Omnisctack
  async destroy(request, response) {
    const { github_username } = request.params;
    console.log(request.params.github_username);
  
    const dev = await Dev.findOne({ github_username });
    if(!dev) {
      return response.status(502).json({ error: 'User not found' });
    }
    await Dev.deleteOne({ _id: dev._id });
    return response.json(dev);
  }

  async update(request, response) {

    const { github_username } = request.params;
    const { techs, latitude, longitude } = request.body;
  

    const techsArray = parserStringAsArray(techs);
    
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }

    let dev = await Dev.findOneAndUpdate({ github_username }, { 
      techs: techsArray,
      location,
    });

  
    if(!dev) {
      return response.status(502).json({ error: 'User not found' });
    }

    console.log(dev.github_username);
    

    dev = await Dev.findOne({ github_username: dev.github_username });
    console.log(dev);
    
    return response.json(dev.techs);
  }
}

export default new DevController();