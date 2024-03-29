import AddNewTreeForm from '../AddNewTreeForm'
import EditTreeForm from '../EditTreeForm';
import TreeListPage from '../TreeListPage';
import AllTreeListPage from '../AllTreeListPage';
import LoginForm from '../Login-form';
import Home from '../Home';
import ImageView from '../ImageView';
import MapContain from '../Map';
import PassRecovery from '../PassRecovery';
import ProfileSettings from '../ProfileSettings';
import React, {Component} from 'react';
import {RegistrationForm} from '../Registation-form';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './Main.module.css';
import Tree from "../Tree/Tree";
import UserListPage from '../UserListPage';
import {IMainProps, IMainState} from "./types";
import {IMapPosition, IUser} from "../../common/types";
import SaveTrees from '../SaveTrees';
import {RouteComponentProps} from 'react-router-dom';
import UserPage from '../UserPage'

export const setMapViewPositionContext = React.createContext<((viewPos: IMapPosition | undefined) => void)>(() => {});
export const mapViewPositionContext = React.createContext<IMapPosition | undefined>(undefined);

export default class Main extends Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);

        this.state = {};
    }

    setMapViewPosition = (viewPos: IMapPosition | undefined) => {
        this.setState({mapViewPosition: viewPos});
    }

    renderAddNewTreeForm = (props: any) =>
        <AddNewTreeForm {...props} setMapViewPosition={this.setMapViewPosition} user={this.props.user} />

    renderEditTreeForm = (props: any) =>
        <EditTreeForm {...props} setMapViewPosition={this.setMapViewPosition} user={this.props.user}/>

    renderProfileSettings = (props: any) =>
        <ProfileSettings {...props} updateUserByCookies={this.props.onCookie} user={this.props.user}/>

    renderRoutesWithAuth (user: IUser) {
        const routes = [
            <Route exact path='/addtree/:lat/:lng' render={this.renderAddNewTreeForm}/>,
            <Route exact path='/trees/:id/edit' render={this.renderEditTreeForm}/>,
            <Route exact path='/trees' component={TreeListPage}/>
        ];

        if (user.roles.includes('superuser') || user.roles.includes('moderator')) {
            routes.push(<Route exact path='/allTrees/:page?' component={AllTreeListPage}/>);
        }

        if (user.roles.includes('superuser')) {
            routes.push(<Route exact path='/users' component={UserListPage}/>);
            routes.push(<Route exact path='/users/:id' component={UserPage}/>)
        }

        routes.push(
            <Route exact path='/profileSettings' render={this.renderProfileSettings}/>,
            <Redirect to='/'/>
        );

        return routes;
    }

    renderRoutesWithoutAuth () {
        const {onCookie} = this.props;

        return [
            <Route path='/login' render={props => <LoginForm {...props} handleCookie={onCookie} />}/>,
            <Route exact path='/registration' component={RegistrationForm} />
        ]
    }

    renderRoutes () {
      const {user} = this.props;

      if (user) {
          return this.renderRoutesWithAuth(user);
      }

      return this.renderRoutesWithoutAuth();
    }

    // FIXME: What types should these properties have
    vkAuth2: any = () => {
        window.location.href = 'https://ekb-trees-help.ru/auth/oauth2/vk'
    };

    renderHome = (props: RouteComponentProps) => <Home {...props} user={this.props.user}/>

    renderMap = (props: any) => {
        return (
            <MapContain
                {...props}
                user={this.props.user}
                mapViewPosition={this.state.mapViewPosition}
                setMapViewPosition={this.setMapViewPosition}
                className={styles.fullMap}
                disabled={false}
            />
        );
    };

    renderTree = (props: any) => (
        <Tree
            {...props}
            setMapViewPosition={this.setMapViewPosition}
            user={this.props.user}
        />
    );

    render () {
        return (
            <setMapViewPositionContext.Provider value={this.setMapViewPosition}>
                <mapViewPositionContext.Provider value={this.state.mapViewPosition}>
                    <main className={styles.mainWrapper} data-theme={this.props.theme}>
                        <Switch>
                            <Route exact path='/' render={this.renderHome} />
                            <Route exact path='/map' render={this.renderMap}/>
                            <Route exact path='/trees/:id' render={this.renderTree}/>
                            <Route exact path='/passRecovery' component={PassRecovery}/>
                            <Route exact path='/saveTrees' component={SaveTrees}/>
                            <Route path='/vk' component={this.vkAuth2}/>
                            <Route exact path='/image/:id' component={ImageView}/>
                            {this.renderRoutes()}
                            <Redirect to='/'/>
                        </Switch>
                    </main>
                </mapViewPositionContext.Provider>
            </setMapViewPositionContext.Provider>
        )
    }
}
