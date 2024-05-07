import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './NotFound.css';

function NotFound() {
  return (
    <section className='container'>
      <div className='not-found__layout'>
        <div className='not-found__content'>
          <div className='not-found__link'>
            <Link to='/'>
              <IoIosArrowBack /> Go back to homepage
            </Link>
          </div>

          <h1 className='not-found__title'>404 Page</h1>
          <p className='not-found__text'>This page doesn&apos;t exist!</p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
