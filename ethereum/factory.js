import web3 from './web3';
// import CampaignFactory from './build/CampaignFactory.json';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x0a4d0710248f8a9C9569ED6dE0d801204081cd22'
  // JSON.parse(CampaignFactory.interface),
  // '0x0a4d0710248f8a9C9569ED6dE0d801204081cd22'
);

export default instance;
