import React from "react";

const Player = () => {
  const [life, setLife] = React.useState(20);
  const [mana, setMana] = React.useState(20);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLife(x => x - 1);
      setMana(x => x - 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <player>
      <life>{life}</life>
      <mana>{mana}</mana>
      {life < 10 && life > 0 ? "Running out of mana" : null}
    </player>
  );
};

const State = () => {
  return (
    <state>
      <Player active={true} />
      <Player active={false} />
    </state>
  );
};

export default State;
