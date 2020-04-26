import * as React from 'react';
import * as R from 'ramda';
import { Router } from '@reach/router';
// import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import Home from '../components/Home';
import Overview from '../components/Overview';
import Spinner from '../components/Spinner';
import Insights from '../components/Insights';
import PerformanceReport from '../components/PerformanceReport';
import ConversionReport from '../components/ConversionReport';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import logoSrc from '../assets/img/brand/delvify_orange_trans.png';
import { makeReduxData } from '../transforms';
import { setToken } from '../utils/auth';
import { fetchAuthInfo, fetchReport, fetchAllCampaigns } from '../services/api';
import { GlobalDispatchContext, GlobalStateContext } from '../context';

export const directory = {
  home: {
    Component: Home,
    path: '/dashboard/home',
    name: 'Account Home',
    shouldShow: true,
    sidebarIcon: 'ni ni-shop text-primary',
  },
  overview: {
    Component: Overview,
    path: '/dashboard/overview',
    name: 'Overview',
    shouldShow: false,
    sidebarIcon: 'ni ni-tv-2 text-primary',
  },
  // insights: {
  //   Component: Insights,
  //   path: '/dashboard/insights',
  //   name: 'Insights',
  //   sidebarIcon: 'fas fa-drum-steelpan text-blue',
  // },
  // performanceReport: {
  //   Component: PerformanceReport,
  //   path: '/dashboard/performance-report',
  //   name: 'Performance Report',
  //   sidebarIcon: 'fas fa-drum-steelpan text-blue',
  // },
  // conversionReport: {
  //   Component: ConversionReport,
  //   path: '/dashboard/conversion-report',
  //   name: 'Conversion Report',
  //   sidebarIcon: 'fas fa-drum-steelpan text-blue',
  // },
};

export const getRoutes = R.pipe(R.map(R.pick(['path', 'name', 'sidebarIcon', 'shouldShow'])), R.values);

export const redirectIfPathNotExists = (pathname: string): boolean | void => (
  R.none(R.equals(pathname), R.pipe(R.map(({ path }) => path), R.values)(directory))
    && navigate(directory.home.path)
);

const routes = getRoutes(directory);

type DashboardProps = {
  location?: { pathname: string },
  path?: string,
}

// entire dashboard subroute is private.
function Dashboard({ location: { pathname = '' } }: DashboardProps): JSX.Element {
  const { data } = React.useContext(GlobalStateContext);
  const dispatch = React.useContext(GlobalDispatchContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (redirectIfPathNotExists(pathname)) return;

    (async function onLoad(): Promise<void> {
      setIsLoading(true);
      try {
        // TODO: append token to cookie from header instead of body
        const { userInfo, token } = await fetchAuthInfo();
        setToken(token);
        dispatch({
          type: 'SET_USER_INFO',
          value: userInfo,
        });

        if (data.alltimeMetrics.length === 0) {
          const alltimeMetricsData = await fetchReport(
            userInfo.queryIds.alltimeMetrics,
          );
          const alltimeMetrics = makeReduxData(alltimeMetricsData);
          dispatch({
            type: 'SET_ALLTIME_METRICS_DATA',
            value: alltimeMetrics,
          });
        }

        if (data.campaigns.length === 0) {
          const campaignsData = await fetchAllCampaigns();
          dispatch({
            type: 'SET_CAMPAIGNS',
            value: campaignsData,
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // logout(() => navigate('/login'));
      }
    }());
  }, []);

  return (
    <Layout>
      { isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Sidebar
            routes={routes}
            logo={{
              innerLink: '/',
              imgSrc: logoSrc,
              imgAlt: '...',
            }}
          />
          <div className="main-content">
            <Router>
              {R.values(directory).map((route) => (
                <route.Component key={route.name} path={route.path} />
              ))}
            </Router>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
