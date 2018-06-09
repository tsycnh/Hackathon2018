import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import UpImgForm from './UpImgForm';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yeah! Welcome to ShellChain!</h1>

      <div style={{width: "70%", margin: '0 auto'}}>
        <UpImgForm />
      </div> 

    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
