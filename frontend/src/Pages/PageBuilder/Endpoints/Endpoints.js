/**
 * @deprecated
 */

import { State } from "../../../env/InterpretedEnvironment";
//List of Endpoints, Organized By Category or typically a Controller-esque Grouping
export default Object.freeze({
  load: (accountId, pageId) => ({ url: State.DOMAIN + accountId + "/page/save/" + pageId }),
  save: (accountId, pageId) => ({ url: State.DOMAIN + accountId + "/page/save/" + pageId }),
});
