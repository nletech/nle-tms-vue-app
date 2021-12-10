const baseUrl = location.hostname;
let baseApi;
switch (baseUrl) {
  case "dev-tms-h5.nle-tech.com":
    baseApi = "https://dev-tms.nle-tech.com/api/";
    break;
  case 'h5.rrtms.com': //红兔
    baseApi = 'https://api.rrtms.com/api/';
    break;
  default:
    baseApi = "https://dev-tms.nle-tech.com/api/"; // dev
    // baseApi = "https://api.rrtms.com/api/";

    break;
}
export default baseApi;