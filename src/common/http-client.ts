import ky from "ky";
import { useNavigate } from "react-router-dom";
import { urls } from "./routes";
import { API_BASE_URL as baseUrl } from "./base-url";
import { useMemo } from "react";

export const useHttpClient = () => {
  const navigate = useNavigate();
  return useMemo(
    () =>
      ky.create({
        prefixUrl: baseUrl,
        timeout: 5000,

        hooks: {
          afterResponse: [
            (_req, _options, res) => {
              if (500 <= res.status && res.status < 600) {
                // navigate(urls.serverError);
              } else if (res.status === 401) {
                navigate(urls.login);
              }
              return res;
            },
          ],
        },
      }),
    [navigate],
  );
};
