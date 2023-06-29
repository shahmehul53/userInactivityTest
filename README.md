# userInactivityTest

- Install unserinactivity package—> npm install react-native-user-inactivity 

- this package internally uses panResponder only.. 
- I have tried to implement this without package also which is commented in HomeScreen.
- I have tried other ways also and also with AppState but was not proper… 
- I have tried to implement it in custom hook also but didn’t worked properly.. 
- HomeScreen is just implementation… it can wrapped in a component and we can use it as HOC
<UserInactivity>
{children} //our code
</UserInactivity>
- In useEffect I have navigated to Login screen due to inactivity … just for demo…
- We can set our own time for inactivity in timer state… currently I have set 30000 ms i.e 30 seconds or 0.5 mins

Other things tried
- https://snack.expo.dev/Sy8ulr8B-
- https://facto.hashnode.dev/auto-logout-user-after-inactivity-react-native



Reference - https://github.com/jkomyno/react-native-user-inactivity
