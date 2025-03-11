import { useEffect, useState } from 'react';
import './App.css';
import Image from './assets/0.png';
import one from './assets/1.png';
import two from './assets/2.png';
import three from './assets/3.png';
import four from './assets/4.png';
import five from './assets/5.png';
import six from './assets/6.png';
import seven from './assets/7.png';
import eight from './assets/8.png';
import SendMessageIcon from './assets/enviar.png';
import socket from 'socket.io-client';

const io = socket('http://localhost:4000');

function App() {

  const [name,setName] = useState("");
  const [Joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages)




useEffect(() => {
  io.on("users", (users) => setUsers(users));
  io.on("message", (message) => setMessages((messages) => [...messages, message]))
  io.on("connect", (socket) => console.log (socket.id));
}, [])



const handleJoin = () => {
if(name) {
  io.emit("join", name);
  setJoined(true);
}
}

const handleMessage = () => {
  if(message) {
    io.emit("message", {message, name});
    setMessage("");
  }
}

if(!Joined) {
  return (
    <div>
      <span>Digite seu nome</span>
      <input value={name} onChange={(e) => setName(e.target.value)}/>
      <button onClick={() => handleJoin()}>Entrar</button>
    </div>
  )
}


  return (
    <div className='container'>
      <div className='back-ground'></div>
      <div className='chat-container'>
       
        <div className='chat-contacts'>
          <div className='chat-options'></div>
          <div className='chat-item'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Work</span>
                <span className='last-message'>Alex: Bom dia à todos!</span>
              </div>
          </div>

          <div className='chat-item'>
              <img src={one} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Mi: Dani</span>
              </div>  
          </div>     

          <div className='chat-item'>
              <img src={two} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Alex: A entrega podemos adiar</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={three} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Derek: Podemos fazer o projeto</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={four} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Jorge: Para quando?</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={five} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Aline: Parabéns!</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={six} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Talita: Amanhã fará sol, podemos nos encontrar para finalizar o projeto</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={seven} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Pamela: Está aí?</span>
              </div>  
          </div>  

          <div className='chat-item'>
              <img src={eight} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='last-message'>Gabi: Daniiii</span>
              </div>  
          </div>  
        </div>


              <div className='chat-message'>
              <div className='chat-options'>
              <div className='chat-item'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Work</span>
                <span className='last-message'>
                  {users.map((user, index) => (
                <span>{user.name} {index + 1 < users.length? ',' : ''}</span>

                  ))}
        
                </span>
              </div>
              </div>
              </div>

            <div className='chat-messages-area'>
              {messages.map((message, index) => (
                <div className={message.name === name? 'user-container-message right' : 'user-container-message left'}>
                <span 
                key={index}
                className={message.name === name? 'user-my-message' : 'user-other-message'}
                
                >
                    {message.name? `${message.name}: ` : '' }{message.message}
                </span>
              </div>
              ))}

            </div>

          <div className='chat-input-area'>
            <input 
            className='chat-input' 
            placeholder='Mensagem'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <img src={SendMessageIcon} alt='' className='send-message-icon' onClick={() => handleMessage()}/>
          </div>
             </div>

      </div>
    </div>
  );
}

export default App;
