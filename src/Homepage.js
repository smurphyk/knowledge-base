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
      <div className='home__container'>
        <Helmet>
          <title>{fields.seo_title}</title>
        </Helmet>
        <div className='main__nav'>
          <div className='logo__container'>
            <Link to={Homepage}>
              <img src={fields.logo} alt='logo' className='main__logo' />
            </Link>
          </div>
          <ul className='main__nav-links'>
            {fields.navigation_links.map((link) => {
              return (
                <Link to={link.url_slug} className='main__nav-url'>
                  <li className='main__nav-item'>
                    {link.navigation_item_label}
                    <ul className='sub__nav-item'>{fields.navigation_}</ul>
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
        <div className='content'>
          <h1 className='headline'>{fields.headline}</h1>
          <p className='introduction'>
            The PUX Knowledge base is a one-stop shop for team members and
            clients alike.
            <br />
            <br />
            As a member of the team, you can find anything from information
            related to working at PUX to templates to increase efficiency and
            decrease frustration, as well as a place to post any training
            materials you create to help other team members.
            <br />
            <br />
            As a client of PUX, this knowledge base offers information that will
            help you understand our process in more depth. Examples of what you
            will find include: Process flows or diagrams, definitions and
            explainers, and client-specific templates with instructions. Here at
            PUX, we know how awesome we are, and we use full transparency so you
            will too.
          </p>
        </div>
      </div>
    )
  }
}
