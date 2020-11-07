import { rest } from 'msw';
import * as jsonResponse from "./api_response.json";


export const projectsUrl = `https://fullstack.linus-capital.com/projects`;
export const investUrl = `http://localhost:8000/invest`;


export const handlers = [
  rest.get(projectsUrl, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(jsonResponse)
    )
  }),
  rest.post(investUrl, (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  })
];
