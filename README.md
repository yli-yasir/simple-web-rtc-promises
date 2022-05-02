# A Simple WebRTC example that uses promises.

The code in `rtc.js` can be used as follows:

## Step 1:

```js
// Peer A

const [connection, offerDescription] = await createOffer();
```

## Step 2:

```js
// Peer B

// The offer description from step 1 is communicated using any means to peer B and used to create the answer:
const [connection, answerDescription] = await createAnswer(offerDescription);
```

## Step 3:

```js
// Peer A

// The answer description from step 2 is communicated using any means to peer A and used with the connection created in step 1 to accept the answer:
await acceptAnswer(connection, answerDescription);
```

## Step 4:

```js
// Peer A/B

// The peers are now connected and may communicate as follows:
connection.channel.send("Hello peer!");
```
