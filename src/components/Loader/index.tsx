import './Loader.css';

function Loader() {
  return (
    <div data-testid='loader-component' className='lds-ring'>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loader;
