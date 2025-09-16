import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { documentTextOutline, documentText } from 'ionicons/icons';
import { NetworkStatus } from './NetworkStatus';
import './Menu.css';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Form 1',
        url: '/form1',
        iosIcon: documentTextOutline,
        mdIcon: documentText,
    },
];

const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="dashboard-list">
                    <IonListHeader>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span>Dashboard</span>
                            <NetworkStatus compact={true} alwaysShow={true} />
                        </div>
                    </IonListHeader>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={location.pathname === appPage.url ? 'selected' : ''}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
