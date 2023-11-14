import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiRocket } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';

import { getCampaign } from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';

function NewRequest() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { address } = router.query;

  async function handleCreateRequest(event) {
    event.preventDefault();
    setIsLoading(true);

    const campaign = await getCampaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      const res = campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(String(value), 'ether'),
          recipientAddress
        )
        .send({
          from: accounts[0]
        });

      await toast.promise(res, {
        loading: 'Waiting on transaction...',
        success: "🎉 You've created a new request!",
        error: 'Something went wrong! Try again. 🙁'
      });

      setIsLoading(false);
      setTimeout(() => {
        router.push(`/campaigns/${address}/requests`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return <>
    <Toaster />
    <Head>
      <title>TrustFundr | Create new request</title>
    </Head>
    <main className='flex items-center justify-center h-screen'>
      <div className='max-w-[800px] mx-auto'>
        <Link href={`/campaigns/${address}/requests`} legacyBehavior>
          <a className='btn btn-outline btn-primary btn-sm'>← Back</a>
        </Link>
        <h2 className='mt-8 text-2xl text-left text-primary'>
          + Create new request
        </h2>
        <form
          className='flex flex-col items-start w-full gap-4 my-8'
          onSubmit={handleCreateRequest}
        >
          <div className='form-control'>
            <label htmlFor='desc' className='label'>
              <span className='label-text'>Description</span>
            </label>
            <input
              id='desc'
              required
              placeholder='Enter description'
              className='input input-primary input-bordered min-w-[300px]'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='desc' className='label'>
              <span className='label-text'>Recipient</span>
            </label>
            <input
              id='desc'
              required
              placeholder='0xABC123...9Z'
              className='input input-primary input-bordered min-w-[300px]'
              type='text'
              onChange={(e) => setRecipientAddress(e.target.value)}
              value={recipientAddress}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='value' className='label'>
              <span className='label-text'>Amount</span>
            </label>
            <label className='input-group'>
              <span>Ether</span>
              <input
                id='value'
                required
                placeholder='1.0'
                className='input input-primary input-bordered'
                type='number'
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </label>
          </div>
          <button
            type='submit'
            className='gap-2 mt-2 uppercase btn btn-primary'
            disabled={isLoading}
          >
            Create request
            <BiRocket />
          </button>
        </form>
      </div>
      <div className='image-container'>
        <img
          // src='/new-request-hero-img.png'
          src='/make_req.jpg'
          alt='One person scanning bar code of a box'
          className='w-[750px]'
        />
      </div>
    </main>
    <style jsx>{`
      .image-container {
        margin-top: 40px;
      }
    `}</style>
  </>;
}

export default NewRequest;


// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { BiRocket } from 'react-icons/bi';
// import toast, { Toaster } from 'react-hot-toast';

// import { getCampaign } from '../../../../ethereum/campaign';
// import web3 from '../../../../ethereum/web3';
// import Link from 'next/link';

// function NewRequest() {
//   const [description, setDescription] = useState('');
//   const [value, setValue] = useState(0);
//   const [recipientAddress, setRecipientAddress] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const { address } = router.query;

//   async function handleCreateRequest(event) {
//     event.preventDefault();
//     setIsLoading(true);

//     const campaign = await getCampaign(address);

//     try {
//       const accounts = await web3.eth.getAccounts();
//       const res = campaign.methods
//         .createRequest(
//           description,
//           web3.utils.toWei(String(value), 'ether'),
//           recipientAddress
//         )
//         .send({
//           from: accounts[0]
//         });

//       await toast.promise(res, {
//         loading: 'Waiting on transaction...',
//         success: "🎉 You've created a new request!",
//         error: 'Something went wrong! Try again. 🙁'
//       });

//       setIsLoading(false);
//       setTimeout(() => {
//         router.push(`/campaigns/${address}/requests`);
//       }, 2000);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   }

//   return (
//     <>
//       <Toaster />
//       <Head>
//         <title>TrustFundr | Create new request</title>
//       </Head>
//       <main className='flex items-center justify-between w-full'>
//         <div className='w-full mx-auto'>
//           <Link href={`/campaigns/${address}/requests`}>
//             <a className='btn btn-outline btn-primary btn-sm'>← Back</a>
//           </Link>
//           <h2 className='mt-8 text-2xl text-left text-primary'>
//             + Create new request
//           </h2>
//           <form
//             className='flex flex-col items-start w-full gap-4 my-8'
//             onSubmit={handleCreateRequest}
//           >
//             <div className='form-control'>
//               <label htmlFor='desc' className='label'>
//                 <span className='label-text'>Description</span>
//               </label>
//               <input
//                 id='desc'
//                 required
//                 placeholder='Enter description'
//                 className='input input-primary input-bordered min-w-[300px]'
//                 type='text'
//                 onChange={(e) => setDescription(e.target.value)}
//                 value={description}
//               />
//             </div>
//             <div className='form-control'>
//               <label htmlFor='desc' className='label'>
//                 <span className='label-text'>Recipient</span>
//               </label>
//               <input
//                 id='desc'
//                 required
//                 placeholder='0xABC123...9Z'
//                 className='input input-primary input-bordered min-w-[300px]'
//                 type='text'
//                 onChange={(e) => setRecipientAddress(e.target.value)}
//                 value={recipientAddress}
//               />
//             </div>
//             <div className='form-control'>
//               <label htmlFor='value' className='label'>
//                 <span className='label-text'>Amount</span>
//               </label>
//               <label className='input-group'>
//                 <span>Ether</span>
//                 <input
//                   id='value'
//                   required
//                   placeholder='1.0'
//                   className='input input-primary input-bordered'
//                   type='number'
//                   onChange={(e) => setValue(e.target.value)}
//                   value={value}
//                 />
//               </label>
//             </div>
//             <button
//               type='submit'
//               className='gap-2 mt-2 uppercase btn btn-primary'
//               disabled={isLoading}
//             >
//               Create request
//               <BiRocket />
//             </button>
//           </form>
//         </div>
//         <img
//           // src='/new-request-hero-img.png'
//           src='/make_req.jpg'
//           alt='One person scanning bar code of a box'
//           className='w-[800px]'
//         />
//       </main>
      
//     </>
//   );
// }

// export default NewRequest;


// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { BiRocket } from 'react-icons/bi';
// import toast, { Toaster } from 'react-hot-toast';

// import { getCampaign } from '../../../../ethereum/campaign';
// import web3 from '../../../../ethereum/web3';
// import Link from 'next/link';

// function NewRequest() {
//   const [description, setDescription] = useState('');
//   const [value, setValue] = useState(0);
//   const [recipientAddress, setRecipientAddress] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const { address } = router.query;

//   async function handleCreateRequest(event) {
//     event.preventDefault();
//     setIsLoading(true);

//     const campaign = await getCampaign(address);

//     try {
//       const accounts = await web3.eth.getAccounts();
//       const res = campaign.methods
//         .createRequest(
//           description,
//           web3.utils.toWei(String(value), 'ether'),
//           recipientAddress
//         )
//         .send({
//           from: accounts[0]
//         });

//       await toast.promise(res, {
//         loading: 'Waiting on transaction...',
//         success: "🎉 You've created a new request!",
//         error: 'Something went wrong! Try again. 🙁'
//       });

//       setIsLoading(false);
//       setTimeout(() => {
//         router.push(`/campaigns/${address}/requests`);
//       }, 2000);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   }

//   return (
//     <>
//       <Toaster />
//       <Head>
//         <title>TrustFundr | Create new request</title>
//       </Head>
//       <main className='flex items-end justify-between w-full'>
//         <div className='w-full'>
//         <Link href={`/campaigns/${address}/requests`}>
//           <a className='btn btn-outline btn-primary btn-sm'>← Back</a>
//         </Link>
//           <h2 className='mt-8 text-2xl text-left text-primary'>
//             + Create new request
//           </h2>
//           <form
//             className='flex flex-col items-start w-full gap-4 my-8'
//             onSubmit={handleCreateRequest}
//           >
//             <div className='form-control'>
//               <label htmlFor='desc' className='label'>
//                 <span className='label-text'>Description</span>
//               </label>
//               <input
//                 id='desc'
//                 required
//                 placeholder='Enter description'
//                 class='input input-primary input-bordered min-w-[300px]'
//                 type='text'
//                 onChange={(e) => setDescription(e.target.value)}
//                 value={description}
//               />
//             </div>
//             <div className='form-control'>
//               <label htmlFor='desc' className='label'>
//                 <span className='label-text'>Recipient</span>
//               </label>
//               <input
//                 id='desc'
//                 required
//                 placeholder='0xABC123...9Z'
//                 className='input input-primary input-bordered min-w-[300px]'
//                 type='text'
//                 onChange={(e) => setRecipientAddress(e.target.value)}
//                 value={recipientAddress}
//               />
//             </div>
//             <div className='form-control'>
//               <label htmlFor='value' className='label'>
//                 <span className='label-text'>Amount</span>
//               </label>
//               <label className='input-group'>
//                 <span>Ether</span>
//                 <input
//                   id='value'
//                   required
//                   placeholder='1.0'
//                   className='input input-primary input-bordered'
//                   type='number'
//                   onChange={(e) => setValue(e.target.value)}
//                   value={value}
//                 />
//               </label>
//             </div>
//             <button
//               type='submit'
//               className='gap-2 mt-2 uppercase btn btn-primary'
//               disabled={isLoading}
//             >
//               Create request
//               <BiRocket />
//             </button>
//           </form>
//         </div>
//         <img
//           // src='/new-request-hero-img.png'
//           src='/make_req.jpg'
//           alt='One person scanning bar code of a box'
//           className='w-[800px]'
//         />
//       </main>
//     </>
//   );
// }

// export default NewRequest;
