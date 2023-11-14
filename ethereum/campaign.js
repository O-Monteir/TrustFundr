import web3 from './web3';
import Campaign from './build/Campaign.json';

export function getCampaign(address) {
  const instance = new web3.eth.Contract(
    Campaign.abi,
    address
  );
  return instance;
}
