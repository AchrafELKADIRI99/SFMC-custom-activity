const axios = require('axios');
const logger = require('./logger');

const getWebAppToken = async (authcode, domain) =>
  axios({
    method: 'post',
    url: `https://${process.env.SFMC_SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`,
    data: {
      grant_type: 'authorization_code',
      code: authcode,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: `https://${domain}/authenticated`,
    },
  });

const getSTSAppToken = async () =>
  axios({
    method: 'post',
    url: `https://${process.env.SFMC_SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`,
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.STS_CLIENT_ID,
      client_secret: process.env.STS_CLIENT_SECRET,
      account_id: process.env.ACCOUNT_ID,
    },
  });

const getUserInfo = async (accessToken) =>
  axios({
    method: 'get',
    url: `https://${process.env.SFMC_SUBDOMAIN}.auth.marketingcloudapis.com/v2/userinfo`,
    headers: { Authorization: accessToken },
  });

const getCampaignOfferTypes = async (accessToken) =>
  axios({
    method: 'get',
    url: `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/data/v1/customobjectdata/key/${process.env.OFFER_TYPES_DE}/rowset`,
    headers: { Authorization: accessToken },
  });

const getCampaignProductTypes = async (accessToken) =>
  axios({
    method: 'get',
    url: `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/data/v1/customobjectdata/key/${process.env.PRODUCT_TYPES_DE}/rowset`,
    headers: { Authorization: accessToken },
  });

const sendLog = async (data, accessToken) => {
  logger.info("SEND LOG not orking : ")
  logger.info(data);
  return axios({
    method: 'post',
    url: `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/hub/v1/dataeventsasync/key:${process.env.JOURNEY_CONFIG}/rowset`,
    data: [
      {
        keys: {
          UUID: data.uuid,
        },
        values: {
          CAMP_CAMPAIGN_ID: "1122",
          CAMP_CAMPAIGN_NAME: "SSJS",
          CAMP_OFFER_TYPE: "mobile",
          CREATED: new Date(),
        },
      },
    ],
    headers: { Authorization: accessToken },
  });
}

module.exports = {
  getWebAppToken,
  getSTSAppToken,
  getUserInfo,
  getCampaignOfferTypes,
  getCampaignProductTypes,
  sendLog,
};
