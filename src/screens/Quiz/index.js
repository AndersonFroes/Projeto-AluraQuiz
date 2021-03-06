/* eslint-disable react/prop-types */
import React from 'react';
import { Lottie } from '@crello/react-lottie';
import { useRouter } from 'next/router';

// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import loadingAnimation from '../Quiz/animations/loading.json';
import correctAnswer from '../Quiz/animations/correct-answer.json';
import wrongAnswer from '../Quiz/animations/wrong-answer.json';

function ResultWidget({ results, playerName }) {
  const correcstAnswers = results.filter((x) => x).length;
  const totalQuestions = results.length;
  const score = ((correcstAnswers / totalQuestions) * 100).toFixed(2);
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          Tela de Resultado
        </h3>
      </Widget.Header>

      <Widget.Content>
        <h4>
          {`${playerName}, Você acertou`}
          {' '}
          {correcstAnswers}
          {' '}
          {`de ${totalQuestions}.`}
        </h4>
        <h4>
          {`Taxa de acertos: ${score}%`}
        </h4>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              # 
              {index + 1}
              {' '}
              Resutaldo:
              {result === true
              ? ' acertou (:'
              : ' errou ):'}
            </li>
          ))}
        </ul>
        {/* eslint-disable-next-line no return-assign */}
        <Button type="button" onClick={() => window.location.href = '/'}>
          Jogar novamente
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget( { playerName }) {
  return (
    <Widget>
      <Widget.Header>
        {`${playerName}, por favor aguarde...`}
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center '}}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          confi={{ animationData: loadingAnimation, loop: true, autoplay: true}}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          <br />
          <br />
          {isQuestionSubmited && isCorrect 
          && (
          <Lottie 
            width="50px"
            height="50px"
            className="lottie-container basic"
            config={{ animationData: correctAnswer, loop: false, autoplay: true }}
          />
          )}
        {isQuestionSubmited && !isCorrect 
          && (
            <Lottie
              width="50px"
              heigh="50px"
              className="lottie-container basic"
              config={{ animationData: wrongAnswer, loop: false, autoplay: true }}
            />
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;
  const router = useRouter();
  const { name } = router.query;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 2000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget playerName={name} />}

        {screenState === screenStates.RESULT 
          && <ResultWidget results={results} playerName={name} />}
      </QuizContainer>
    </QuizBackground>
  );
}