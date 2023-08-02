import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { filter } from 'lodash'

import Layout from 'layouts'

import { SALES, LOGISTIC, REVIEWER, MASTER } from './constants'

export const routes = [
    // Dashboards
    {
        path: '/home',
        Component: lazy(() => import('container/home')),
        roles: [SALES, LOGISTIC, REVIEWER, MASTER],
        exact: true,
        name: 'Home',
    },
]

const loginRoutes = [
    // Auth Pages
    {
        path: '/login',
        Component: lazy(() => import('./login')),
        exact: true,
    },
    {
        path: '/login/:session/:username',
        Component: lazy(() => import('container/login-page/first-time-login')),
        exact: true,
    },
    {
        path: '/forgot-password',
        Component: lazy(() => import('container/forgot-password')),
        exact: true,
    },
    {
        path: '/password-request-sent',
        Component: lazy(() => import('container/forgot-password/password-request-sent')),
        exact: true,
    },
    {
        path: '/reset-password',
        Component: lazy(() => import('container/forgot-password/reset-password')),
        exact: true,
    },
    {
        path: '/password-success',
        Component: lazy(() => import('container/forgot-password/password-success')),
        exact: true,
    },
]

const mapStateToProps = ({ settings, user }) => ({
    routerAnimation: settings.routerAnimation,
    user,
})

const getRoute = role => {
    if (role === '') {
        return loginRoutes
    }
    return filter(routes, o => (o.roles ? o.roles.includes(role) : true))
}

const Router = ({ history, user, routerAnimation }) => {
    const { role } = user
    const selectedRoutes = getRoute(role)
    return (
        <ConnectedRouter history={history}>
            <Layout>
                <Route
                    render={state => {
                        const { location } = state
                        return (
                            <SwitchTransition>
                                <CSSTransition
                                    key={location.pathname}
                                    appear
                                    cx={routerAnimation}
                                    timeout={routerAnimation === 'none' ? 0 : 300}
                                >
                                    <Switch location={location}>
                                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                                        {selectedRoutes.map(({ path, Component, exact }) => (
                                            <Route
                                                path={path}
                                                key={path}
                                                exact={exact}
                                                render={props => {
                                                    return (
                                                        <div className={routerAnimation}>
                                                            <Suspense fallback={null}>
                                                                <Component {...props} />
                                                            </Suspense>
                                                        </div>
                                                    )
                                                }}
                                            />
                                        ))}
                                        {role === '' ? <Redirect to="/login" /> : <Redirect to="/404" />}
                                    </Switch>
                                </CSSTransition>
                            </SwitchTransition>
                        )
                    }}
                />
            </Layout>
        </ConnectedRouter>
    )
}

export default connect(mapStateToProps)(Router)
