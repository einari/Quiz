import * as ko from "knockout";
import views from "./Views";

let getViewNameFromLocationOrUseHome = (home) => {
    var viewName = document.location.hash.substr(1);
    if (viewName.length <= 1) {
        viewName = home;
    }
    return viewName;
}

class NavigationFrame {
    handleElement(element) {
        let self = this;
        let tagsWithNavigationFrame = element.querySelectorAll("[data-navigationframe]");

        tagsWithNavigationFrame.forEach(tagWithNavigationFrame => {
            let home = tagWithNavigationFrame.attributes["data-navigationframe"].value;
            let viewName = getViewNameFromLocationOrUseHome(home);
            views.hookUpElement(tagWithNavigationFrame, viewName);

            window.addEventListener("hashchange", (event) => {
                let viewName = getViewNameFromLocationOrUseHome(home);
                views.hookUpElement(tagWithNavigationFrame, viewName);
            }, false);
        });
    }

}
export default new NavigationFrame();