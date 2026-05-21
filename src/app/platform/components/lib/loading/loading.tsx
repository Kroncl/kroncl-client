import Spinner from '@/assets/ui-kit/spinner/spinner';
import styles from './loading.module.scss';
import React from 'react';

type PlatformLoadingProps = {
  capture?: string;
  children?: React.ReactNode;
};

export function PlatformLoading({ capture = '', children }: PlatformLoadingProps) {
  return (
    <div className={styles.container}>
      <Spinner style={{fontSize: '2.5em'}} variant='accent' />
      {capture && <div className={styles.capture}>{capture}</div>}
      {children}
    </div>
  );
}