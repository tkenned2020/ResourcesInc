import styles from './Footer.module.css';

export default function PersistFooter (){
  return (
      <div className={styles.footerContainer}>
        <p>Copyright @ 2021 ResourcesInc Inc. All rights reserved.</p>
        <p>Development by Torrell Kennedy</p>
        <a href='https://github.com/tkenned2020'>
          <i className='fab fa-github'></i>
        </a>
        <a href='https://www.linkedin.com/in/torrell-kennedy-5813b3121/'>
          <i className='fab fa-linkedin'></i>
        </a>
      </div>
  );
};
