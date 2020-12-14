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
    const resp = await butter.page.retrieve('*', 'homepage', { levels: 4 })
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
          <ul className='main__nav-links'>
            <Link to={Homepage}>
              <div className='logo__container'>
                <img src={fields.logo} alt='logo' className='main__logo' />
              </div>
            </Link>
            {fields.navigation_links.map((link) => {
              console.log(link.child_items)
              return (
                <li className='main__nav-item' key=''>
                  <Link to={link.url_slug} className='main__nav-url'>
                    {link.navigation_item_label}
                  </Link>
                  <ul className='second__nav-links'>
                    {link.child_items.map((child) => {
                      return (
                        <li className='second__nav-item'>
                          <Link to={child.url_slug} className='second__nav-url'>
                            {child.navigation_label}
                          </Link>
                          <ul className='third__nav-links'>
                            {child.child_items.map((grandChild) => {
                              return (
                                <li className='third__nav-item'>
                                  <Link
                                    to={grandChild.url_slug}
                                    className='third__nav-url'
                                  >
                                    {grandChild.navigation_label}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      )
                    })}
                  </ul>
                </li>
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
