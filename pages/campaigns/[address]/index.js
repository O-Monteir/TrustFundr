import web3 from '../../../ethereum/web3';
import { BiSearchAlt } from 'react-icons/bi';
import Head from 'next/head';
import { getCampaign } from '../../../ethereum/campaign';
import { CampaignStatusCard } from '../../../components/CampaignStatusCard';
import { ContributeForm } from '../../../components/ContributeForm';
import Link from 'next/link';

function CampaignPage({ campaign }) {
  const {
    manager,
    minimumContribution,
    address,
    requestsCount,
    approversCount,
    balance
  } = campaign;

  return <>
    <Head>
      <title>TrustFundr | {address}</title>
    </Head>

    <img
        src='/campaign.png'
        alt='Analytics'
        
      />
      
    <main className='flex flex-col items-center w-full mb-10 px-4'>
      
      <div className='flex flex-col self-start'>
        <div className='panel1'>
          <div className='panel-header'>Campaign</div>
          <h2 className='mb-4 text-2xl'>{address}</h2>
        </div>
        <div className='panel'>
          <div className='panel-header'>Manager</div>
          <p className='mb-4 text-2xl'>{manager}</p>
        </div>
      </div>
      <div className='flex items-start content-between w-full gap-6 mt-6'>
        <div className='flex flex-col w-full gap-4'>
          <h3 className='my-6 text-2xl text-primary'>Campaign Stats</h3>
          <div className='flex flex-col max-w-md gap-4'>
            <CampaignStatusCard
              header='Minimum Contribution'
              value={`${minimumContribution} Wei`}
              description='Value in Wei to support this project'
            />
            <CampaignStatusCard
              header='Campaign Balance'
              value={`${balance} ♦`}
              description='Total of contribution in Ether'
            />
            <CampaignStatusCard
              header='Request Count'
              value={`📋 ${requestsCount}`}
              description='Request to use the money, must be approved'
            />
            <CampaignStatusCard
              header='Approvers Count'
              value={`👤 ${approversCount}`}
              description='Number of people who have donated to this project'
            />
            <Link href={`/campaigns/${address}/requests`} legacyBehavior>
              <a className='gap-2 btn btn-primary'>
                <BiSearchAlt />
                View Requests
              </a>
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-center w-full'>
          <ContributeForm address={address} />
        </div>
      </div>
    </main>
    <style jsx>{`
      main {
        margin-left: 100px;
      }

      .panel1 {
        
        padding: 1rem;
        transition: background-color 0.3s ease;
      }

      .panel1-header {
        color: lightgreen;
      }

      .panel {
        padding: 1rem;
        transition: background-color 0.3s ease;
      }

      .panel-header {
        color: lightgreen;
      }

      .text-base{
        font-size:big;
        color: lightgreen;
      }

    `}</style>
  </>;
}

export default CampaignPage;

export async function getServerSideProps({ params }) {
  const instance = await getCampaign(params.address);

  const campaignRes = await instance.methods.getSummary().call();
  const campaign = {
    minimumContribution: campaignRes[0].toString(),
    balance: web3.utils.fromWei(campaignRes[1], 'ether'),
    requestsCount: parseInt(campaignRes[2]),
    approversCount: parseInt(campaignRes[3]),
    manager: campaignRes[4],
    address: params.address
  };

  const requestsRes = await Promise.all(
    Array(parseInt(campaignRes[2]))
      .fill()
      .map((_, index) => {
        return instance.methods.requests(index).call();
      })
  );

  const requests = requestsRes.map((request, index) => ({
    id: index,
    description: request[0],
    value: web3.utils.fromWei(request[1], 'ether'),
    recipient: request[2],
    complete: request[3],
    approvalCount: parseInt(request[4]),
  }));

  campaign.requests = requests;

  return {
    props: { campaign }
  };
}

