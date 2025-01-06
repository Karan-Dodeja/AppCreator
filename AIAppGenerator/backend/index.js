const http = require("http");

function parseFeatures(input) {
  const featureMapping = {
    chat: ["chat", "messaging", "conversation"],
    login: ["login", "authentication", "sign-in"],
    database: ["database", "storage", "data"],
    camera: ["camera", "photo", "video"],
    upload: ["upload", "file", "media"],
  };

  const features = [];
  const tokens = input
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .split(/\s+/);

  for (const [feature, synonyms] of Object.entries(featureMapping)) {
    if (tokens.some((token) => synonyms.includes(token))) {
      features.push(feature);
    }
  }

  return features;
}

function generateReactNativeComponent(feature) {
  if (feature === "chat") {
    return `
        import React from 'react';
        import { View, Text, TextInput, Button } from 'react-native';
  
        const ChatScreen = () => {
          const [message, setMessage] = React.useState('');
          const [messages, setMessages] = React.useState([]);
  
          const sendMessage = () => {
            setMessages([...messages, message]);
            setMessage('');
          };
  
          return (
            <View>
              <Text>Chat Screen</Text>
              <View>
                {messages.map((msg, index) => (
                  <Text key={index}>{msg}</Text>
                ))}
              </View>
              <TextInput
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
              />
              <Button title="Send" onPress={sendMessage} />
            </View>
          );
        };
  
        export default ChatScreen;
      `;
  }

  // Add other feature-based components here...
}

function generateBackendRoute(feature) {
  if (feature === "login") {
    return `
        app.post('/login', (req, res) => {
          const { username, password } = req.body;
  
          // Replace with actual authentication logic
          if (username === 'admin' && password === 'password') {
            res.json({ success: true, message: 'Login successful!' });
          } else {
            res.json({ success: false, message: 'Invalid credentials' });
          }
        });
      `;
  }

  // Add other feature-based routes here...
}

// Example usage
console.log(generateBackendRoute("login"));

// Example usage
console.log(generateReactNativeComponent("chat"));

function handleRequest(req, res) {
  if (req.method === "POST" && req.url === "/parse") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const input = JSON.parse(body).userInput;

      // Parse features from input
      const features = parseFeatures(input);

      // Respond with extracted features
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ features }));
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

function parseFeatures(input) {
  const keywords = ["chat", "login", "database", "camera", "upload"];
  const features = [];

  for (let keyword of keywords) {
    if (input.toLowerCase().includes(keyword)) {
      features.push(keyword);
    }
  }

  return features;
}

function tokenize(text) {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove punctuation
    .toLowerCase()
    .split(/\s+/); // Split by spaces
}

const userInput =
  "Create a messaging app with photo uploads and authentication.";
const features = parseFeatures(userInput);
console.log(features); // Output: ['chat', 'upload', 'login']

// Example usage
const tokens = tokenize("Build an app with a chat feature and a login screen.");
console.log(tokens); // Output: ['build', 'an', 'app', 'with', 'a', 'chat', 'feature', 'and', 'a', 'login', 'screen']

const server = http.createServer(handleRequest);
server.listen(3000, () => console.log("Server running on port 3000"));
