import { devvar } from "../util/devvar/devvar";
//List of Endpoints, Organized By Category or typically a Controller-esque Grouping
export default Object.freeze({
  PageBuilder: {
    load: (accountId, pageId) => ({ url: devvar.DOMAIN + accountId + "/page/save/" + pageId }),
    save: (accountId, pageId) => ({ url: devvar.DOMAIN + accountId + "/page/save/" + pageId })
  }
});
