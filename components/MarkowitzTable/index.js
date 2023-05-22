import React from 'react';
import Link from 'next/link';
import styles from "./markowitz.module.css";
import { Markowitz } from '../../AlgorithmScript/Markowitz.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MarkowitzTable = () => {
  const router = useRouter();

  const portfolios = {};

  for (const portfolio of Object.keys(Markowitz)) {
    if (Markowitz.hasOwnProperty(portfolio)) {

      const tokens = Markowitz[portfolio].tokens;
      const percentage = Markowitz[portfolio].percentage.map((percentage) => percentage.toFixed(1));

      const portfolioData = {
        tokens,
        percentage
      };

      portfolios[portfolio] = portfolioData;
    }
  }


  function handleButtonClick(rowData) {
    // debug
    // console.log("Clicked button in row, data:", rowData);
    // console.log('table data', rowData.tokens);
    // console.log('table data', rowData.percentage);

    router.push({
      pathname: '/folio',
      query: rowData,
    });
  }

  return (
    <div>
      <table>
        <tr>
          <th colSpan="5"><h1>Portfolio with Markowitz</h1></th>
        </tr>

          <tr>
            <th>Portfolio</th>
            <th>Tokens</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>

        <tbody>
          {Object.keys(portfolios).map((portfolio, index) => (
            <tr key={index}>
              <td>{portfolio}</td>
              <td>{portfolios[portfolio].tokens.join(', ')}</td>
              <td>{portfolios[portfolio].percentage.join(', ')}</td>
              <td>
                <Link href='/folio'>
                  <a className={styles.button} onClick={() => handleButtonClick(portfolios[portfolio])}>
                    Buy
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default MarkowitzTable;
