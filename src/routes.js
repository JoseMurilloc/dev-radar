import { Router } from 'express';
import axios from 'axios';
import Dev from './models/Dev';

const routes = Router();

routes.post('/devs', async (request, response) => {
  const { github_username, techs } = request.body;

  const techsArray = techs.split(', ').map(tech => tech.trim());

  const { data } = await axios.get(`https://api.github.com/users/${github_username}`);
  
  const { name = login, avatar_url, bio } = data;

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
  })

  return response.json(dev);
});

export default routes;