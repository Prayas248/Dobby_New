import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Slide } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import { generateColor } from "../../utils";
import Output from "./Output";
import RoomGet from "../Video/Vi";
import { DeepChat } from 'deep-chat-react';
import MonacoEditor, { loader  } from "@monaco-editor/react";
import './Room.css'


import ChatUI from "./ChatUI";
import Container from "../WhiteBoard/Container";




const monokaiTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", background: "272822", foreground: "F8F8F2" },
    { token: "keyword", foreground: "F92672" },
    { token: "identifier", foreground: "A6E22E" },
    { token: "string", foreground: "E6DB74" },
    { token: "number", foreground: "AE81FF" },
    { token: "comment", foreground: "75715E", fontStyle: "italic" },
    { token: "delimiter", foreground: "F8F8F2" },
  ],
  colors: {
    "editor.background": "#272822",
    "editor.foreground": "#F8F8F2",
    "editor.lineHighlightBackground": "#3E3D32",
    "editorCursor.foreground": "#F8F8F0",
    "editorWhitespace.foreground": "#3B3A32",
  },
};




export default function Room({ socket, username }) {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState(() => [])
  const [fetchedCode, setFetchedCode] = useState(() => "")
  const [language, setLanguage] = useState(() => "javascript")
  const [codeKeybinding, setCodeKeybinding] = useState(() => undefined)
  const [isShown, setIsShown] = useState({
    leftPanel: false,
    rightPanel: false,
    middlePanel: false,
  });
  const [theme, setTheme] = useState("vs-dark");




  const toggleLeftPanel = () => {
    setIsShown({ ...isShown, leftPanel: !isShown.leftPanel });
  };

  const toggleRightPanel = () => {
    setIsShown({ ...isShown, rightPanel: !isShown.rightPanel });
  };
  const toggleMiddlePanel = () => {
    setIsShown({ ...isShown, middlePanel: !isShown.middlePanel });
  };
  const handleEditorDidMount = () => {
    loader.init().then((monacoInstance) => {
      // Register Monokai theme
      monacoInstance.editor.defineTheme("monokai", monokaiTheme);

      // Apply Monokai theme
      monacoInstance.editor.setTheme("monokai");
    });
  };

  const codeKeybindingsAvailable = ["default", "emacs", "vim"]
  const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
    cpp: "10.2.0",
    c: "10.2.0",
    dart: "2.19.6",
    bash: "5.2.0",
    swift: "5.3.3",
    rust: "1.68.2",
    ruby: "3.0.1",
    go: "1.16.2",
  };
  const languages = Object.entries(LANGUAGE_VERSIONS);





  function onChange(newValue) {
    setFetchedCode(newValue)
    socket.emit("update code", { roomId, code: newValue })
    socket.emit("syncing the code", { roomId: roomId })
  }

  function handleLanguageChange(e) {
    setLanguage(e.target.value)
    socket.emit("update language", { roomId, languageUsed: e.target.value })
    socket.emit("syncing the language", { roomId: roomId })
  }

  function handleCodeKeybindingChange(e) {
    setCodeKeybinding(e.target.value === "default" ? undefined : e.target.value)
  }

  function handleLeave() {
    socket.disconnect()
    !socket.connected && navigate('/', { replace: true, state: {} })
  }

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      toast.success('Room ID copied')
    } catch (exp) {
      console.error(exp)
    }
  }

  useEffect(() => {
    socket.on("updating client list", ({ userslist }) => {
      setFetchedUsers(userslist)
    })

    socket.on("on language change", ({ languageUsed }) => {
      setLanguage(languageUsed)
    })

    socket.on("on code change", ({ code }) => {
      setFetchedCode(code)
    })

    socket.on("new member joined", ({ username }) => {
      toast(`${username} joined`)
    })

    socket.on("member left", ({ username }) => {
      toast(`${username} left`)
    })

    console.log("This is which user", username);


    const backButtonEventListner = window.addEventListener("popstate", function (e) {
      const eventStateObj = e.state
      if (!('usr' in eventStateObj) || !('username' in eventStateObj.usr)) {
        socket.disconnect()
      }
    });

    return () => {
      window.removeEventListener("popstate", backButtonEventListner)
    }
  }, [socket])

  

  return (<>
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">
          <div className="languageFieldWrapper">
            <select className="languageField" name="language" id="language" value={language} onChange={handleLanguageChange}>
              {languages.map(([lang, version]) => (
                <option key={lang} value={lang}>{lang + " "}{version}</option>
              ))}
            </select>
          </div>

          <div className="languageFieldWrapper">
            <select className="languageField" name="codeKeybinding" id="codeKeybinding" value={codeKeybinding} onChange={handleCodeKeybindingChange}>
              {codeKeybindingsAvailable.map(eachKeybinding => (
                <option key={eachKeybinding} value={eachKeybinding}>{eachKeybinding}</option>
              ))}
            </select>
          </div>

          <p>Connected Users:</p>
          <div className="roomSidebarUsers">
            {fetchedUsers.map((each) => (
              <div key={each} className="roomSidebarUsersEach">
                <div className="roomSidebarUsersEachAvatar" style={{ backgroundColor: `${generateColor(each)}` }}>{each.slice(0, 2).toUpperCase()}</div>
                <div className="roomSidebarUsersEachName">{each}</div>
              </div>
            ))}
          </div>
        </div>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><DeepChat
        directConnection={{openAI:true}}
        demo={true}
        style={{ borderRadius: '10px' }}
        textInput={{ placeholder: { text: 'Welcome to the demo!' } }}
      /></div>
        

        <button className="roomSidebarCopyBtn" onClick={() => { copyToClipboard(roomId) }}>Copy Room id</button>
        <button className="roomSidebarBtn" onClick={() => {
          handleLeave()
        }}>Leave</button>
      </div>


      <div className="roomCodeEditor">
        <MonacoEditor
          height="96vh"
          width="auto"
          language={language}
          value={fetchedCode}
          theme={theme}
          onChange={onChange}
          options={{
            fontSize: 12,
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
          onMount={handleEditorDidMount}
        />
      </div>

      <Box minH="auto" bg="#000000" color="gray.500" px={6} py={8} style={{ overflow: "hidden" }}>
        
        <Output editorRef={fetchedCode} language={language} />
        <Slide direction='bottom' in={isShown.leftPanel} style={{ zIndex: 10, width: '100%', height: '100vh' }}>


          <Container roomId={roomId} socket={socket} />
        </Slide>
        <Slide direction='right' in={isShown.rightPanel} style={{ zIndex: 11, width: '35%', height: '100vh' }}>

          <ChatUI socket={socket} roomId={roomId} username={username} />



        </Slide>
        <Slide direction='left' in={isShown.middlePanel} style={{ zIndex: 11, width: '100vw', height: '100vh' }}>


          <RoomGet socket={socket}/>
        </Slide>


      </Box>
    </div>
    <Box cursor="pointer" display="flex" zIndex={90} position="fixed" bottom="0" left="0" width="100%">
      <Box display="flex" alignItems="center" justifyContent="center" bg="gray.600" color="white" style={{ width: "35%" }} onClick={toggleMiddlePanel}>Conference{isShown.middlePanel === true ? <ArrowLeftIcon marginLeft="5px" /> : <ArrowRightIcon marginLeft="5px" />} </Box>
      <Box display="flex" alignItems="center" justifyContent="center" bg="gray.800" color="white" style={{ width: "30%" }} onClick={toggleLeftPanel}>WhiteBoard <ArrowUpDownIcon marginLeft="5px" /></Box>
      <Box display="flex" alignItems="center" justifyContent="center" bg="gray.600" color="white" style={{ width: "35%" }} onClick={toggleRightPanel}>{isShown.rightPanel === true ? <ArrowRightIcon marginRight="5px" /> : <ArrowLeftIcon marginRight="5px" />}Chat </Box>
    </Box>



    <Toaster />

  </>
  )
}