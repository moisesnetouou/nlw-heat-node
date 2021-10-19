import axios from "axios";

/**
 * Receber code(string) - Ok
 * Recuperar o acess_token no github -> Token que o github vai nos disponibilizar - Ok
 * Recuperar infos do user no github
 * Veriricar se o usuário existe no DB.
 * -------SIM = Gera um token.
 * -------NAO = Cria no DB, gera um token.
 * Retornar o token com as infos do user.
 */

interface IAccesTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string){
    const url = "https://github.com/login/oauth/access_token";

    const {data: accessTokenResponse } = await axios.post<IAccesTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json",
      }
    })

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    return response.data;
  }
}

export {AuthenticateUserService};
