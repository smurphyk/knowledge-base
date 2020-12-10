import React from 'react'
import butter from './butter-client'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default class Homepage extends React.Component {
  state = {
    data: {
      fields: {
        navigation_links: [],
      },
    },
  }
  async componentDidMount() {
    const { match } = this.props
    const resp = await butter.page.retrieve('*', 'homepage')
    this.setState(resp.data)
  }
  render() {
    const { fields } = this.state.data

    return (
      <div>
        <Helmet>
          <title>{fields.seo_title}</title>
          {/* <meta
            property='og:title'
            content={fields.facebook_open_graph_title}
          /> */}
        </Helmet>
        <div className='main__nav'>
          <div className='logo__container'>
            <Link to='/'>
              <img className='main__logo' src={fields.logo} alt='logo' />
            </Link>
          </div>
          <ul className='main__nav-links'>
            {fields.navigation_links.map((link) => {
              return (
                <a className='link__url' href={link.link_url} target='_blank'>
                  <li className='main__nav-item'>
                    {link.link_name}
                    <li className='main__nav-sub'>Sub-link</li>
                  </li>
                </a>
              )
            })}
          </ul>
        </div>
        <div className='content'>
          <h1 className='headline'>{fields.headline}</h1>
        </div>
      </div>
    )
  }
}
