import React, { Component } from "react";
import _ from "lodash";
import { IntlProvider } from "react-intl";

import Langauges, { flatten } from "assets/locale/Langauges";

const LocaleContext = React.createContext({ value: Langauges["en"] });
/**
 *  TODO Documentation
 */
export class LocaleProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en",
    };
  }

  changeLocale = locale => {
    this.setState({ locale });
  };

  render() {
    return (
      <IntlProvider locale={this.state.locale} messages={flatten[this.state.locale]}>
        <LocaleContext.Provider value={{ tree: Langauges[this.state.locale], changeLocale: this.changeLocale }}>
          {this.props.children}
        </LocaleContext.Provider>
      </IntlProvider>
    );
  }
}

export default LocaleContext;
