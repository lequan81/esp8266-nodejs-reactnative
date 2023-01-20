#include <ESP8266WiFi.h>
#include <ArduinoJson.h>      // https://arduinojson.org/
#include <WebSocketsClient.h> // download and install from https://github.com/Links2004/arduinoWebSockets
#include <SocketIoClient.h>

#define SSID "XuanLiem"
#define PASSWORD "haydoiday@75"
#define SERVER "192.168.0.6" // Server URL (without https://www)

bool value;

SocketIOclient socketIO;

void messageHandler(uint8_t *payload)
{
  StaticJsonDocument<64> doc;

  DeserializationError error = deserializeJson(doc, payload);

  if (error)
  {
    Serial.println(error.f_str());
    return;
  }

  String messageKey = doc[0];
  value = doc[1];

  if (messageKey == "state")
  {
    digitalWrite(LED_BUILTIN, value);
    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
  }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.println("Disconnected!");
    break;

  case sIOtype_CONNECT:
    Serial.printf("Connected to url: %s%s\n", SERVER, payload);

    // join default namespace (no auto join in Socket.IO V3)
    socketIO.send(sIOtype_CONNECT, "/");
    break;

  case sIOtype_EVENT:
    messageHandler(payload);
    break;
  }
}

void setupWiFi()
{
  Serial.println("\nConnecting...");

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected : ");
  Serial.println(WiFi.localIP());
}

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(0, INPUT_PULLUP);

  Serial.begin(115200);

  setupWiFi();

  // server address, port and URL
  socketIO.begin(SERVER, 4001, "/socket.io/?EIO=4");

  socketIO.onEvent(socketIOEvent);
}

void buttonHandler()
{
  StaticJsonDocument<64> doc;

  if (digitalRead(0) == LOW)
  {
    while (digitalRead(0) == LOW)
      ;
    delay(300); // debounce
    value = !value;
    doc[1] = value;
    doc[0] = "changeState"; // event_name
    digitalWrite(LED_BUILTIN, doc[1]);
    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
  }
}

void loop()
{
  socketIO.loop();
  buttonHandler();
}