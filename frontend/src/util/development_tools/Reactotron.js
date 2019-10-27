import ApplicationState from "../../env/ApplicationState.json";
import ApplicationDetails from "../../env/ApplicationDetails.json";
import ReactoTron from "reactotron-react-native";

if (ApplicationState.ReactoTron) {
  Reactotron.configuration({ name: ApplicationDetails.COMPANY_NAME }).useReactNative();

  console.tron = ReactoTron;
}
