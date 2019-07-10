import React from 'react'
import Chart from '../components/Chart'
import fetch from 'isomorphic-unfetch'

function Home({test}){
	return (
		<div>
		<p>Home Page</p>
		<Chart test={test}/>
		</div>
	)
}

Home.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(baseUrl + '/api')
  const json = await res.json()
  return { test: json }
}

export default Home