import ky from "ky";
 import { useNavigate } from "react-router-dom";
import { urls } from "./routes";


export const client = ky.create({
  prefixUrl: "/api",
  hooks: {
    afterResponse: [
      (_req, _options, res) => {
        if (500 <= res.status && res.status < 600) {
          useNavigate()(urls.serverError);
        }
      },
    ],
  },
});
