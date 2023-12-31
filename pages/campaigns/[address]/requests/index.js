import Head from 'next/head';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import { RequestRow } from '../../../../components/RequestRow';
import { getCampaign } from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';

function Requests({ address, requests, requestCount }) {
  return <>
    <Toaster />
    <Head>
      <title>CrowdCoin | Requests – {address}</title>
    </Head>
    <main className='flex flex-col items-center w-full mb-10'>
      <img
        src='/request.jpeg'
        alt='Completed'
        className='h-[600px]'
      />
      <div className='flex justify-between w-full mt-8'>
        <div className='flex items-center gap-4 my-6 ml-4'>
          <h3 className='text-2xl text-primary'>Requests</h3>
          <div className='indicator-item badge'>Found {requestCount} requests</div>
        </div>
        <Link href={`/campaigns/${address}/requests/new`} legacyBehavior>
          <a className='btn btn-primary btn-outline mr-4'>Create new Request</a>
        </Link>
      </div>

      <div className='w-full overflow-x-auto mt-8'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Approval Count</th>
              <th
                className='cursor-pointer'
                title='Only contributors can approve requests'
              >
                Approve
              </th>
              <th
                className='cursor-pointer'
                title='Only contributors can approve requests'
              >
                Finalize
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <RequestRow request={request} key={index} address={address} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
    <style jsx>{`
      main {
        margin-left: 100px;
        margin-right: 100px;
      }

      .indicator-item {
        margin-left: auto;
      }
    `}</style>
  </>;
}

export default Requests;





// import Head from 'next/head';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';

// import { RequestRow } from '../../../../components/RequestRow';
// import { getCampaign } from '../../../../ethereum/campaign';
// import web3 from '../../../../ethereum/web3';

// function Requests({ address, requests, requestCount }) {
//   return (
//     <>
//       <Toaster />
//       <Head>
//         <title>CrowdCoin | Requests – {address}</title>
//       </Head>
//       <main className='flex flex-col items-center w-full mb-10'>
//         <img
//           src='/request-hero-img.jpg'
//           alt='Completed'
//           className='h-[500px]'
//         />
//         <div className='flex justify-between w-full'>
//           <div className='flex items-center gap-4 my-6'>
//             <h3 className='text-2xl text-primary'>Requests</h3>
//             <div className='indicator-item badge '>
//               Found {requestCount} requests
//             </div>
//           </div>
//           <Link href={`/campaigns/${address}/requests/new`}>
//             <a className='btn btn-primary btn-outline'>Create new Request</a>
//           </Link>
//         </div>

//         <div className='w-full overflow-x-auto'>
//           <table className='table w-full'>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Description</th>
//                 <th>Amount</th>
//                 <th>Recipient</th>
//                 <th>Approval Count</th>
//                 <th
//                   className='cursor-pointer'
//                   title='Only contributors can approve requests'
//                 >
//                   Approve
//                 </th>
//                 <th
//                   className='cursor-pointer'
//                   title='Only contributors can approve requests'
//                 >
//                   Finalize
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((request, index) => (
//                 <RequestRow request={request} key={index} address={address} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Requests;

export async function getServerSideProps({ params }) {
  const campaign = await getCampaign(params.address);

  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requestCountNumber=Number(requestCount)
  const requestsRes = await Promise.all(
    Array(parseInt(requestCountNumber))
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  const requests = requestsRes.map((request, index) => {
    return {
      id: index,
      description: request[0],
      value: web3.utils.fromWei(request[1], 'ether'),
      recipient: request[2],
      complete: request[3],
      approvalCount: request[4].toString(),
      approversCount: approversCount.toString(),
    };
  });

  return {
    props: {
      address: params.address,
      requests,
      requestCount : requestCountNumber,
    }
  };
}
