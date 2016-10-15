import * as ko from "knockout";
import views from "./Views";

class NavigationFrame
{
    handleElement(element) {
        let self = this;
        let tagsWithNavigationFrame = element.querySelectorAll("[data-navigationframe]");

        tagsWithNavigationFrame.forEach(tagWithNavigationFrame => {
            let home = tagWithNavigationFrame.attributes["data-navigationframe"].value;
            views.hookUpElement(tagWithNavigationFrame, home);

            window.addEventListener("hashchange", (event) => {
                debugger;
                var viewName = document.location.hash.substr(1);
                views.hookUpElement(tagsWithNavigationFrame, viewName);
            }, false);
        });
    }

}
export default new NavigationFrame();