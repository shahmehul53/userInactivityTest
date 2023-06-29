/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import UserInactivity from 'react-native-user-inactivity';

const HomeScreen = ({navigation}) => {
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(30000);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var finalTime =
      seconds == 60
        ? minutes + 1 + ':00'
        : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    console.log(finalTime);
    console.log(typeof finalTime);
    return finalTime;
  }

  useEffect(() => {
    console.log('active state', active);
    if (!active) {
      console.log('not active');
      navigation.navigate('Login', {
        timer: timer,
      });
    }
  }, [!active]);

  return (
    <View style={{flex: 1}}>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={isActive => {
          console.log('is Active', isActive);
          setActive(isActive);
        }}
        style={{flex: 1, paddingTop: '10%'}}>
        <Text id="text-1" style={{textAlign: 'center'}}>
          Type below to simulate activity
        </Text>
        <TextInput
          id="text-input-1"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChange={() => {
            setActive(true);
          }}
          textContentType="creditCardNumber"
          value={timer.toString(10)}
          onChangeText={text => setTimer(Number.parseInt(text || 0, 10))}
        />
      </UserInactivity>
      <View style={{flex: 3}}>
        <Text style={{textAlign: 'center'}}>
          {active ? 'ACTIVE' : 'NOT ACTIVE'}
        </Text>

        <Text style={{textAlign: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            {!active ? millisToMinutesAndSeconds(timer) : null}
          </Text>
        </Text>

        <Button
          title="Manually set to Active"
          onPress={() => {
            setActive(true);
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

// import React, {useEffect, useRef, useState} from 'react';
// import {Keyboard, PanResponder, View, Text, Button} from 'react-native';
// import {defaultTimeoutHandler, useTimeout} from 'usetimeout-react-hook';

// function millisToMinutesAndSeconds(millis) {
//   var minutes = Math.floor(millis / 60000);
//   var seconds = ((millis % 60000) / 1000).toFixed(0);
//   var finalTime =
//     seconds == 60
//       ? minutes + 1 + ':00'
//       : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
//   console.log(finalTime);
//   console.log(typeof finalTime);
//   return finalTime;
// }

// const defaultTimeForInactivity = 120000;
// const defaultStyle = {
//   flex: 1,
// };

// const HomeScreen = ({
//   children,
//   isActive,
//   onAction,
//   skipKeyboard,
//   style,
//   timeForInactivity,
//   timeoutHandler,
//   navigation,
// }) => {
//   const actualStyle = style || defaultStyle;

//   /**
//    * If the user has provided a custom timeout handler, it is used directly,
//    * otherwise it defaults to the default timeout handler (setTimeout/clearTimeout).
//    */
//   const actualTimeoutHandler = timeoutHandler || defaultTimeoutHandler;
//   const timeout = timeForInactivity || defaultTimeForInactivity;

//   /**
//    * If the `isActive` prop is manually changed to `true`, call `resetTimerDueToActivity`
//    * to reset the timer and set the current state to active until the timeout expires.
//    * If the `isActive` is changed to `false`, nothing is done.
//    * Note however that toggling `isActive` manually is discouraged for normal use.
//    * It should only be used in those cases where React Native doesnt't seem to
//    * inform the `PanResponder` instance about touch events, such as when tapping
//    * over the keyboard.
//    */
//   console.log('object', defaultTimeForInactivity);
//   const initialActive = isActive === undefined ? true : isActive;
//   const [active, setActive] = useState(initialActive);
//   // useEffect(() => {
//   //   if (isActive) {
//   //     resetTimerDueToActivity();
//   //     console.log('in 1st useEffect');
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [isActive]);

//   const [date, setDate] = useState(Date.now());

//   /**
//    * The timeout is reset when either `date` or `timeout` change.
//    */
//   const cancelTimer = useTimeout(
//     () => {
//       setActive(false);
//       // onAction(false);
//     },
//     timeout,
//     actualTimeoutHandler,
//     [date, timeout],
//   );

//   const isFirstRender = useRef(true);

//   /**
//    * Triggers `onAction` each time the `active` state turns true
//    * after the initial render.
//    */
//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//     } else {
//       if (active) {
//         console.log('in 2nd useEffect');
//         // onAction(true);
//       } else {
//         console.log('in else ');
//         //Logout API
//         navigation.navigate('Login');
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [active]);

//   /**
//    * Resets the timer every time the keyboard appears or disappears,
//    * unless skipKeyboard is true.
//    */
//   useEffect(() => {
//     if (skipKeyboard) {
//       return;
//     }

//     const hideEvent = Keyboard.addListener(
//       'keyboardDidHide',
//       resetTimerDueToActivity,
//     );
//     const showEvent = Keyboard.addListener(
//       'keyboardDidShow',
//       resetTimerDueToActivity,
//     );

//     // release event listeners on destruction
//     return () => {
//       hideEvent.remove();
//       showEvent.remove();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /**
//    * This method is called whenever a touch is detected. If no touch is
//    * detected after `this.props.timeForInactivity` milliseconds, then
//    * `this.state.inactive` turns to true.
//    */
//   function resetTimerDueToActivity() {
//     cancelTimer();
//     setActive(true);

//     /**
//      * Causes `useTimeout` to restart.
//      */
//     setDate(Date.now());
//   }

//   /**
//    * In order not to steal any touches from the children components, this method
//    * must return false.
//    */
//   function resetTimerForPanResponder(/* event: GestureResponderEvent */) {
//     // const { identifier: touchID } = event.nativeEvent;
//     resetTimerDueToActivity();
//     return false;
//   }

//   /**
//    * The PanResponder instance is initialized only once.
//    */
//   // eslint-disable-next-line no-unused-vars
//   const [panResponder, _] = useState(
//     PanResponder.create({
//       onMoveShouldSetPanResponderCapture: resetTimerForPanResponder,
//       onPanResponderTerminationRequest: resetTimerForPanResponder,
//       onStartShouldSetPanResponderCapture: resetTimerForPanResponder,
//     }),
//   );
//   console.log('active state--->', active);
//   return (
//     // A HOC is there just wrap it
//     <View style={actualStyle} collapsable={false} {...panResponder.panHandlers}>
//       {/* {children} */}
//       <View
//         style={actualStyle}
//         collapsable={false}
//         {...panResponder.panHandlers}>
//         <View
//           style={{
//             flex: 1,

//             justifyContent: 'center',

//             alignItems: 'center',
//           }}>
//           <Text style={{textAlign: 'center'}}>
//             {active ? 'ACTIVE' : 'NOT ACTIVE'}
//           </Text>
//           <Text style={{textAlign: 'center'}}>
//             {!active
//               ? millisToMinutesAndSeconds(defaultTimeForInactivity)
//               : null}
//           </Text>
//           <Button
//             title="Manually set to Active"
//             onPress={() => {
//               setActive(true);
//             }}
//           />
//           <Button
//             title="Move to Login screen"
//             onPress={() => navigation.navigate('Login')}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

// /* eslint-disable semi */
// /* eslint-disable react-native/no-inline-styles */
// // /* eslint-disable react-native/no-inline-styles */
// // import React, {useState} from 'react';
// // import {StyleSheet, Text, Button, View, Animated} from 'react-native';
// // import UserInactivity from 'react-native-user-inactivity';

// // import {panResponder} from './useAutoLogout';

// // const HomeScreen = ({navigation}) => {
// //   const [active, setActive] = useState(true);
// //   const [timer, setTimer] = useState(20000);
// //   return (
// //     <UserInactivity
// //       isActive={active}
// //       timeForInactivity={timer}
// //       onAction={isActive => {
// //         setActive(isActive);
// //         // navigation.navigate('Login', {});
// //       }}
// //       style={{flex: 1, paddingTop: '10%'}}>
// //       <View
// //         style={{
// //           flex: 1,

// //           justifyContent: 'center',

// //           alignItems: 'center',
// //         }}>
// //         <Text style={{textAlign: 'center'}}>
// //           {active ? 'ACTIVE' : 'NOT ACTIVE'}
// //         </Text>
// //         <Text style={{textAlign: 'center'}}>{timer}</Text>
// //         <Button
// //           title="Manually set to Active"
// //           onPress={() => {
// //             setActive(true);
// //           }}
// //         />
// //         <Button
// //           title="Move to Login screen"
// //           onPress={() => navigation.navigate('Login')}
// //         />
// //       </View>
// //     </UserInactivity>
// //   );
// // };

//  export default HomeScreen;

//  const styles = StyleSheet.create({});

// import React, {useState, useEffect, useRef} from 'react';
// import {View, PanResponder, Button, Text} from 'react-native';

// const HomeScreen = props => {
//   const timerId = useRef(false);
//   const [timeForInactivityInSecond, setTimeForInactivityInSecond] =
//     useState(20);

//   useEffect(() => {
//     resetInactivityTimeout();
//   }, []);

//   const panResponder = React.useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponderCapture: () => {
//         console.log('user starts touch');
//         resetInactivityTimeout();
//       },
//     }),
//   ).current;
//   console.log('timer ID', timerId);
//   const resetInactivityTimeout = () => {
//     clearTimeout(timerId.current);
//     timerId.current = setTimeout(() => {
//       // action after user has been detected idle
//       props.navigation.navigate('Login');
//       console.log('resetInactivityTimeout');
//     }, timeForInactivityInSecond * 1000);
//   };
//   console.log('panResponder', panResponder);
//   return (
//     <View style={{flex: 1}} {...panResponder.panHandlers}>
//       <Text />
//       <Button
//         title="Move to Login screen"
//         onPress={() =>
//           props.navigation.navigate('Login', {
//             timer: timeForInactivityInSecond,
//           })
//         }
//       />
//     </View>
//   );
// };

// export default HomeScreen;
