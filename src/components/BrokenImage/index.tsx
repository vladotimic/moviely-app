import { PiImageBroken } from 'react-icons/pi';
import classNames from 'classnames';
import './BrokenImage.css';

interface Props {
  cover?: boolean;
}

function BrokenImage({ cover = false }: Props) {
  const className = classNames('broken__image', {
    'broken__image--cover': cover,
  });

  return (
    <div className={className}>
      <PiImageBroken title='Broken image - there is no poster source!' />
    </div>
  );
}

export default BrokenImage;
