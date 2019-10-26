import React, { useEffect, useState } from "react";
import ReactJSON from "./ReactJSON";

const root = {};

const usePlayerState = () => {
  const [hand, setHand] = useState([]);
  const [graveyard, setGraveyard] = useState([]);

  return {
    hand,
    setHand,
    graveyard,
    setGraveyard
  };
};

const Events = createEvents();

function createEvents() {
  const subscriptions = {};

  return {
    subscribe(key, callback) {
      if (!subscriptions[key]) {
        subscriptions[key] = [];
      }

      const subscriptionsForKey = subscriptions[key];

      const callbackWithUniqueHash = () => callback();

      subscriptionsForKey.push(callbackWithUniqueHash);

      return {
        cancel: () => {
          subscriptionsForKey.splice(
            subscriptionsForKey.indexOf(callbackWithUniqueHash),
            1
          );
        }
      };
    },
    inform(key) {
      const subscriptionsForKey = subscriptions[key];

      if (!subscriptionsForKey || !subscriptionsForKey.length) {
        return;
      }

      subscriptionsForKey.forEach(callback => callback());
    }
  };
}

const useDeckState = () => {
  const [cards, setCards] = useState([
    "Ace of hearts",
    "Tow of hearts",
    "Three of hearts",
    "Four of hearts",
    "Five of hearts",
    "Six of hearts",
    "Seven of hearts",
    "Eight of hearts",
    "Nine of hearts",
    "Ten of hearts",
    "Jack of hearts",
    "Queen of hearts",
    "King of hearts"
  ]);

  return {
    draw: () => {
      const poppedCard = cards.pop();
      setCards(cards);
      return poppedCard;
    },
    cards
  };
};

const App = () => {
  const [turn, setTurn] = useState(0);

  const deckState = useDeckState();

  const firstPlayerState = usePlayerState();
  const secondPlayerState = usePlayerState();

  const activePlayer = turn % 2 === 0 ? firstPlayerState : secondPlayerState;

  useEffect(() => {
    activePlayer.setHand(hand => [...hand, deckState.draw()]);
  }, [turn]);

  useEffect(() => {
    const subscription = Events.subscribe("NEXT_TURN", () => {
      setTurn(turn => turn + 1);
    });

    return () => subscription.cancel();
  }, []);

  return (
    <root>
      <firstPlayer>
        <hand>
          {firstPlayerState.hand.map((card, index) => (
            <card key={index}>{card}</card>
          ))}
        </hand>
      </firstPlayer>
      <secondPlayer>
        <hand>
          {secondPlayerState.hand.map((card, index) => (
            <card key={index}>{card}</card>
          ))}
        </hand>
      </secondPlayer>
      <deck>
        {deckState.cards.map((card, index) => (
          <card key={index}>{card}</card>
        ))}
      </deck>
    </root>
  );
};

const log = () => {
  console.log(JSON.stringify(root, null, 2));
  console.log("----------");
};

ReactJSON.mount(<App />, root, log);

setTimeout(log, 1000);

Events.inform("NEXT_TURN");

setTimeout(log, 1000);
