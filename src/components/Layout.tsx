import * as React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

// import '../styles/normalize'
import 'modern-normalize';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/vendor/nucleo/css/nucleo.css';
import '../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard-react.min.css';
import '../assets/vendor/jvector.css';

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

const Layout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        />
        {children}
      </>
    )}
  />
);

export default Layout;
