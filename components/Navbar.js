import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

export function Navbar({ children }) {
  const logoPath = '/newlogo.png';
  return <>
    <nav className='navbar'>
      <div className='flex items-center justify-between w-full px-6 py-1 mx-auto xl:px-0'>
        <Link href='/' legacyBehavior>
          <a className='logo-container'>
            <img src={logoPath} alt='TrustFundr Logo' className='logo' />
          </a>
        </Link>
        <div className='flex items-center gap-10'>
          <Link href='/' legacyBehavior>
            <a title='List all Campaigns available' className='btn btn-primary' style={{ color: 'white' }}>
              Campaigns
            </a>
          </Link>
          <Link href='/campaigns/new' legacyBehavior>
            <a
              title='Add new Campaign'
              className='font-bold btn btn-outline btn-circle btn-primary'
            >
              <BiPlus />
            </a>
          </Link>
        </div>
      </div>
    </nav>
    <div className='flex flex-col items-center w-full px-6 mx-auto xl:px-0'>
      {children}
    </div>
    <style jsx>{`
      .navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: #ffffff; /* Set your desired background color */
      }

      .logo-container {
        display: flex;
        align-items: center;
      }

      .logo {
        width: 100%;
        height: auto;
        max-width: 250px; /* Adjust the max-width as needed */
      }

      nav a {
        color: #333333; /* Set your desired text color */
      }

      .btn {
        color:#641ae6;
      }

      .btn-circle {
        /* Add your button styles */
      }
    `}</style>
  </>;
}











// import Link from 'next/link';
// import { BiPlus } from 'react-icons/bi';

// export function Navbar({ children }) {
//   return (
//     <>
//       <nav className='flex items-center justify-between w-full px-6 py-6 mx-auto max-w-7xl xl:px-0'>
//         <Link href='/'>
//           <a className='text-4xl font-bold transition-all text-primary hover:text-primary-focus'>
//             CrowdCoin
//           </a>
//         </Link>
//         <div className='flex items-center gap-4'>
//           <Link href='/'>
//             <a title='List all Campaigns available' className='btn btn-primary'>
//               Campaigns
//             </a>
//           </Link>
//           <Link href='/campaigns/new'>
//             <a
//               title='Add new Campaign'
//               className='font-bold btn btn-outline btn-circle btn-primary'
//             >
//               <BiPlus />
//             </a>
//           </Link>
//         </div>
//       </nav>
//       <div className='flex flex-col items-center w-full px-6 mx-auto max-w-7xl xl:px-0'>
//         {children}
//       </div>
//     </>
//   );
// }
