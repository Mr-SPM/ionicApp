import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/react';
import React, { useState } from 'react';
import { useRequest } from '@umijs/hooks';
import ExploreContainer from '../components/ExploreContainer';
import './Home.scss';
import { useFormatMessage } from '../utils/intlHelpers';
import { fetchTest } from './service';

const Home: React.FC = () => {
  const fmt = useFormatMessage();
  const [text, setText] = useState('');
  // 注意传参必须为
  const { data, run } = useRequest(fetchTest, {
    manual: true,
  });
  const fetchData = async () => {
    run({ id: text });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {fmt('确定{n}', {
                n: 123,
              })}
              Blank
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        {JSON.stringify(data)}
        <IonInput
          value={text}
          onIonChange={({ detail }) => setText(detail.value!)}
        ></IonInput>
        <IonButton onClick={fetchData}>提交</IonButton>
        <img
          className="testImage"
          src="./assets/icon/icon.png"
          alt="logo"
        ></img>
      </IonContent>
    </IonPage>
  );
};

export default Home;
