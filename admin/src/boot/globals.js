import { boot } from "quasar/wrappers";
export default boot(async ({ app }) => {
  const files = require.context("../components", true, /.vue$/i, "sync");
  files.keys().map((file) => {
    var subName = file.replace(/(^.\/)/g, "").split(".")[0];
    if ((subName.match(/\//g) || []).length === 1) {
      var name = subName.replace(/\//g, "");
      app.component(name, files(file).default);
    }
  });
});
