async function createOffer() {
  const connection = new RTCPeerConnection();
  connection.channel = connection.createDataChannel("main");
  connection.channel.onmessage = (e) => console.log(e.data);
  connection.channel.onerror = (e) => console.log(e);
  const offerDescription = await connection.createOffer();
  await connection.setLocalDescription(offerDescription);
  await ensureIceCandidatesGathered(connection);
  return [connection, JSON.stringify(connection.localDescription)];
}

async function createAnswer(offerDescription) {
  const connection = new RTCPeerConnection();
  connection.ondatachannel = (e) => {
    console.log("A channel was created by the remote peer!");
    connection.channel = e.channel;
    connection.channel.onmessage = (e) => console.log(e.data);
  };
  await connection.setRemoteDescription(JSON.parse(offerDescription));
  const answerDescription = await connection.createAnswer();
  await connection.setLocalDescription(answerDescription);
  await ensureIceCandidatesGathered(connection);
  return [connection, JSON.stringify(connection.localDescription)];
}

async function acceptAnswer(connection, answerDescription) {
  await connection.setRemoteDescription(JSON.parse(answerDescription));
}

function ensureIceCandidatesGathered(connection) {
  return new Promise((resolve) => {
    const isGatheringComplete = () =>
      connection.iceGatheringState === "complete";
    if (isGatheringComplete()) {
      resolve();
    } else {
      connection.onicecandidate = () => isGatheringComplete() && resolve();
    }
  });
}
