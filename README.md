# ReactJSON

This repository has a reconciler to convert React trees to JSON.

```jsx
const Player = () => {
  return (
    <player>
      <life>20</life>
      <mana>20</mana>
    </player>
  );
};

const State = () => {
  return (
    <state>
      <Player />
      <Player />
    </state>
  );
};

const root = {};

ReactJSON.mount(<State />, root);

console.log(root);

// {
//   "children": [
//     {
//       "type": "state",
//       "children": [
//         {
//           "type": "player",
//           "children": [
//             {
//               "type": "life",
//               "children": [
//                 {
//                   "type": "text",
//                   "value": "20"
//                 }
//               ]
//             },
//             {
//               "type": "mana",
//               "children": [
//                 {
//                   "type": "text",
//                   "value": "20"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "type": "player",
//           "children": [
//             {
//               "type": "life",
//               "children": [
//                 {
//                   "type": "text",
//                   "value": "20"
//                 }
//               ]
//             },
//             {
//               "type": "mana",
//               "children": [
//                 {
//                   "type": "text",
//                   "value": "20"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
```
