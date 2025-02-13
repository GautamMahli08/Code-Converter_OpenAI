import React, { useState, useRef } from "react";
import axios from "axios";
import SplashCursor from "./components/SplashCursor";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [fromLanguage, setFromLanguage] = useState("Python");
  const [toLanguage, setToLanguage] = useState("JavaScript");
  const [convertedCode, setConvertedCode] = useState("");
  const splashCursorRef = useRef(null); // Ref for SplashCursor

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/convert", {
        code,
        fromLanguage,
        toLanguage,
      });
      setConvertedCode(response.data.convertedCode);

      // Trigger SplashCursor effect on conversion
      if (splashCursorRef.current) {
        splashCursorRef.current.splat(0.5, 0.5, 0, 0, generateColor());
      }
    } catch (error) {
      console.error(error);
      alert("Failed to convert code");
    }
  };

  const generateColor = () => {
    let c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.5; // Reduce brightness
    c.g *= 0.5;
    c.b *= 0.5;
    return c;
  };

  const HSVtoRGB = (h, s, v) => {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        break;
    }
    return { r, g, b };
  };

  return (
    <div className="App">
      <SplashCursor ref={splashCursorRef} />
      <h1>AI Code Converter</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
        rows={10}
        cols={50}
      />
      <div>
        <label>From:</label>
        <select
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="lex">lex</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="csharp">C#</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="swift">Swift</option>
          <option value="kotlin">Kotlin</option>
          <option value="nodejs">Nodejs</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="r">R</option>
          <option value="matlab">MATLAB</option>
          <option value="julia">Julia</option>
          <option value="scala">Scala</option>
          <option value="haskell">Haskell</option>
          <option value="ocaml">OCaml</option>
          <option value="bash">Bash</option>
          <option value="powershell">PowerShell</option>
          <option value="assembly">Assembly</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="jsx">JSX (React)</option>
          <option value="vue">Vue.js</option>
          <option value="elm">Elm</option>
          <option value="zig">Zig</option>
          <option value="dlang">D</option>
        </select>
        <label>To:</label>
        <select
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="lex">lex</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="csharp">C#</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="swift">Swift</option>
          <option value="kotlin">Kotlin</option>
          <option value="nodejs">Nodejs</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="r">R</option>
          <option value="matlab">MATLAB</option>
          <option value="julia">Julia</option>
          <option value="scala">Scala</option>
          <option value="haskell">Haskell</option>
          <option value="ocaml">OCaml</option>
          <option value="bash">Bash</option>
          <option value="powershell">PowerShell</option>
          <option value="assembly">Assembly</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="jsx">JSX (React)</option>
          <option value="vue">Vue.js</option>
          <option value="elm">Elm</option>
          <option value="zig">Zig</option>
          <option value="dlang">D</option>
        </select>
      </div>
      <button onClick={handleConvert}>Convert</button>
      <h2>Converted Code:</h2>
      <pre>{convertedCode}</pre>

      <div className="social-links">
        <a
          href="https://github.com/GautamMahli08"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="social-logo"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/gautam-mahli-b33108200/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
            alt="LinkedIn"
            className="social-logo"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
