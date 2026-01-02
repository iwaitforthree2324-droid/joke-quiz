import { useState } from 'react';
import { fetchJoke } from './api/joke';
import { fetchYesno } from './api/yesno';

function App() {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [showPunchline, setShowPunchline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jokeError, setJokeError] = useState('');
  const [yesnoImg, setYesnoImg] = useState('');
  const [showYesnoImg, setShowYesnoImg] = useState(false);
  const [yesnoImgError, setYesnoImgError] = useState('');

  //newJokeボタンが押された時の処理
  const handleNewJoke = async() => {
    try{
      setLoading(true);//loading中にする
      setJokeError('');//エラーを空文字にする
      setShowPunchline(false);//パンチラインを見せない

      //jokeをapiから取得しフリオチをセットアップ
      const joke = await fetchJoke();
      setSetup(joke.setup);
      setPunchline(joke.punchline);

      await handleNewYesnoImg();

    }catch{
      setJokeError('Failure to load joke');
    }finally{
      setLoading(false);
    }
  };

  const handleNewYesnoImg = async() => {
    try{
      setShowYesnoImg(false);
      setYesnoImgError('');

      //yesnoをapiから取得し画像をセットアップ
      const yesno = await fetchYesno();
      setYesnoImg(yesno.image);
    }catch{
      setYesnoImgError('Failure to load img');
    }
  };

  const showElements = () => {
    setShowPunchline(true);
    setShowYesnoImg(true);
  }

  return(
    <div style = {{padding: 24}}>
      <h1>Joke Quiz</h1>
      <button onClick={handleNewJoke} disabled={loading}>
        New Joke
      </button>

      {loading && <p>Loading...</p>}
      {jokeError && <p>{jokeError}</p>}
      {yesnoImgError && <p>{yesnoImgError}</p>}

      {setup && !showPunchline && (
        <button onClick={showElements}>
          Reveal punchline
        </button>
      )}

      {setup && <p>Q: {setup}</p>}
      {showPunchline && <p>A: {punchline}</p>}
      <div style = {{width: 400}}>
        {showYesnoImg && <p><img src={yesnoImg} alt="yesnoImg" width='300'/></p>}
      </div>
    </div>
  );
}

export default App