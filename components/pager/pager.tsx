import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './pager.module.scss';

interface IPagerProps {
  requestArtworkApiData: any,
  requestArtworkPagedData: any
}

export default function Pager({ artData, pageTo, goNext, goPrev, pageNum, pageCount }) {
  const pageSize = process.env.NEXT_PUBLIC_PAGESIZE;
  console.log("previous", artData.previous);
  console.log("previous", artData.next);
  console.log('pageNum in pager', pageNum);

  let pages = Math.ceil(pageCount / Number(pageSize));
  console.log(pages);
  let pageArray = [];
  for(let i = 0; i<pages; i++) {
    console.log('build page array', i)
    pageArray[i] = i+1;
  }
  const pagelist = pageArray.map((item, i) => (
    <li className={`page-item ${pageNum == item ? "active" : ""}`} key={i}>
      <a className={`btn btn-dark ${styles.navLink}`} href="#" onClick={() => pageTo(item)} >{item}</a>
    </li>
  ))
  return (
      <nav className="art-pager" aria-label="Page navigation example">
      <ul className="pagination">
          <li className="page-item"><Button className="page-link btn-outline-dark" onClick={() => goPrev()} disabled={ pageNum === 1 ? true: false }>Previous</Button></li>
          {pagelist}
          <li className="page-item"><Button className="page-link btn-outline-dark" onClick={() => goNext()} disabled={ pageNum !== pages ? false: true }>Next</Button></li>
      </ul>
      </nav>
    )
  };

