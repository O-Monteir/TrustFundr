import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CampaignCard } from '../components/CampaignCard';
import factory from '../ethereum/factory';

export default function Home({ campaigns }) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById('intro-section');
      if (introSection) {
        const introSectionTop = introSection.offsetTop;
        const scrollPosition = window.pageYOffset + window.innerHeight;

        if (scrollPosition > introSectionTop + 100) {
          setIsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>
    <Head>
      <title>TrustFundr</title>
    </Head>

    <main className='flex flex-col items-center w-full'>
      <div id='intro-section' className='flex flex-col items-center w-full'>
        <img
          src='/index-hero-img.jpg'
          alt='quote'
          className='w-full'
        />
        <div className='intro-container'>
          <div className='intro-content'>
            <p className='intro-text'>
              Introducing TrustFundr, the blockchain-powered transformation of Kickstarter. Experience a new era of secure and transparent crowdfunding. With blockchain, every contribution is protected, and funds are securely managed. Backers have full visibility into project progress, ensuring accountability. TrustFundr eliminates fraud and empowers backers with direct project involvement. Join us in fueling innovation with trust and revolutionize the way we support groundbreaking ideas.
            </p>
          </div>
          <div className='intro-image'>
            <img
              src='/intro-image.jpg'
              alt='Illustration of crowdfunding'
              className='w-full'
            />
          </div>
        </div>
      </div>

      {/* <div
        className={`section-container ${isAnimated ? 'animate-section' : ''}`}
      >
        <div className='horizontal-section'>
          <div className='element'>
            <img src='/image1.png' alt='Image 1' className='element-image' />
            <p className='element-text'>Trust-powered crowdfunding</p>
          </div>
          <div className='element'>
            <img src='/image2.png' alt='Image 2' className='element-image' />
            <p className='element-text'>Transparent accountability</p>
          </div>
          <div className='element'>
            <img src='/image3.png' alt='Image 3' className='element-image' />
            <p className='element-text'>Revolutionizing innovation</p>
          </div>
        </div>
      </div> */}

      <div className='campaigns-container'>
        <div className='flex items-center justify-between w-full gap-4 mt-4'>
          <h2 className='text-2xl text-primary'>Open Campaigns</h2>
          <Link href='/campaigns/new' legacyBehavior>
            <a className='btn btn-primary btn-outline'>
              Create new Campaign
            </a>
          </Link>
        </div>
        <div className='flex flex-wrap justify-center w-full gap-10 my-8 xl:justify-between'>
          {campaigns.length === 0 && (
            <div className='flex flex-col items-center w-full'>
              <h2 className='text-2xl text-gray-600'>No campaigns found 😢</h2>
              <p className='text-lg text-gray-400'>
                Create a new campaign to get started
              </p>
            </div>
          )}
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </div>
      </div>
    </main>

    <style jsx>{`
      .intro-container {
        max-width: 1200px;
        max-height: 1400px;
        margin: 40px auto;
        margin-top: 100px;
        margin-bottom: 100px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }

      .intro-content {
        
        flex-basis: 50%;
      }

      .intro-text {
        font-size:24px;
        margin-bottom: 20px;
      }

      .intro-image {
        flex-basis: 35%;
        margin:0;
        padding:0;
        position: relative;
        overflow: hidden;
      }

      .intro-image img {
        width: 1080px;
        height: 300px;
        max-height: 1200px; /* Adjust the height as desired */
        animation: image-animation 10s infinite;
      }

      @keyframes image-animation {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }

      .section-container {
        background-color: white;
        margin: 60px 0;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      .animate-section {
        opacity: 1;
        transform: translateY(0);
      }

      .horizontal-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom:100px;
        background-color: #d3fcd5;
        padding: 20px;
        
      }

      .element {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 55px;
        margin-right: 20px;
      }

      .element-image {
        width: 100px;
        height: 100px;
        transition: transform 0.3s ease;
      }
      
      .element:hover .element-image {
        transform: scale(1.2);
        z-index: 1;
      }

      .element-text {
        text-align: center;
        margin-top: 10px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7); /* Adjust the color opacity as desired */
        font-size: 18px; /* Adjust the font size as desired */
      }

      .campaigns-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `}</style>
  </>;
}

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns
    }
  };
}

// import Head from 'next/head';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// import { CampaignCard } from '../components/CampaignCard';
// import factory from '../ethereum/factory';

// export default function Home({ campaigns }) {
//   const [isAnimated, setIsAnimated] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const introSection = document.getElementById('intro-section');
//       if (introSection) {
//         const introSectionTop = introSection.offsetTop;
//         const scrollPosition = window.pageYOffset + window.innerHeight;

//         if (scrollPosition > introSectionTop + 100) {
//           setIsAnimated(true);
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>TrustFundr</title>
//       </Head>

