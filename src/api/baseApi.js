const baseUrl = location.hostname;
let baseApi;
switch (baseUrl) {
  case "dev-tms.nle-tech.com":
    baseApi = "https://dev-tms.nle-tech.com/";
    break;
  default:
    baseApi = "https://dev-tms.nle-tech.com/api/"; // dev
    break;
}

export default baseApi;