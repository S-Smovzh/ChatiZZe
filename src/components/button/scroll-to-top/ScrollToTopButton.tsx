import React from 'react';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
// import scrollBtn from '../../../../assets/images/icons/arrow-up.svg';
import { Button } from '../Button';
import './ScrollToTopButton.css';

export default function ScrollToTopButton() {
  const [ t ] = useTranslation();

  return (
    <Button ariaLabel={t('button.top')} type="button" className="btn-s btn-top"
      onClick={() => timer(20).subscribe(() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            }))} tabIndex={888}>
      <img src="" alt=""/>
    </Button>
  );
}
