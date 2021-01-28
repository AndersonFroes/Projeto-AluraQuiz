import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-unresolved

import db from '../db.json';
import PageHead from '../src/components/PageHead';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';


//const BackgroundImage = styled.div`
//background-image: url(${db.bg});
//flex: 1;
//background-size: 45%;
//background-position: center;
//background-repeat: no-repeat;
//`;

//const QuizContainer = styled.div`
//  width: 100%;
//  max-width: 350px;
//  padding-top: 45px;
//  margin: auto 10%;
//  @media screen and (max-width: 500px) {
//    margin: auto;
//    padding: 15px;
//  }
//`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  
  return (
    <QuizBackground backgroundImage={db.bg}>
      <PageHead />
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1> {db.title}</h1>
          </Widget.Header>
          
          <Widget.Content>
            <p>{db.description}</p>
            <form  onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              // router manda para a próxima página
            }}
            >
              <Input 
                name="nomeDoUsuario"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Coloque seu nome e fique Imunizado!" 
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}>
                {`Clique e jogue ${name}`} 
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes dos Alurinhas</h1>
            <p>Aproveite e faça os vários Quizes dos Alurinhas para testar o seu conhecimento!</p>
              <ul>
                  <li><a href="https://aluraquiz-base.alura-challenges.vercel.app/contribuidores">Galeria de Quizes</a></li>
              </ul>
          </Widget.Content>
        </Widget>
        
        <Footer />

        <GitHubCorner projectUrl="https://github.com/AndersonFroes"/>

      </QuizContainer>
    </QuizBackground>
  );
}
