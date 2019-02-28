
import React, { Fragment } from "react"
import axios from 'axios';
import '../../styles/main.scss'
import Layout from '../layouts/Layout'
const url = require('url')

function Template({ item, match }) {
  let flag = false;
  let example = "https://images.unsplash.com/profile-fb-1511193467-3a0884f9e625.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
  if (item.urls.regular.indexOf('placeholder') > -1) {
    flag = true;
  }
  return (
    <Fragment>
      <div className={`hello-${match}`} >
        {!flag ? <img alt='bday' src={item.urls.small} /> : example}
      </div>
    </Fragment>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      femalePictures: [],
      malePictures: [],
      totalPics: 500,
    }
  }

  helper = (totalPics, pageNo, queryTerm, whichStateProperty) => {
    const picsPerPage = Math.floor(totalPics / pageNo);
    var apiConfig = url.format(
      {
        protocol: 'https',
        hostname: 'api.unsplash.com',
        pathname: 'search/photos',
        search: `client_id=${process.env.GATSBY_API_KEY}&per_page=${picsPerPage}&page=${pageNo}&query=${queryTerm}`,
      }
    )
    const apiUrl = url.format(apiConfig);
    axios({
      method: 'get',
      url: apiUrl
    })
      .then((data) => {
        let pictures = data.data.results;

        this.setState({
          [whichStateProperty]: pictures
        })
      })
      .catch((err) => {
        throw err;
      })
  }
  food = () => {
    var str = "burgers,McDonalds,noodles,steak,pork,pudding,dinner,lunch meal";
    str += "chocalate, dessert, lamb chops, steak, fish, sausage, foodie, cuisine, bagel, ice cream"
    var arr = str.split(',');
    return arr[Math.floor(Math.random() * arr.length)]
  }
  componentDidMount() {
    const pageNumber = Math.floor(Math.random() * (5 - 0))
    this.helper(this.state.totalPics, pageNumber, this.food(), 'femalePictures')
    this.helper(this.state.totalPics, pageNumber, this.food(), 'malePictures')
  }


  render() {
    const { femalePictures, malePictures } = this.state
    const showFemalePictures = femalePictures.map((item, key) => (<Template match={key} item={item} key={item.id} boyitem={malePictures[key]} />))
    const showMalePictures = malePictures.map((item, key) => (<Template match={(malePictures.length - key)} item={item} key={item.id} />))
    return (
      <div>

        <Layout >

          <div className='container'>

            {showFemalePictures}

            {showMalePictures}
          </div>
        </Layout>
      </div>

    );
  }

}

export default App