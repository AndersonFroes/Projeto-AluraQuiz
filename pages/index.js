import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';


//const BackgroundImage = styled.div`
//background-image: url(${db.bg});
//flex: 1;
//background-size: 45%;
//background-position: center;
//background-repeat: no-repeat;
//`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retorno do useState', name, setName);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Coronavírus(Covid-19)</title>
      </Head>
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
              console.log('Fazendo uma submissão por meio dor react');

              // router manda para a próxima página
            }}
            >
              <input 
                onChange={function (infosDoEvento) {
                  console.log(infosDoEvento.target.value);
                  // state
                  // name = infosDoEvento.target.value;
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Fique Imunizado!" 
              />

              <button type="submit" disable={name.length === 0}>
                Eu sou &nbsp; 
                {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
        <h1>Quizes dos Alurinhas</h1>
        <p>Aproveite e faça os Quizes dos Alurinhas para testar o seu conhecimento!</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AndersonFroes"/>
    </QuizBackground>
  );
}