//       <main className='flex flex-col items-center w-full'>
//         <div id='intro-section' className='flex flex-col items-center w-full'>
//           <img
//             src='/index-hero-img.jpg'
//             alt='People with the hands united'
//             className='w-full'
//           />
//           <div className='intro-container'>
//             <div className='intro-content'>
//               <p className='intro-text'>
//                 Introducing TrustFundr, the blockchain-powered transformation of Kickstarter. Experience a new era of secure and transparent crowdfunding. With blockchain, every contribution is protected, and funds are securely managed. Backers have full visibility into project progress, ensuring accountability. TrustFundr eliminates fraud and empowers backers with direct project involvement. Join us in fueling innovation with trust and revolutionize the way we support groundbreaking ideas.
//               </p>
//             </div>
//             <div className='intro-image'>
//               <img
//                 src='/intro-image.jpg'
//                 alt='Illustration of crowdfunding'
//                 className='w-full'
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           className={`section-container ${isAnimated ? 'animate-section' : ''}`}
//         >
//           <div className='horizontal-section' >
//             <div className='element'>
//               <img src='/image1.png' alt='Image 1' className='element-image' />
//               <p className='element-text'>Trust-powered crowdfunding</p>
//             </div>
//             <div className='element'>
//               <img src='/image2.png' alt='Image 2' className='element-image' />
//               <p className='element-text'>Transparent accountability</p>
//             </div>
//             <div className='element'>
//               <img src='/image3.png' alt='Image 3' className='element-image' />
//               <p className='element-text'>Revolutionizing innovation</p>
//             </div>
//           </div>
//         </div>

//         <div className='campaigns-container'>
//           <div className='flex items-center justify-between w-full gap-4 mt-4'>
//             <h2 className='text-2xl text-primary'>Open Campaigns</h2>
//             <Link href='/campaigns/new'>
//               <a className='btn btn-primary btn-outline'>
//                 Create new Campaign
//               </a>
//             </Link>
//           </div>
//           <div className='flex flex-wrap justify-center w-full gap-10 my-8 xl:justify-between'>
//             {campaigns.length === 0 && (
//               <div className='flex flex-col items-center w-full'>
//                 <h2 className='text-2xl text-gray-600'>No campaigns found 😢</h2>
//                 <p className='text-lg text-gray-400'>
//                   Create a new campaign to get started
//                 </p>
//               </div>
//             )}
//             {campaigns.map((campaign, index) => (
//               <CampaignCard key={index} campaign={campaign} />
//             ))}
//           </div>
//         </div>
//       </main>

//       <style jsx>{`
//         .intro-container {
//           max-width: 1000px;
//           max-height: 1200px;
//           margin: 40px auto;
//           margin-top: 100px;
//           margin-bottom: 100px;
//           display: flex;
//           flex-wrap: wrap;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .intro-content {
//           flex-basis: 50%;
//         }

//         .intro-text {
//           margin-bottom: 20px;
//         }

//         .intro-image {
//           flex-basis: 35%;
//           position: relative;
//           overflow: hidden;
//         }

//         .intro-image img {
//           width: 1000px;
//           height: auto;
//           max-height: 1200px; /* Adjust the height as desired */
//           animation: image-animation 10s infinite;
//         }

//         @keyframes image-animation {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.2);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         .section-container {
//           background-color: white;
//           margin: 60px 0px;
//           padding: 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           opacity: 0;
//           transform: translateY(50px);
//           transition: opacity 0.5s ease, transform 0.5s ease;
//         }

//         .animate-section {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .horizontal-section {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 20px;
//         }

//         .element {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 10px;
//           margin-right: 20px;
          
//         }

        

//         .element-text {
//           text-align: center;
//           margin-top: 10px;
//         }

//         .campaigns-container {
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 0 20px;
//         }
//       `}</style>
//     </>
//   );
// }

// export async function getServerSideProps() {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();

//   return {
//     props: {
//       campaigns
//     }
//   };
// }





// import Head from 'next/head';
// import Link from 'next/link';

// import { CampaignCard } from '../components/CampaignCard';
// import factory from '../ethereum/factory';

// export default function Home({ campaigns }) {
//   return (
//     <>
//       <Head>
//         <title>TrustFundr</title>
//       </Head>

//       <main className='flex flex-col items-center w-full'>
//         <div className='flex flex-col items-center w-full mt-8'>
//           <img
//             src='/index-hero-img.jpg'
//             alt='People with the hands united'
//             className='w-full'
//           />
//           <div className='flex items-center justify-between w-full gap-4 mt-4'>
//             <h2 className='text-2xl text-primary'>Open Campaigns</h2>
//             <Link href='/campaigns/new'>
//               <a className='btn btn-primary btn-outline'>
//                 Create new Campaign
//               </a>
//             </Link>
//           </div>
//         </div>
//         <div className='flex flex-wrap justify-center w-full gap-10 my-8 xl:justify-between'>
//           {campaigns.length === 0 && (
//             <div className='flex flex-col items-center w-full'>
//               <h2 className='text-2xl text-gray-600'>No campaigns found 😢</h2>
//               <p className='text-lg text-gray-400'>
//                 Create a new campaign to get started
//               </p>
//             </div>
//           )}
//           {campaigns.map((campaign, index) => (
//             <>
//               <CampaignCard key={index} campaign={campaign} />
//             </>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }

// export async function getServerSideProps() {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();

//   return {
//     props: {
//       campaigns
//     }
//   };
// }
