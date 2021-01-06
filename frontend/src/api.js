import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
//function for making a request to the API
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async post(endpoint, data = {}, method = "post") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "post")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // * Can filter on provided search filters:
  // * - minEmployees
  // * - maxEmployees
  // * - nameLike (will find case-insensitive, partial matches)

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/?=${handle}`);
    return res.company;
  }
    /** Search for a company by handle. */

    static async searchCompanies(name) {
      let res = await this.request(`companies`,{ name });
      return res.companies;
    }
 

  /** Get details on all companies. */
  static async getAllCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }

    /** Get details on all jobs. */
    static async getAllJobs() {
      let res = await this.request(`jobs/`);
      return res.jobs;
    }

  static async postCompany(data) {
    let res = await this.post(`companies/`, data);
    return res.companies;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.company;
  }

  static async postJob(data) {
    let res = await this.post(`jobs/`, data);
    return res.companies;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

    /** login for site. */

    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

      /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}




// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;